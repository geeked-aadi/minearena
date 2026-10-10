import { Reveal } from "./Reveal";

type Prize = {
  place: string;
  plaque: string;
  pillar: string;
  width: number;
  podiumWidth: number;
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
    alt: "2nd Place Plaque — ₹20,000",
  },
  {
    place: "1ST",
    plaque: "/plaque-1.png",
    pillar: "/pillar-1.png",
    width: 150,
    podiumWidth: 300,
    alt: "1st Place Plaque — ₹30,000",
  },
  {
    place: "3RD",
    plaque: "/plaque-3.png",
    pillar: "/pillar-3.png",
    width: 110,
    podiumWidth: 240,
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
    alt: "Best Girls Team Plaque",
  },
  {
    place: "Best Use of IoT",
    plaque: "/plaque-5.png",
    pillar: "/pillar-5.png",
    width: 90,
    podiumWidth: 190,
    alt: "Best Use of IoT Plaque",
  },
  {
    place: "Best Use of GenAI",
    plaque: "/plaque-6.png",
    pillar: "/pillar-6.png",
    width: 90,
    podiumWidth: 190,
    alt: "Best Use of GenAI Plaque",
  },
  {
    place: "Best Use of Web3",
    plaque: "/plaque-7.png",
    pillar: "/pillar-7.png",
    width: 90,
    podiumWidth: 190,
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
      <div className="relative z-10 overflow-hidden" style={{ width: "59%", marginTop: "2%" }}>
        <div className="h-full w-full mc-pillar-rise" style={{ animationDelay: `${0.1 * index + 0.25}s` }}>
          <img
            src={prize.pillar}
            alt={`${prize.place} pillar`}
            className="relative block h-auto w-full"
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
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-6"
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

      <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
        <Reveal>
          <p className="mb-2 text-center font-terminal text-xl tracking-wider text-white/80">
            ▸ Loot for the last ones standing
          </p>
          <h2 className="pixel-heading mb-14 text-center text-2xl uppercase text-foreground text-glow-green sm:text-4xl">
            PRIZES
          </h2>
        </Reveal>

        <div className="mt-12 grid w-full grid-cols-6 items-end gap-x-2 gap-y-10 sm:grid-cols-12 sm:gap-x-4 lg:grid-cols-7 lg:gap-x-3">
          <Reveal key={CATEGORY_PRIZES[0].place} delay={0.0} className="mx-auto flex w-full flex-col items-center justify-end col-span-3 max-w-[8rem] sm:max-w-[9rem] lg:col-span-1 lg:max-w-none lg:order-1">
            <PrizeColumn prize={CATEGORY_PRIZES[0]} index={0} isSmall={true} />
          </Reveal>
          
          <Reveal key={CATEGORY_PRIZES[1].place} delay={0.1} className="mx-auto flex w-full flex-col items-center justify-end col-span-3 max-w-[8rem] sm:max-w-[9rem] lg:col-span-1 lg:max-w-none lg:order-2">
            <PrizeColumn prize={CATEGORY_PRIZES[1]} index={1} isSmall={true} />
          </Reveal>
          
          <Reveal key={MAIN_PRIZES[0].place} delay={0.2} className="mx-auto flex w-full flex-col items-center justify-end col-span-2 max-w-[11rem] sm:col-span-4 lg:col-span-1 lg:max-w-none lg:order-3">
            <PrizeColumn prize={MAIN_PRIZES[0]} index={2} isSmall={false} />
          </Reveal>
          
          <Reveal key={MAIN_PRIZES[1].place} delay={0.3} className="mx-auto flex w-full flex-col items-center justify-end col-span-2 max-w-[11rem] sm:col-span-4 lg:col-span-1 lg:max-w-none lg:order-4">
            <PrizeColumn prize={MAIN_PRIZES[1]} index={3} isSmall={false} />
          </Reveal>
          
          <Reveal key={MAIN_PRIZES[2].place} delay={0.4} className="mx-auto flex w-full flex-col items-center justify-end col-span-2 max-w-[11rem] sm:col-span-4 lg:col-span-1 lg:max-w-none lg:order-5">
            <PrizeColumn prize={MAIN_PRIZES[2]} index={4} isSmall={false} />
          </Reveal>
          
          <Reveal key={CATEGORY_PRIZES[2].place} delay={0.5} className="mx-auto flex w-full flex-col items-center justify-end col-span-3 max-w-[8rem] sm:max-w-[9rem] lg:col-span-1 lg:max-w-none lg:order-6">
            <PrizeColumn prize={CATEGORY_PRIZES[2]} index={5} isSmall={true} />
          </Reveal>
          
          <Reveal key={CATEGORY_PRIZES[3].place} delay={0.6} className="mx-auto flex w-full flex-col items-center justify-end col-span-3 max-w-[8rem] sm:max-w-[9rem] lg:col-span-1 lg:max-w-none lg:order-7">
            <PrizeColumn prize={CATEGORY_PRIZES[3]} index={6} isSmall={true} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
