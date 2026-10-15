import { useEffect, useRef, useState, useCallback } from "react";
import {
  useFramePreloader,
  getNearestLoadedFrame,
  FRAME_COUNT,
} from "@/hooks/useFramePreloader";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Overlay } from "@/components/Overlay";
import { useIsMobile } from "@/hooks/use-mobile";

export const SCROLL_LENGTH_VH = 1000;
export const SMOOTHING_FACTOR = 0.08;
export const FRAME_TARGET = FRAME_COUNT - 1;

export interface ScrollSequenceProps {
  scrollLengthVh?: number;
  smoothingFactor?: number;
}

export function ScrollSequence({
  scrollLengthVh = SCROLL_LENGTH_VH,
  smoothingFactor = SMOOTHING_FACTOR,
}: ScrollSequenceProps = {}) {
  const isMobile = useIsMobile();
  const effectiveScrollVh = isMobile ? Math.min(scrollLengthVh, 600) : scrollLengthVh;

  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const isMobileRef = useRef(false);

  const [renderedFrame, setRenderedFrame] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { framesRef, loadedCount, totalFrames, isReady, startupFrameCount } = useFramePreloader();
  const progress = useScrollProgress(sectionRef, reducedMotion);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    isMobileRef.current = !!isMobile;
  }, [isMobile]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMotionPreference = () => {
      const prefersReduced = mediaQuery.matches;
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

      const lerpFactor = reducedMotion ? 1 : smoothingFactor;
      currentFrameRef.current += (targetFrame - currentFrameRef.current) * lerpFactor;

      const roundedFrame = Math.max(0, Math.min(Math.round(currentFrameRef.current), FRAME_TARGET));

      if (lastDrawnFrameRef.current !== roundedFrame) {
        lastDrawnFrameRef.current = roundedFrame;
        drawFrameToCanvas(roundedFrame);
        setRenderedFrame(roundedFrame);
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
  }, [drawFrameToCanvas, reducedMotion, smoothingFactor]);

  const totalLoadingPercentage = Math.min(100, Math.round((loadedCount / totalFrames) * 100));
  const startupLoadingPercentage = Math.min(
    100,
    Math.round((loadedCount / startupFrameCount) * 100),
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ height: `${effectiveScrollVh}dvh` }}
      aria-label="MINE ARENA 1.0 Scrollytelling Sequence"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-black">
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