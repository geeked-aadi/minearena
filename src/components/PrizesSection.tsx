import { Gem } from "lucide-react";
import { Reveal } from "./Reveal";

type Prize = {
  place: string;
  amount: string;
  note: string;
  /** pillar height in px — 1st place tallest */
  pillar: number;
  glow: string;
};

// Order matches a winners' podium: 2nd, 1st, 3rd
const PRIZES: Prize[] = [
  { place: "2ND", amount: "₹30,000", note: "Gold trophies & swag", pillar: 150, glow: "oklch(0.8 0.15 90 / 0.45)" },
  { place: "1ST", amount: "₹50,000", note: "Diamond trophies & swag", pillar: 220, glow: "oklch(0.75 0.18 200 / 0.5)" },
  { place: "3RD", amount: "₹20,000", note: "Iron trophies & swag", pillar: 110, glow: "oklch(0.7 0.1 60 / 0.45)" },
];

function Podium({ prize, index }: { prize: Prize; index: number }) {
  const bobDelay = `${index * 0.45}s`;
  return (
    <div className="flex w-full max-w-44 flex-col items-center">
      {/* Floating plaque with the prize amount */}
      <div
        className="mc-bob mc-gui mc-notch relative z-10 w-full px-3 py-4 text-center"
        style={{ "--bob-delay": bobDelay } as React.CSSProperties}
      >
        <p className="pixel-heading text-[10px] text-primary">{prize.place}</p>
        <p className="pixel-heading mt-2 text-sm" style={{ color: "oklch(0.25 0.03 260)" }}>
          {prize.amount}
        </p>
        <p className="mt-1 font-terminal text-base" style={{ color: "oklch(0.35 0.03 260)" }}>
          {prize.note}
        </p>
      </div>

      {/* Glowing crystal hovering above the pillar */}
      <div className="relative mt-3 flex h-12 w-12 items-center justify-center">
        <div
          className="mc-glow pointer-events-none absolute -inset-6 rounded-full"
          style={
            {
              background: `radial-gradient(closest-side, ${prize.glow}, transparent 70%)`,
              "--bob-delay": bobDelay,
            } as React.CSSProperties
          }
        />
        <Gem
          className="mc-crystal relative h-8 w-8 text-primary"
          style={{ "--bob-delay": bobDelay } as React.CSSProperties}
        />
      </div>

      {/* Pixel pillar */}
      <div
        className="mc-notch mt-2 w-3/5 border-2 border-border bg-secondary"
        style={{
          height: prize.pillar,
          boxShadow:
            "inset 4px 0 0 oklch(0.35 0.035 260), inset -4px 0 0 oklch(0.18 0.02 260)",
        }}
      />

      {/* Podium base */}
      <div className="mc-gui mc-notch -mt-1 h-10 w-full" />
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
      <div className="flex items-end justify-center gap-4 sm:gap-8">
        {PRIZES.map((p, i) => (
          <Reveal key={p.place} delay={0.15 * i} className="flex justify-center">
            <Podium prize={p} index={i} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.5}>
        <p className="mt-12 text-center font-terminal text-xl text-muted-foreground">
          Plus track prizes, best all-girls team, and best freshman team awards.
        </p>
      </Reveal>
    </section>
  );
}
