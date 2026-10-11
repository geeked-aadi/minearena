import { Reveal } from "./Reveal";

/*
  Mobile changes only (lg and up is unchanged), to match the prizes poster:
  - Podium (2nd, 1st, 3rd) comes first in one row, with 1st raised slightly;
    the four category prizes follow in a single row of four.
    (Before, the first two category prizes were shown above the podium in 2-per-row.)
  - Pillars are shorter on phones (cropped via pillarAr) to match the poster's stubby pillars.
  - Tighter heading / section spacing on phones.
  Layout notes: grid is 12 columns below lg (main = 4 cols, category = 3 cols);
  lg switches back to your original 7 columns with the same order.
*/

type Prize = {
  place: string;
  plaque: string;
  pillar: string;
  width: number;
  podiumWidth: number;
  /** Phones only: pillar box width / height. Lower = taller visible pillar. The pillar image is cropped from the bottom (the podium covers that part). */
  pillarAr: number;
  alt: string;
};

// Order matches podium: 2nd, 1st, 3rd
const MAIN_PRIZES: Prize[] = [
  {
    place: "2ND",
    plaque: "/plaque-2.png",
    pillar: "/pillar-2.png",
    width: 120,
    podiumWidth: 260,
    pillarAr: 0.54,
    alt: "2nd Place Plaque — ₹20,000",
  },
  {
    place: "1ST",
    plaque: "/plaque-1.png",
    pillar: "/pillar-1.png",
    width: 150,
    podiumWidth: 300,
    pillarAr: 0.39,
    alt: "1st Place Plaque — ₹30,000",
  },
  {
    place: "3RD",
    plaque: "/plaque-3.png",
    pillar: "/pillar-3.png",
    width: 110,
    podiumWidth: 240,
    pillarAr: 0.54,
    alt: "3rd Place Plaque — ₹10,000",
  },
];

