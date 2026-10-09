import { Diamond, Beef, Scroll, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import ibmLogo from "@/assets/sponsor-ibm.png.asset.json";
import microsoftLogo from "@/assets/sponsor-microsoft.png.asset.json";
import lovableLogo from "@/assets/sponsor-lovable.png.asset.json";

type Tier = {
  icon: typeof Diamond;
  title: string;
  lamp: string;
  sponsors: { name: string; url: string; logo?: string }[];
};

// Placeholder tiers — swap in real sponsors when details arrive.
const TIERS: Tier[] = [
  {
    icon: Diamond,
    title: "Title Sponsor",
    lamp: "oklch(0.7 0.2 145)",
    sponsors: [{ name: "IBM", url: "#", logo: ibmLogo.url }],
  },
  {
    icon: Sparkles,
    title: "Hosting Partner",
    lamp: "oklch(0.85 0.15 200)",
    sponsors: [{ name: "Microsoft", url: "#", logo: microsoftLogo.url }],
  },
  {
    icon: Beef,
    title: "Refreshment Partner",
    lamp: "oklch(0.8 0.12 30)",
    sponsors: [{ name: "Lovable", url: "#", logo: lovableLogo.url }],
  },
  {
    icon: Scroll,
    title: "Certificate Partner",
    lamp: "oklch(0.85 0.12 95)",
    sponsors: [{ name: "Your Company", url: "#" }],
  },
];

function TierPanel({ tier, index }: { tier: Tier; index: number }) {
  const Icon = tier.icon;
  return (
    <Reveal delay={index * 0.12}>
      {/* Minecraft advancement-window panel */}
      <div className="mc-gui mc-notch p-3">
        {/* Title bar: item icon + inset label + status lamp */}
        <div className="flex items-center gap-3">
          <span className="mc-gui mc-notch flex h-11 w-11 shrink-0 items-center justify-center">
            <Icon className="h-6 w-6" style={{ color: "oklch(0.35 0.05 260)" }} />
          </span>
          <div className="mc-slot flex h-8 min-w-0 flex-1 items-center justify-center px-3">
            <h3
              className="pixel-heading truncate text-[10px] uppercase"
              style={{ color: "oklch(0.85 0.02 120)" }}
            >
              {tier.title}
            </h3>
          </div>
          <span className="mc-gui mc-notch hidden h-6 w-6 shrink-0 items-center justify-center sm:flex">
            <span
              className="block h-3 w-3"
              style={{
                backgroundColor: tier.lamp,
                boxShadow: "inset 0 0 0 1px oklch(0.1 0.01 260 / 0.55)",
              }}
            />
          </span>
        </div>

        {/* Inset slot area holding the sponsor tiles */}
        <div className="mc-slot mt-3 p-4">
          <div className="flex flex-wrap justify-center gap-4">
            {tier.sponsors.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${s.name} — ${tier.title}`}
                className="mc-gold-frame mc-notch mc-shine block w-full max-w-xs transition-transform hover:-translate-y-1"
              >
                <span
                  className="m-2 flex aspect-[2.6/1] items-center justify-center"
                  style={{
                    backgroundColor: "oklch(0.98 0.005 90)",
                    boxShadow: "inset 0 0 0 2px oklch(0.1 0.01 260 / 0.85)",
                  }}
                >
                  <span
                    className="pixel-heading px-4 text-center text-[10px]"
                    style={{ color: "oklch(0.3 0.03 260)" }}
                  >
                    {s.name}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function SponsorsSection() {
  return (
    <section id="sponsors" className="mx-auto max-w-5xl px-4 py-24">
      <Reveal>
        <p className="mb-2 text-center font-terminal text-xl text-muted-foreground">
          ▸ The bedrock MineArena is built on
        </p>
        <h2 className="pixel-heading mb-14 text-center text-lg text-primary text-glow-green sm:text-2xl">
          SPONSORS
        </h2>
      </Reveal>
      <div className="grid items-start gap-6 md:grid-cols-2 lg:gap-8">
        {TIERS.map((t, i) => (
          <TierPanel key={t.title} tier={t} index={i} />
        ))}
      </div>
      <Reveal delay={0.4}>
        <p className="mt-10 text-center font-terminal text-xl text-muted-foreground">
          Want to sponsor? Write to codecommit@bietdvg.edu
        </p>
      </Reveal>
    </section>
  );
}
