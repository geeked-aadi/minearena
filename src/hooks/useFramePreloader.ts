import { useEffect, useRef, useState } from "react";

// ============================================================================
// [CONFIGURATION] 1. FRAME COUNT & BATCH SETTINGS
// ============================================================================
// Change FRAME_COUNT to match the number of exported frames in your sequence.
// - The assets in this repository currently contain 504 frames (frame-001.jpg ... frame-504.jpg).
// - If your export has 508 frames, change FRAME_COUNT to 508.
export const FRAME_COUNT = 504; // <--- [ADJUST FRAME COUNT HERE: e.g. 508 or 504]
export const STARTUP_FRAME_COUNT = 60; // Load frames 1-60 before starting experience
export const FRAME_BATCH_SIZE = 20; // Background load batch size (batches of 20)

// ============================================================================
// [CONFIGURATION] 2. FILENAME PATTERN
// ============================================================================
// Adjust pattern below to match your asset directory in Main-bg-frames/:
// - Pattern A (Repository actual): `frame-001.jpg` ... `frame-504.jpg`  -> 3-digit zero-padded
// - Pattern B (Prompt specification): `frame_0001.jpg` ... `frame_0508.jpg` -> 4-digit zero-padded
//
// Change the template string in buildFrameUrl to switch patterns:
export function buildFrameUrl(frameIndex: number): string {
  const safeIndex = Math.max(1, Math.min(frameIndex, FRAME_COUNT));

  // <PATTERN>: Select or modify the pattern here:
  // Option 1: 3-digit hyphen format (current assets in repo)
  const fileName = `frame-${String(safeIndex).padStart(3, "0")}.jpg`;

  // Option 2: 4-digit underscore format (uncomment if using frame_0001.jpg ... frame_0508.jpg)
  // const fileName = `frame_${String(safeIndex).padStart(4, "0")}.jpg`;

  return `/Main-bg-frames/${fileName}`;
}

/**
 * Alternate pattern generator used as an automatic fallback if Pattern A misses.
 */
function buildFallbackFrameUrl(frameIndex: number): string {
  const safeIndex = Math.max(1, Math.min(frameIndex, FRAME_COUNT));
  return `/Main-bg-frames/frame_${String(safeIndex).padStart(4, "0")}.jpg`;
}

/**
 * Finds the nearest loaded frame below (prior to or at) the requested targetIndex.
 * If no earlier frame is loaded, it falls back to the lowest available frame above it.
 */
export function getNearestLoadedFrame(
  frames: Array<HTMLImageElement | null>,
  targetIndex: number,
): HTMLImageElement | null {
  if (!frames || frames.length === 0) return null;

  const clampedIndex = Math.max(0, Math.min(targetIndex, frames.length - 1));

  // 1. Direct hit
  if (frames[clampedIndex]) {
    return frames[clampedIndex];
  }

  // 2. Search downwards (nearest frame below the requested frame)
  for (let i = clampedIndex - 1; i >= 0; i--) {
    if (frames[i]) {
      return frames[i];
    }
  }

  // 3. Fallback: search upwards if nothing below targetIndex is loaded yet
  for (let i = clampedIndex + 1; i < frames.length; i++) {
    if (frames[i]) {
      return frames[i];
    }
  }

  return null;
}

export function useFramePreloader() {
  // Preallocated array holding HTMLImageElement instances (or null)
  const framesRef = useRef<Array<HTMLImageElement | null>>(new Array(FRAME_COUNT).fill(null));
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const loadSingleImage = (frameIndex: number): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        // If already cached in the preallocated array, resolve immediately
        const existing = framesRef.current[frameIndex - 1];
        if (existing) {
          resolve(existing);
          return;
        }

        const img = new Image();
        img.decoding = "async";

        img.onload = () => {
          if (isCancelled) {
            resolve(null);
            return;
          }
          framesRef.current[frameIndex - 1] = img;
          setLoadedCount((prev) => prev + 1);
          resolve(img);
        };

        img.onerror = () => {
          // Attempt fallback pattern if primary pattern fails
          const fallbackImg = new Image();
          fallbackImg.decoding = "async";

          fallbackImg.onload = () => {
            if (isCancelled) {
              resolve(null);
              return;
            }
            framesRef.current[frameIndex - 1] = fallbackImg;
            setLoadedCount((prev) => prev + 1);
            resolve(fallbackImg);
          };

          fallbackImg.onerror = () => {
            // Frame failed to load under both patterns
            resolve(null);
          };

          fallbackImg.src = buildFallbackFrameUrl(frameIndex);
        };

        img.src = buildFrameUrl(frameIndex);
      });
    };

    const runPreloadPipeline = async () => {
      // Phase 1: Preload startup frames (1 to 60) first
      const initialBatchIndexes = Array.from(
        { length: Math.min(STARTUP_FRAME_COUNT, FRAME_COUNT) },
        (_, i) => i + 1,
      );

      await Promise.all(initialBatchIndexes.map((idx) => loadSingleImage(idx)));

      if (isCancelled) return;

      // Start the experience as soon as startup frames 1-60 are ready
      setIsReady(true);

      // Phase 2: Load the remaining frames in background batches of 20
      for (let start = STARTUP_FRAME_COUNT + 1; start <= FRAME_COUNT; start += FRAME_BATCH_SIZE) {
        if (isCancelled) break;

        const end = Math.min(start + FRAME_BATCH_SIZE - 1, FRAME_COUNT);
        const batch = Array.from({ length: end - start + 1 }, (_, i) => start + i);

        await Promise.all(batch.map((idx) => loadSingleImage(idx)));
      }
    };

    void runPreloadPipeline();

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    framesRef,
    loadedCount,
    totalFrames: FRAME_COUNT,
    isReady,
    startupFrameCount: STARTUP_FRAME_COUNT,
    progress: Math.min(loadedCount / FRAME_COUNT, 1),
  };
}

export default useFramePreloader;
