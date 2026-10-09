import { Reveal } from "./Reveal";
import plaque1 from "../assets/plaque-1.png.asset.json";
import plaque2 from "../assets/plaque-2.webp.asset.json";
import plaque3 from "../assets/plaque-3.webp.asset.json";
import pillar1 from "../assets/pillar-1.webp.asset.json";
import pillar2 from "../assets/pillar-2.webp.asset.json";
import pillar3 from "../assets/pillar-3.webp.asset.json";
import crystal from "../assets/crystal.webp.asset.json";
import podiumBase from "../assets/podium-base.png";

type Prize = {
  place: string;
  plaque: string;
  pillar: string;
  /** pillar width in px — 1st place tallest/widest */
  width: number;
  /** podium base width in px — scales with the pillar */
  podiumWidth: number;
  alt: string;
  /** blend black JPG backgrounds into the dark page */
  blend?: boolean;
};

// Order matches a winners' podium: 2nd, 1st, 3rd
const PRIZES: Prize[] = [
  { place: "2ND", plaque: plaque2.url, pillar: pillar2.url, width: 120, podiumWidth: 170, alt: "Second place plaque — ₹20,000" },
  { place: "1ST", plaque: plaque1.url, pillar: pillar1.url, width: 150, podiumWidth: 210, alt: "First place plaque — ₹30,000" },
  { place: "3RD", plaque: plaque3.url, pillar: pillar3.url, width: 110, podiumWidth: 155, alt: "Third place plaque — ₹10,000" },
];

function PodiumColumn({ prize, index }: { prize: Prize; index: number }) {
  const bobDelay = `${index * 0.45}s`;
  return (
    <div className="flex flex-col items-center">
      {/* Floating plaque with the prize amount */}
      <img
        src={prize.plaque}
        alt={prize.alt}
        className={`mc-bob relative z-10 w-36 sm:w-44 ${prize.blend ? "mix-blend-screen" : ""}`}
        style={{ "--bob-delay": bobDelay } as React.CSSProperties}
      />

      {/* Glowing crystal hovering above the pillar */}
      <div className="relative mt-2 flex h-14 w-14 items-center justify-center">
        <div
          className="mc-glow pointer-events-none absolute -inset-6 rounded-full"
          style={
            {
              background:
                "radial-gradient(closest-side, oklch(0.65 0.25 310 / 0.5), transparent 70%)",
              "--bob-delay": bobDelay,
            } as React.CSSProperties
          }
        />
        <img
          src={crystal.url}
          alt=""
          className="mc-crystal relative h-10 w-10"
          style={{ "--bob-delay": bobDelay } as React.CSSProperties}
        />
      </div>

      {/* Banner pillar rising out of its own podium base */}
      <div className="mt-1 flex flex-col items-center">
        <img
          src={prize.pillar}
          alt={`${prize.place} place pillar`}
          className="mc-pillar-rise"
          style={{ width: prize.width }}
        />
        <img
          src={podiumBase}
          alt=""
          loading="lazy"
          className="relative z-10 -mt-7"
          style={{ width: prize.podiumWidth }}
        />
      </div>
    </div>
  );
}

export function PrizesSection() {
  return (
    <section id="prizes" className="mx-auto max-w-5xl px-4 py-24">
      <Reveal>
        <h2 className="pixel-heading mb-4 text-center text-lg text-primary text-glow-green sm:text-2xl">
          PRIZES
        </h2>
        <p className="mb-16 text-center font-terminal text-xl text-muted-foreground">
          The loot waiting at the end of the dungeon.
        </p>
      </Reveal>

      <div className="mx-auto max-w-3xl">
        <div className="flex items-end justify-center gap-2 sm:gap-6">
          {PRIZES.map((p, i) => (
            <Reveal key={p.place} delay={0.15 * i} className="flex justify-center">
              <PodiumColumn prize={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.5}>
        <p className="mt-12 text-center font-terminal text-xl text-muted-foreground">
          Plus track prizes, best all-girls team, and best freshman team awards.
        </p>
      </Reveal>
    </section>
  );
}
