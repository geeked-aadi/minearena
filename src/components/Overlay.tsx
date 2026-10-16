import type { ReactNode } from "react";
import mineArenaLogo from "@/assets/navbar-logo.PNG";

const REGISTRATION_URL =
  "https://minearena-1-0.devpost.com/?preview_token=E6ZpH5CiiYbb1%2BpTW%2F6ykttDuJCuTv%2BdWtVjaduSeds%3D";

export type OverlayItemConfig = {
  id: string;
  start: number;
  end: number;
  content: ReactNode;
  className?: string;
  staysAtEnd?: boolean;
};

// ============================================================================
// [CONFIGURATION] OVERLAY FRAME-RANGE CONFIGURATION
// ============================================================================
// Each item specifies the active frame interval [start, end].
// Opacity and translateY are mathematically derived strictly from the current frameIndex.
const OVERLAY_CONFIG: OverlayItemConfig[] = [
  {
    id: "scroll-hint",
    start: 0,
    end: 30,
    className: "text-center",
    content: (
      <div className="flex flex-col items-center gap-3 text-center uppercase tracking-[0.25em] text-white">
        <span className="font-pixel text-[10px] tracking-[0.2em] sm:text-sm md:text-base text-[#f5f5f0] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Scroll to enter
        </span>
        <div className="animate-bounce text-2xl sm:text-3xl text-[#dba213] drop-shadow-[0_2px_8px_rgba(219,162,19,0.7)]">
          ↓
        </div>
      </div>
    ),
  },
  {
    id: "build-24h",
    start: 150,
    end: 210,
    className: "text-center px-4",
    content: (
      <h2 className="font-pixel text-xl sm:text-3xl md:text-5xl uppercase tracking-[0.16em] text-[#f5f5f0] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
        Build. In 24 Hours.
      </h2>
    ),
  },
  {
    id: "arena-awaits",
    start: 330,
    end: 390,
    className: "text-center px-4",
    content: (
      <h2 className="font-pixel text-xl sm:text-3xl md:text-5xl uppercase tracking-[0.16em] text-[#dba213] drop-shadow-[0_4px_24px_rgba(219,162,19,0.4)]">
        The Arena Awaits
      </h2>
    ),
  },
];

