import { useEffect, useRef, useState, useCallback } from "react";
import {
  useFramePreloader,
  getNearestLoadedFrame,
  FRAME_COUNT,
  STARTUP_FRAME_COUNT,
} from "@/hooks/useFramePreloader";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Overlay } from "@/components/Overlay";

// ============================================================================
// [CONFIGURATION] 3. SCROLL LENGTH & SMOOTHING FACTOR
// ============================================================================
// Adjusted to reduce scrolling speed:
// - SCROLL_LENGTH_VH: increased from 600 to 1000vh to give more scroll travel per frame
// - SMOOTHING_FACTOR: reduced to 0.08 for gentler, more cinematic interpolation
export const SCROLL_LENGTH_VH = 1000; // <--- [ADJUST SCROLL LENGTH HERE: 1000 = 1000vh]
export const SMOOTHING_FACTOR = 0.08; // Lerp smoothing factor (~0.08)
export const FRAME_TARGET = FRAME_COUNT - 1; // 0-indexed maximum frame index

export interface ScrollSequenceProps {
  scrollLengthVh?: number;
  smoothingFactor?: number;
}

export function ScrollSequence({
  scrollLengthVh = SCROLL_LENGTH_VH,
  smoothingFactor = SMOOTHING_FACTOR,
}: ScrollSequenceProps = {}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation & Frame tracking refs (keeps rAF loop decoupled from React render cycle)
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const progressRef = useRef(0);

  // React state for overlay sync and reduced motion
  const [renderedFrame, setRenderedFrame] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Hook 1: Preload frames into preallocated array
  const { framesRef, loadedCount, totalFrames, isReady, startupFrameCount } = useFramePreloader();

  // Hook 2: Passive scroll listener mapping offsetTop & height to normalized progress (0-1)
  const progress = useScrollProgress(sectionRef, reducedMotion);

  // Sync scroll progress into a mutable ref so the rAF loop does not read layout
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // Respect prefers-reduced-motion media query
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

  // Canvas drawing function with cover-fit and crisp pixel rendering
  const drawFrameToCanvas = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const image = getNearestLoadedFrame(framesRef.current, frameIndex);
      if (!image) {
        // Fallback placeholder while awaiting the first frame
        context.fillStyle = "#05070b";
        context.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const targetBufferWidth = Math.floor(viewportWidth * dpr);
      const targetBufferHeight = Math.floor(viewportHeight * dpr);

      // Resize canvas buffer only if viewport or DPR changed
      if (canvas.width !== targetBufferWidth || canvas.height !== targetBufferHeight) {
        canvas.width = targetBufferWidth;
        canvas.height = targetBufferHeight;
        canvas.style.width = `${viewportWidth}px`;
        canvas.style.height = `${viewportHeight}px`;
      }

      // Crisp pixels for Minecraft voxel art
      context.imageSmoothingEnabled = false;

      // Cover-fit calculation (like CSS object-fit: cover, centered)
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

  // rAF tick loop: lerps currentFrame toward targetFrame and draws only when rounded frame changes
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

    // Draw initial frame
    drawFrameToCanvas(Math.round(currentFrameRef.current));
    animationFrameRef.current = window.requestAnimationFrame(tick);

    const handleResize = () => {
      // Redraw immediately on resize
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

  // Loader calculations
  const totalLoadingPercentage = Math.min(100, Math.round((loadedCount / totalFrames) * 100));
  const startupLoadingPercentage = Math.min(
    100,
    Math.round((loadedCount / startupFrameCount) * 100),
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ height: `${scrollLengthVh}vh` }}
      aria-label="MINE ARENA 1.0 Scrollytelling Sequence"
    >
      {/* Sticky pinned full-viewport container (100dvh for mobile address bar resilience) */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-black">
        {/* Full-viewport Canvas */}
        <canvas ref={canvasRef} className="block h-[100dvh] w-full bg-black touch-none" />

        {/* Ambient atmospheric overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        {/* Dynamic HTML Overlay driven by frame index */}
        <Overlay frameIndex={renderedFrame} reducedMotion={reducedMotion} />

        {/* Full-screen Loader (shown until frames 1-60 are ready) */}
        {!isReady && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] px-4">
            <div className="relative w-full max-w-md border-4 border-[#3a2a17] bg-[#1a1206] p-6 shadow-[0_12px_36px_rgba(0,0,0,0.85)]">
              {/* Notched inner border styling */}
              <div className="pointer-events-none absolute inset-1 border-2 border-[#523d24]" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="font-pixel text-xs sm:text-sm uppercase tracking-[0.16em] text-[#dba213]">
                  MINE ARENA 1.0
                </span>
                <span className="mt-2 font-pixel text-[9px] uppercase tracking-[0.12em] text-[#f5f5f0]/80">
                  Initializing Experience...
                </span>

                {/* Progress bar */}
                <div className="mt-6 w-full border-2 border-[#3a2a17] bg-[#0c0e14] p-1 shadow-inner">
                  <div
                    className="h-3.5 bg-gradient-to-r from-[#b8860b] via-[#dba213] to-[#ffe082] transition-all duration-150 ease-out"
                    style={{ width: `${Math.max(startupLoadingPercentage, 6)}%` }}
                  />
                </div>

                {/* Frame Counter Stats */}
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
