import sponsorBg from "@/assets/SPONSOR_BG.png";
import sponsorBgLeft from "@/assets/SPONSOR_BG_LEFT.png";
import sponsorBgRight from "@/assets/SPONSOR_BG_RIGHT.png";
import { Reveal } from "./Reveal";
import ibmLogo from "@/assets/sponsor-ibm.png.asset.json";
import microsoftLogo from "@/assets/sponsor-microsoft.png.asset.json";
import lovableLogo from "@/assets/sponsor-lovable.png.asset.json";

import truscholarLogo from "@/assets/truscholar.jpg";
import pruneLogo from "@/assets/prune.jpg";
import lazercrazerLogo from "@/assets/lazercrazer.png";

type Tier = {
  itemIcon: string;
  title: string;
  lamp: string;
  sponsors: { name: string; url: string; logo?: string }[];
};

const TIERS: Tier[] = [
  {
    itemIcon: "/item-diamond.png",
    title: "Title Sponsor",
    lamp: "#41c65b",
    sponsors: [{ name: "IBM", url: "https://www.ibm.com", logo: ibmLogo.url }],
  },
  {
    itemIcon: "/item-lapis.png",
    title: "Hosting Partner",
    lamp: "#5ff2f2",
    sponsors: [{ name: "Microsoft", url: "https://www.microsoft.com", logo: microsoftLogo.url }],
  },
  {
    itemIcon: "/item-porkchop.png",
    title: "Refreshment Partner",
    lamp: "#e79ba9",
    sponsors: [{ name: "Lovable", url: "https://lovable.dev", logo: lovableLogo.url }],
  },
  {
    itemIcon: "/item-glowstone.png",
    title: "Certificate Partner",
    lamp: "#e0dca8",
    sponsors: [{ name: "TruScholar", url: "https://www.truscholar.io", logo: truscholarLogo }],
  },
  {
    itemIcon: "/item-ender-eye.png",
    title: "AI Partner",
    lamp: "#a855f7",
    sponsors: [{ name: "Prune", url: "https://www.withprune.com", logo: pruneLogo }],
  },
  {
    itemIcon: "/item-firework.png",
    title: "Fun & Media Partner",
    lamp: "#fbbf24",
    sponsors: [{ name: "Lazer Crazer", url: "https://lazercrazer.in", logo: lazercrazerLogo }],
  },
];

function TierPanel({ tier, index }: { tier: Tier; index: number }) {
  return (
    <Reveal delay={index * 0.12}>
      {/* Minecraft advancement-window panel */}
      <div className="mc-gui mc-notch p-3">
        {/* Title bar: item icon + inset label + status lamp */}
        <div className="flex items-center gap-3">
          <span className="mc-gui mc-notch flex h-11 w-11 shrink-0 items-center justify-center bg-[#c6c6c6] p-1">
            <img
              src={tier.itemIcon}
              alt=""
              className="h-7 w-7 object-contain"
              style={{ imageRendering: "pixelated" }}
            />
          </span>
          <div className="mc-slot flex h-8 min-w-0 flex-1 items-center justify-center px-3">
            <h3
              className="pixel-heading truncate text-[10px] uppercase sm:text-xs"
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
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.55)",
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
                  className="m-2 flex aspect-[2.6/1] items-center justify-center bg-white"
                  style={{
                    boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.85)",
                  }}
                >
                  {s.logo ? (
                    <img
                      src={s.logo}
                      alt={s.name}
                      className="max-h-12 max-w-[80%] object-contain"
                    />
                  ) : (
                    <span
                      className="pixel-heading px-4 text-center text-[10px]"
                      style={{ color: "oklch(0.3 0.03 260)" }}
                    >
                      {s.name}
                    </span>
                  )}
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
    <section
      id="sponsors"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 sm:px-6"
    >
      {/* Background layer and flanks */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-[#1a1d20]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(11, 15, 24, 0.7), rgba(11, 15, 24, 0.72)), url(${sponsorBg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            filter: "saturate(0.9) contrast(1.05)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,214,102,0.08),transparent_55%)]" />
        <img
          src={sponsorBgLeft}
          alt=""
          className="pointer-events-none absolute bottom-0 left-0 h-auto w-[46%] max-w-[35rem] select-none object-left opacity-95 sm:w-[40%] lg:w-[34%]"
        />
        <img
          src={sponsorBgRight}
          alt=""
          className="pointer-events-none absolute bottom-0 right-0 h-auto w-[46%] max-w-[35rem] select-none object-right opacity-95 sm:w-[40%] lg:w-[34%]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        {/* Glow halo behind advancement window */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[95%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(closest-side, rgba(252, 220, 95, 0.16), rgba(252, 220, 95, 0) 70%)",
          }}
        />

        <Reveal>
          <p className="mb-2 text-center font-terminal text-xl tracking-wider text-white/80">
            ▸ The bedrock MineArena is built on
          </p>
          <h2 className="pixel-heading mb-12 text-center text-2xl uppercase text-foreground text-glow-green sm:text-4xl">
            SPONSORS
          </h2>
        </Reveal>

        <div className="grid items-start gap-6 md:grid-cols-2 lg:gap-8">
          {TIERS.map((t, i) => (
            <TierPanel key={t.title} tier={t} index={i} />
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="mt-12 text-center font-terminal text-xl text-white/80">
            Want to sponsor? Write to{" "}
            <a
              href="mailto:codecommit@bietdvg.edu"
              className="text-primary underline hover:text-white"
            >
              codecommit@bietdvg.edu
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