// Staggered details for the final card (430-507)
const FINAL_CARD_STAGGER = [
  {
    id: "final-logo",
    start: 430,
    render: () => (
      <img
        src={mineArenaLogo}
        alt="MINE ARENA 1.0 — National Level 24-Hour Hackathon"
        className="mb-1 h-auto w-[92%] max-w-[20rem] select-none object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)] sm:max-w-[28rem] md:max-w-[34rem]"
        style={{ imageRendering: "pixelated" }}
      />
    ),
  },
  {
    id: "final-prize",
    start: 445,
    render: () => (
      <div className="inline-flex items-center gap-2 border-2 border-[#dba213]/60 bg-[#dba213]/15 px-3 py-1.5 font-pixel text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.12em] text-[#ffd875] backdrop-blur-sm">
        <span>Nov 12-13, 2026</span>
        <span className="opacity-50">|</span>
        <span className="text-[#dba213]">₹75,000 Prize Pool</span>
      </div>
    ),
  },
  {
    id: "final-venue",
    start: 460,
    render: () => (
      <p className="font-terminal text-lg sm:text-2xl uppercase tracking-[0.08em] text-[#e0dacb]">
        SSM Cultural Hall, BIET Davangere
      </p>
    ),
  },
  {
    id: "final-reg-date",
    start: 470,
    render: () => (
      <p className="font-terminal text-base sm:text-xl uppercase tracking-[0.08em] text-[#9ae6b4]">
        Registration opens Oct 15
      </p>
    ),
  },
  {
    id: "final-organizer",
    start: 480,
    render: () => (
      <p className="font-terminal text-sm sm:text-lg uppercase tracking-[0.08em] text-white/70">
        Organized by Code Commit
      </p>
    ),
  },
  {
    id: "final-cta",
    start: 490,
    render: () => (
      <div className="pt-2">
        <a
          href={REGISTRATION_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="pointer-events-auto inline-flex items-center justify-center border-2 border-[#1a1206] bg-[#dba213] px-6 py-3 font-pixel text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#1a1206] shadow-[inset_2px_2px_0_rgba(255,255,255,0.4),inset_-2px_-2px_0_rgba(0,0,0,0.4),0_4px_0_#1a1206] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 hover:brightness-110"
        >
          Register Now
        </a>
      </div>
    ),
  },
];

interface OverlayProps {
  frameIndex: number;
  reducedMotion?: boolean;
}

export function Overlay({ frameIndex, reducedMotion = false }: OverlayProps) {
  // If reduced motion is requested, render only the final card with full opacity
  if (reducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center select-none px-4">
        <div className="flex max-w-2xl flex-col items-center gap-3.5 text-center">
          {FINAL_CARD_STAGGER.map((item) => (
            <div key={item.id} className="opacity-100 transform-none">
              {item.render()}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center select-none px-4">
      {/* 1. Transient overlay text ranges (0-30, 150-210, 330-390) */}
      {OVERLAY_CONFIG.map((item) => {
        const { start, end } = item;
        const fadeDuration = 12;

        let opacity = 0;
        let translateY = 24;

        if (item.id === "scroll-hint") {
          // Special fade-out rule for frame 0-30: starts fully visible at frame 0, fades out by 30
          if (frameIndex <= 20) {
            opacity = 1;
            translateY = 0;
          } else if (frameIndex <= end) {
            const p = (frameIndex - 20) / (end - 20);
            opacity = 1 - p;
            translateY = -p * 20;
          } else {
            opacity = 0;
            translateY = -20;
          }
        } else {
          // General fade-in / hold / fade-out by frame range
          if (frameIndex < start) {
            opacity = 0;
            translateY = 24;
          } else if (frameIndex < start + fadeDuration) {
            const p = (frameIndex - start) / fadeDuration;
            opacity = p;
            translateY = (1 - p) * 24;
          } else if (frameIndex <= end - fadeDuration) {
            opacity = 1;
            translateY = 0;
          } else if (frameIndex <= end) {
            const p = (frameIndex - (end - fadeDuration)) / fadeDuration;
            opacity = 1 - p;
            translateY = -p * 24;
          } else {
            opacity = 0;
            translateY = -24;
          }
        }

        const isVisible = opacity > 0.01;

        return (
          <div
            key={item.id}
            className={`absolute inset-0 flex items-center justify-center ${item.className ?? ""}`}
            style={{
              opacity,
              transform: `translate3d(0, ${translateY}px, 0)`,
              visibility: isVisible ? "visible" : "hidden",
              transition: "opacity 120ms ease-out, transform 120ms ease-out",
            }}
          >
            {item.content}
          </div>
        );
      })}

      {/* 2. Staggered final card (430-507, stays pinned at the end) */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4"
        style={{
          visibility: frameIndex >= 425 ? "visible" : "hidden",
        }}
      >
        <div className="flex max-w-2xl flex-col items-center gap-3 sm:gap-4 text-center">
          {FINAL_CARD_STAGGER.map((staggerItem) => {
            const fadeFrames = 10;
            let itemOpacity = 0;
            let itemTranslateY = 20;

            if (frameIndex < staggerItem.start) {
              itemOpacity = 0;
              itemTranslateY = 20;
            } else if (frameIndex < staggerItem.start + fadeFrames) {
              const p = (frameIndex - staggerItem.start) / fadeFrames;
              itemOpacity = p;
              itemTranslateY = (1 - p) * 20;
            } else {
              // Stays visible all the way to 507 and beyond
              itemOpacity = 1;
              itemTranslateY = 0;
            }

            return (
              <div
                key={staggerItem.id}
                style={{
                  opacity: itemOpacity,
                  transform: `translate3d(0, ${itemTranslateY}px, 0)`,
                  transition: "opacity 140ms ease-out, transform 140ms ease-out",
                }}
              >
                {staggerItem.render()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Overlay;
