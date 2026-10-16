import { Reveal } from "./Reveal";

import pillar1 from "@/assets/pillar-1.png";
import pillar2 from "@/assets/pillar-2.png";
import pillar3 from "@/assets/pillar-3.png";
import pillar4 from "@/assets/pillar-4.png";
import plaque1 from "@/assets/plaque-1.png";
import plaque2 from "@/assets/plaque-2.png";
import plaque3 from "@/assets/plaque-3.png";
import plaque4 from "@/assets/plaque-4.png";
import podium from "@/assets/podium.png";
import crystal from "@/assets/crystal.webp";
import sculk from "@/assets/sculk_still.png";

/*
  Layout (matches the prizes poster):
  - Phones: 1st + 2nd in the top row, then Special Recognition x2 and
    Consolation in a row of three.
  - lg and up: all five in a single row, same order.
*/

type Prize = {
  place: string;
  plaque: string;
  pillar: string;
  /** Phones only: pillar box width / height. Lower = taller visible pillar. */
  pillarAr: number;
  alt: string;
};

// Top row: 1st, 2nd
const MAIN_PRIZES: Prize[] = [
  {
    place: "1ST",
    plaque: plaque1,
    pillar: pillar1,
    pillarAr: 0.45,
    alt: "1st Place Plaque — ₹30,000",
  },
  {
    place: "2ND",
    plaque: plaque2,
    pillar: pillar2,
    pillarAr: 0.45,
    alt: "2nd Place Plaque — ₹20,000",
  },
];

// Bottom row: Special Recognition 1, Special Recognition 2, Consolation
const OTHER_PRIZES: Prize[] = [
  {
    place: "Special Recognition (Award 1)",
    plaque: plaque3,
    pillar: pillar3,
    pillarAr: 0.49,
    alt: "Special Recognition Award 1 Plaque — ₹10,000",
  },
  {
    place: "Special Recognition (Award 2)",
    plaque: plaque3,
    pillar: pillar3,
    pillarAr: 0.49,
    alt: "Special Recognition Award 2 Plaque — ₹10,000",
  },
  {
    place: "Consolation Prize",
    plaque: plaque4,
    pillar: pillar4,
    pillarAr: 0.49,
    alt: "Consolation Prize Plaque — ₹5,000",
  },
];

export function getPrizeGlowColor(place: string) {
  const isFirst = place.toUpperCase() === "1ST";
  return isFirst ? "rgba(252, 220, 95,0.45)" : "rgba(255, 110, 230,0.5)";
}

export function PrizeColumn({
  prize,
  index,
  isSmall = false,
}: {
  prize: Prize;
  index: number;
  isSmall?: boolean;
}) {
  const bobDelay = `${index * 0.4}s`;
  const glowColor = getPrizeGlowColor(prize.place);

  return (
    <>
      {/* Plaque */}
      <div
        className="relative"
        style={{ width: isSmall ? "100%" : "96%", transformOrigin: "center bottom" }}
      >
        <div className="mc-bob" style={{ "--bob-delay": bobDelay } as React.CSSProperties}>
          <img
            src={prize.plaque}
            alt={prize.alt}
            className="relative h-auto w-full object-contain"
          />
        </div>
      </div>

      {/* Crystal */}
      <div
        className="relative z-10"
        style={{
          width: isSmall ? "24%" : "28%",
          marginTop: "3%",
          transformOrigin: "center bottom",
        }}
      >
        <div
          className="pointer-events-none absolute -inset-[60%]"
          style={{ background: `radial-gradient(closest-side, ${glowColor}, transparent 70%)` }}
        />
        <div className="mc-bob relative" style={{ "--bob-delay": bobDelay } as React.CSSProperties}>
          <img src={crystal} alt="" className="block h-auto w-full mc-crystal" />
        </div>
      </div>

      {/* Pillar: hidden overflow for rising animation */}
      <div
        className="relative z-10 overflow-hidden [aspect-ratio:var(--pillar-ar,0.5)] lg:[aspect-ratio:auto]"
        style={
          {
            width: isSmall ? "52%" : "59%",
            marginTop: "2%",
            "--pillar-ar": prize.pillarAr,
          } as React.CSSProperties
        }
      >
        <div
          className="absolute inset-0 mc-pillar-rise lg:static lg:inset-auto lg:h-full lg:w-full"
          style={{ animationDelay: `${0.1 * index + 0.25}s` }}
        >
          <img
            src={prize.pillar}
            alt={`${prize.place} pillar`}
            className="relative block h-full w-full object-cover object-top lg:h-auto"
          />
        </div>
      </div>

      {/* Podium */}
      <div className="relative z-20 w-full" style={{ marginTop: isSmall ? "-8%" : "-10%" }}>
        <img src={podium} alt="" loading="lazy" className="h-auto w-full" />
      </div>
    </>
  );
}

export function PrizesSection() {
  const firstPrize = MAIN_PRIZES[0]!;
  const secondPrize = MAIN_PRIZES[1]!;

  return (
    <section
      id="prizes"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 sm:px-6 sm:py-24"
    >
      {/* Sculk background ambiance */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url('${sculk}')`,
          backgroundSize: "32px 32px",
          backgroundRepeat: "repeat",
          imageRendering: "pixelated",
        }}
      />

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-6xl text-center">
        <Reveal>
          <p className="mb-2 text-center font-terminal text-lg tracking-wider text-white/80 sm:text-xl">
            ▸ Loot for the last ones standing
          </p>
          <h2 className="pixel-heading mb-8 text-center text-2xl uppercase text-foreground text-glow-green sm:mb-14 sm:text-4xl">
            PRIZES
          </h2>
        </Reveal>

        {/* Below lg: 12 columns (top row 6+6, bottom row 4+4+4). lg: 5 columns, single row. */}
        <div className="mt-6 grid w-full grid-cols-12 items-end gap-x-2 gap-y-8 sm:mt-12 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-5 lg:gap-x-3">
          <Reveal
            key={firstPrize.place}
            delay={0.0}
            className="order-1 col-span-6 mx-auto flex w-full min-w-0 max-w-[11rem] flex-col items-center justify-end sm:max-w-[12rem] lg:col-span-1 lg:max-w-none"
          >
            <PrizeColumn prize={firstPrize} index={0} isSmall={false} />
          </Reveal>

          <Reveal
            key={secondPrize.place}
            delay={0.1}
            className="order-2 col-span-6 mx-auto flex w-full min-w-0 max-w-[11rem] flex-col items-center justify-end sm:max-w-[12rem] lg:col-span-1 lg:max-w-none"
          >
            <PrizeColumn prize={secondPrize} index={1} isSmall={false} />
          </Reveal>

          {OTHER_PRIZES.map((prize, i) => (
            <Reveal
              key={prize.place}
              delay={0.2 + i * 0.1}
              className="order-3 col-span-4 mx-auto flex w-full min-w-0 max-w-[7rem] flex-col items-center justify-end sm:max-w-[9rem] lg:col-span-1 lg:max-w-none"
            >
              <PrizeColumn prize={prize} index={i + 2} isSmall={true} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}