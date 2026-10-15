import { useEffect, useState } from "react";

/**
 * Hook to track normalized scroll progress (0 to 1) through a pinned container.
 *
 * Performance & Architecture:
 * - Uses passive scroll and resize listeners.
 * - Calculates progress strictly using the container section's offsetTop and height.
 * - Avoids layout reads inside requestAnimationFrame loops to prevent forced reflow.
 * - Automatically returns 1 when prefers-reduced-motion is active.
 *
 * @param sectionRef - Ref to the scroll container section (e.g. 600vh wrapper)
 * @param reducedMotion - Boolean flag indicating if reduced motion is preferred
 * @returns Normalized scroll progress from 0 (top) to 1 (bottom)
 */
export function useScrollProgress(
  sectionRef: React.RefObject<HTMLElement | null>,
  reducedMotion = false,
): number {
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }

    const element = sectionRef.current;
    if (!element) {
      return;
    }

    let cachedOffsetTop = element.offsetTop;
    let cachedScrollDistance = Math.max(element.offsetHeight - window.innerHeight, 1);

    const updateMetrics = () => {
      if (!element) return;
      cachedOffsetTop = element.offsetTop;
      cachedScrollDistance = Math.max(element.offsetHeight - window.innerHeight, 1);
    };

    const updateProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const rawProgress = (scrollY - cachedOffsetTop) / cachedScrollDistance;
      const clamped = Math.min(1, Math.max(0, rawProgress));
      setProgress(clamped);
    };

    // Calculate initial values
    updateMetrics();
    updateProgress();

    const handleScroll = () => {
      updateProgress();
    };

    const handleResize = () => {
      updateMetrics();
      updateProgress();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion, sectionRef]);

  return progress;
}

export default useScrollProgress;
