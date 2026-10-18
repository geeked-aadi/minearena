import { useEffect, useRef, useState, useCallback } from "react";
import {
  useFramePreloader,
  getNearestLoadedFrame,
  FRAME_COUNT,
} from "@/hooks/useFramePreloader";
import { Overlay } from "@/components/Overlay";
import { useIsMobile } from "@/hooks/use-mobile";

export const SCROLL_LENGTH_VH = 1000;
export const SMOOTHING_FACTOR = 0.08;
export const FRAME_TARGET = FRAME_COUNT - 1;
/** Pinned scroll distance (in vh) after the animation ends: the register page stays on screen while scrolling through it. */
export const HOLD_VH = 100;
/** How many scroll gestures are absorbed on the final frame. The next one scrolls on. */
export const LOCK_ABSORB = 1;
/** Safety net: never keep the lock longer than this. */
export const LOCK_MAX_MS = 8000;

export interface ScrollSequenceProps {
  scrollLengthVh?: number;
  smoothingFactor?: number;
  holdVh?: number;
}

export function ScrollSequence({
  scrollLengthVh = SCROLL_LENGTH_VH,
  smoothingFactor = SMOOTHING_FACTOR,
  holdVh = HOLD_VH,
}: ScrollSequenceProps = {}) {
  const isMobile = useIsMobile();
  const effectiveScrollVh = isMobile ? Math.min(scrollLengthVh, 600) : scrollLengthVh;

  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const isMobileRef = useRef(false);

  // Lock state
  const lockedRef = useRef(false);
  const releasedRef = useRef(false);
  const lockStartRef = useRef(0);
  const gestureCountRef = useRef(0);
  const lastWheelRef = useRef(0);
  const lastKeyRef = useRef(0);
  const prevYRef = useRef(0);
  const endYRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const [renderedFrame, setRenderedFrame] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { framesRef, loadedCount, totalFrames, isReady, startupFrameCount } = useFramePreloader();

  useEffect(() => {
    isMobileRef.current = !!isMobile;
  }, [isMobile]);

  const jumpTo = (y: number) =>
    window.scrollTo({ top: y, left: 0, behavior: "instant" as ScrollBehavior });

  const engageLock = useCallback((endY: number) => {
    lockedRef.current = true;
    lockStartRef.current = performance.now();
    gestureCountRef.current = 0;
    jumpTo(endY); // snap to the exact end of the animation (final frame)
  }, []);

  /** Let the user scroll on to the next pages. */
  const releaseLock = useCallback(() => {
    lockedRef.current = false;
    releasedRef.current = true;
  }, []);

  /** User scrolled back up: unlock and re-arm so it locks again on the way down. */
  const unlockForUpward = useCallback(() => {
    lockedRef.current = false;
    releasedRef.current = false;
  }, []);

  // Scroll progress (0 -> 1) over the animation part only, plus lock handling.
  const computeProgress = useCallback(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const viewportH = sticky.offsetHeight || window.innerHeight;
    const holdPx = (holdVh / 100) * viewportH;
    const animRange = Math.max(1, section.offsetHeight - viewportH - holdPx);
    const rectTop = section.getBoundingClientRect().top;
    const y = window.scrollY;
    const endY = y + rectTop + animRange; // scroll position where the animation ends

    endYRef.current = endY;
    progressRef.current = Math.min(1, Math.max(0, -rectTop / animRange));

    const prevY = prevYRef.current;
    prevYRef.current = y;

    if (reducedMotionRef.current) return;

    if (lockedRef.current) {
      // Momentum / scrollbar drags can't move the page while locked
      if (Math.abs(y - endY) > 1) jumpTo(endY);
      return;
    }

    if (y < endY - viewportH * 0.4) {
      // Scrolled back up into the animation: lock again next time we arrive
      releasedRef.current = false;
    } else if (
      !releasedRef.current &&
      prevY < endY - 1 &&
      y >= endY - 1 &&
      y <= endY + holdPx + viewportH * 0.5 // anchor-link jumps to later sections are left alone
    ) {
      engageLock(endY);
    }
  }, [holdVh, engageLock]);

  useEffect(() => {
    prevYRef.current = window.scrollY;
    computeProgress();
    window.addEventListener("scroll", computeProgress, { passive: true });
    window.addEventListener("resize", computeProgress, { passive: true });
    // Mobile address bar show/hide changes the visual viewport without a normal resize
    window.visualViewport?.addEventListener("resize", computeProgress);

    return () => {
      window.removeEventListener("scroll", computeProgress);
      window.removeEventListener("resize", computeProgress);
      window.visualViewport?.removeEventListener("resize", computeProgress);
    };
  }, [computeProgress, isMobile, effectiveScrollVh]);

  // Gesture handling: absorb LOCK_ABSORB scroll gestures while locked, then let the next one through
  useEffect(() => {
    let touchStartY = 0;
    let touchStartedLocked = false;
    let touchCounted = false;

    const onWheel = (e: WheelEvent) => {
      const now = performance.now();
      const isNewGesture = now - lastWheelRef.current > 220;
      lastWheelRef.current = now; // always tracked, so the momentum tail of the arriving scroll isn't counted

      if (!lockedRef.current || reducedMotionRef.current) return;

      if (e.deltaY < 0) {
        unlockForUpward();
        return;
      }

      if (isNewGesture) {
        gestureCountRef.current += 1;
        if (gestureCountRef.current > LOCK_ABSORB) {
          releaseLock();
          return; // this gesture scrolls on
        }
      }
      if (e.cancelable) e.preventDefault();
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
      touchStartedLocked = lockedRef.current;
      touchCounted = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!lockedRef.current || reducedMotionRef.current) return;
      const dy = touchStartY - (e.touches[0]?.clientY ?? touchStartY); // > 0 = scrolling down

      if (dy < -6) {
        unlockForUpward();
        return;
      }

      // The swipe that carried the user here (finger already down): just hold the page
      if (!touchStartedLocked) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      if (dy > 6 && !touchCounted) {
        touchCounted = true;
        gestureCountRef.current += 1;
        if (gestureCountRef.current > LOCK_ABSORB) {
          releaseLock();
          return; // this swipe scrolls on
        }
      }
      if (e.cancelable) e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!lockedRef.current || reducedMotionRef.current) return;
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      const downKeys = ["ArrowDown", "PageDown", " ", "Spacebar", "End"];
      const upKeys = ["ArrowUp", "PageUp", "Home"];

      if (upKeys.includes(e.key)) {
        unlockForUpward();
        return;
      }
      if (!downKeys.includes(e.key)) return;

      const now = performance.now();
      const isNewGesture = now - lastKeyRef.current > 220;
      lastKeyRef.current = now;

      if (isNewGesture) {
        gestureCountRef.current += 1;
        if (gestureCountRef.current > LOCK_ABSORB) {
          releaseLock();
          return;
        }
      }
      e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [releaseLock, unlockForUpward]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMotionPreference = () => {
      const prefersReduced = mediaQuery.matches;
      reducedMotionRef.current = prefersReduced;
      setReducedMotion(prefersReduced);
      if (prefersReduced) {
        currentFrameRef.current = FRAME_TARGET;
        setRenderedFrame(FRAME_TARGET);
      }
    };

    checkMotionPreference();
    mediaQuery.addEventListener("change", checkMotionPreference);
    return () => mediaQuery.removeEventListener("change", checkMotionPreference);
  }, []);

  const drawFrameToCanvas = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const image = getNearestLoadedFrame(framesRef.current, frameIndex);
      if (!image) {
        context.fillStyle = "#05070b";
        context.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      // Lower pixel ratio cap on mobile to save memory and GPU work
      const maxDpr = isMobileRef.current ? 1.5 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      // Use the canvas's own layout box so the mobile address bar doesn't cause mismatches
      const viewportWidth = canvas.clientWidth || window.innerWidth;
      const viewportHeight = canvas.clientHeight || window.innerHeight;

      const targetBufferWidth = Math.floor(viewportWidth * dpr);
      const targetBufferHeight = Math.floor(viewportHeight * dpr);

      if (canvas.width !== targetBufferWidth || canvas.height !== targetBufferHeight) {
        canvas.width = targetBufferWidth;
        canvas.height = targetBufferHeight;
      }

      context.imageSmoothingEnabled = false;

      const imageWidth = image.naturalWidth || image.width;
      const imageHeight = image.naturalHeight || image.height;
      const scale = Math.max(targetBufferWidth / imageWidth, targetBufferHeight / imageHeight);
      const drawWidth = imageWidth * scale;
      const drawHeight = imageHeight * scale;
      const drawX = (targetBufferWidth - drawWidth) / 2;
      const drawY = (targetBufferHeight - drawHeight) / 2;

      context.clearRect(0, 0, targetBufferWidth, targetBufferHeight);
      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    },
    [framesRef],
  );

  useEffect(() => {
    const tick = () => {
      const targetFrame = reducedMotion
        ? FRAME_TARGET
        : Math.round(progressRef.current * FRAME_TARGET);

      // While locked, catch up to the final frame faster
      const lerpFactor = reducedMotion
        ? 1
        : lockedRef.current
          ? Math.max(smoothingFactor, 0.2)
          : smoothingFactor;
      currentFrameRef.current += (targetFrame - currentFrameRef.current) * lerpFactor;

      // Snap the last bit so the final frame (register page) is always reached
      if (Math.abs(targetFrame - currentFrameRef.current) < 0.5) {
        currentFrameRef.current = targetFrame;
      }

      const roundedFrame = Math.max(0, Math.min(Math.round(currentFrameRef.current), FRAME_TARGET));

      if (lastDrawnFrameRef.current !== roundedFrame) {
        lastDrawnFrameRef.current = roundedFrame;
        drawFrameToCanvas(roundedFrame);
        setRenderedFrame(roundedFrame);
      }

      // Safety net: never trap the user
      if (lockedRef.current && performance.now() - lockStartRef.current > LOCK_MAX_MS) {
        releaseLock();
      }

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    drawFrameToCanvas(Math.round(currentFrameRef.current));
    animationFrameRef.current = window.requestAnimationFrame(tick);

    const handleResize = () => {
      // Force a redraw even if the frame index hasn't changed
      drawFrameToCanvas(Math.round(currentFrameRef.current));
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [drawFrameToCanvas, reducedMotion, smoothingFactor, releaseLock]);

  const totalLoadingPercentage = Math.min(100, Math.round((loadedCount / totalFrames) * 100));
  const startupLoadingPercentage = Math.min(
    100,
    Math.round((loadedCount / startupFrameCount) * 100),
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
      // animation scroll + pinned hold zone at the end
      style={{ height: `${effectiveScrollVh + holdVh}dvh` }}
      aria-label="MINE ARENA 1.0 Scrollytelling Sequence"
    >
      <div ref={stickyRef} className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-black">
        {/* touch-none removed so swipes scroll the page; canvas sized by CSS only */}
        <canvas ref={canvasRef} className="block h-full w-full bg-black" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        <Overlay frameIndex={renderedFrame} reducedMotion={reducedMotion} />

        {!isReady && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] px-4">
            <div className="relative w-full max-w-md border-4 border-[#3a2a17] bg-[#1a1206] p-6 shadow-[0_12px_36px_rgba(0,0,0,0.85)]">
              <div className="pointer-events-none absolute inset-1 border-2 border-[#523d24]" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="font-pixel text-xs sm:text-sm uppercase tracking-[0.16em] text-[#dba213]">
                  MINE ARENA 1.0
                </span>
                <span className="mt-2 font-pixel text-[9px] uppercase tracking-[0.12em] text-[#f5f5f0]/80">
                  Initializing Experience...
                </span>

                <div className="mt-6 w-full border-2 border-[#3a2a17] bg-[#0c0e14] p-1 shadow-inner">
                  <div
                    className="h-3.5 bg-gradient-to-r from-[#b8860b] via-[#dba213] to-[#ffe082] transition-all duration-150 ease-out"
                    style={{ width: `${Math.max(startupLoadingPercentage, 6)}%` }}
                  />
                </div>

                <div className="mt-3 flex w-full justify-between font-terminal text-sm text-[#e0dacb]">
                  <span>
                    Loading startup frames: {Math.min(loadedCount, startupFrameCount)}/
                    {startupFrameCount}
                  </span>
                  <span>{startupLoadingPercentage}%</span>
                </div>

                <div className="mt-1 text-center font-terminal text-xs text-white/40">
                  Total buffered: {loadedCount}/{totalFrames} ({totalLoadingPercentage}%)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ScrollSequence;