const CATEGORY_PRIZES: Prize[] = [
  {
    place: "Best Girls Team",
    plaque: "/plaque-4.png",
    pillar: "/pillar-4.png",
    width: 90,
    podiumWidth: 190,
    pillarAr: 0.49,
    alt: "Best Girls Team Plaque",
  },
  {
    place: "Best Use of IoT",
    plaque: "/plaque-5.png",
    pillar: "/pillar-5.png",
    width: 90,
    podiumWidth: 190,
    pillarAr: 0.49,
    alt: "Best Use of IoT Plaque",
  },
  {
    place: "Best Use of GenAI",
    plaque: "/plaque-6.png",
    pillar: "/pillar-6.png",
    width: 90,
    podiumWidth: 190,
    pillarAr: 0.49,
    alt: "Best Use of GenAI Plaque",
  },
  {
    place: "Best Use of Web3",
    plaque: "/plaque-7.png",
    pillar: "/pillar-7.png",
    width: 90,
    podiumWidth: 190,
    pillarAr: 0.49,
    alt: "Best Use of Web3 Plaque",
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

  // Choose crystal gradient based on place (1ST gets gold-ish, others get pink-ish as in reference)
  const glowColor = getPrizeGlowColor(prize.place);

  return (
    <>
      {/* Plaque Container: 96% width */}
      <div className="relative" style={{ width: "96%", transformOrigin: "center bottom" }}>
        <div className="mc-bob" style={{ "--bob-delay": bobDelay } as React.CSSProperties}>
          <img
            src={prize.plaque}
            alt={prize.alt}
            className="relative h-auto w-full"
          />
        </div>
      </div>

      {/* Crystal Container: 28% width, 3% mt */}
      <div className="relative z-10" style={{ width: "28%", marginTop: "3%", transformOrigin: "center bottom" }}>
        <div
          className="pointer-events-none absolute -inset-[60%]"
          style={{ background: `radial-gradient(closest-side, ${glowColor}, transparent 70%)` }}
        />
        <div className="mc-bob relative" style={{ "--bob-delay": bobDelay } as React.CSSProperties}>
          <img
            src="/crystal.png"
            alt=""
            className="block h-auto w-full mc-crystal"
          />
        </div>
      </div>

      {/* Pillar Container: 59% width, 2% mt, hidden overflow for rising animation */}
      {/* Phones/tablets (below lg): the box gets a fixed aspect ratio (--pillar-ar) and the image is
          cropped from the bottom, so pillars are shorter like the poster. lg: original natural height. */}
      <div
        className="relative z-10 overflow-hidden [aspect-ratio:var(--pillar-ar,0.5)] lg:[aspect-ratio:auto]"
        style={{ width: "59%", marginTop: "2%", "--pillar-ar": prize.pillarAr } as React.CSSProperties}
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

      {/* Podium Container: 100% width, -10% mt */}
      <div className="relative z-20 w-full" style={{ marginTop: "-10%" }}>
        <img
          src="/podium.png"
          alt=""
          loading="lazy"
          className="h-auto w-full"
        />
      </div>
    </>
  );
}

export function PrizesSection() {
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
          backgroundImage: "url('/sculk_still.png')",
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

        {/* Below lg: 12 columns, podium first (order-1) then the four category prizes (order-2).
            lg: your original 7-column single row (lg:order-1..7). */}
        <div className="mt-6 grid w-full grid-cols-12 items-end gap-x-2 gap-y-8 sm:mt-12 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-7 lg:gap-x-3">
          {/* Podium: 2nd, 1st (raised a bit), 3rd */}
          <Reveal key={MAIN_PRIZES[0].place} delay={0.0} className="order-1 mx-auto flex w-full max-w-[11rem] flex-col items-center justify-end col-span-4 lg:order-3 lg:col-span-1 lg:max-w-none">
            <PrizeColumn prize={MAIN_PRIZES[0]} index={2} isSmall={false} />
          </Reveal>

          <Reveal key={MAIN_PRIZES[1].place} delay={0.1} className="order-1 mx-auto mb-[15%] flex w-full max-w-[11rem] flex-col items-center justify-end col-span-4 lg:order-4 lg:col-span-1 lg:mb-0 lg:max-w-none">
            <PrizeColumn prize={MAIN_PRIZES[1]} index={3} isSmall={false} />
          </Reveal>

          <Reveal key={MAIN_PRIZES[2].place} delay={0.2} className="order-1 mx-auto flex w-full max-w-[11rem] flex-col items-center justify-end col-span-4 lg:order-5 lg:col-span-1 lg:max-w-none">
            <PrizeColumn prize={MAIN_PRIZES[2]} index={4} isSmall={false} />
          </Reveal>

          {/* Category prizes: 4 in a row on phones */}
          <Reveal key={CATEGORY_PRIZES[0].place} delay={0.3} className="order-2 mx-auto flex w-full max-w-[8rem] flex-col items-center justify-end col-span-3 sm:max-w-[9rem] lg:order-1 lg:col-span-1 lg:max-w-none">
            <PrizeColumn prize={CATEGORY_PRIZES[0]} index={0} isSmall={true} />
          </Reveal>

          <Reveal key={CATEGORY_PRIZES[1].place} delay={0.4} className="order-2 mx-auto flex w-full max-w-[8rem] flex-col items-center justify-end col-span-3 sm:max-w-[9rem] lg:order-2 lg:col-span-1 lg:max-w-none">
            <PrizeColumn prize={CATEGORY_PRIZES[1]} index={1} isSmall={true} />
          </Reveal>

          <Reveal key={CATEGORY_PRIZES[2].place} delay={0.5} className="order-2 mx-auto flex w-full max-w-[8rem] flex-col items-center justify-end col-span-3 sm:max-w-[9rem] lg:order-6 lg:col-span-1 lg:max-w-none">
            <PrizeColumn prize={CATEGORY_PRIZES[2]} index={5} isSmall={true} />
          </Reveal>

          <Reveal key={CATEGORY_PRIZES[3].place} delay={0.6} className="order-2 mx-auto flex w-full max-w-[8rem] flex-col items-center justify-end col-span-3 sm:max-w-[9rem] lg:order-7 lg:col-span-1 lg:max-w-none">
            <PrizeColumn prize={CATEGORY_PRIZES[3]} index={6} isSmall={true} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}