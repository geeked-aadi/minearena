import sponsorBg from "@/assets/SPONSOR_BG.png";
import sponsorBgLeft from "@/assets/SPONSOR_BG_LEFT.png";
import sponsorBgRight from "@/assets/SPONSOR_BG_RIGHT.png";
import { Reveal } from "./Reveal";

/*
  HOW TO ADD A REAL SPONSOR LATER
  1. Import the logo:      import acmeLogo from "@/assets/acme.png";
  2. Replace the placeholder entry with:
        { name: "Acme", url: "https://acme.com", logo: acmeLogo }
  Entries without a `logo` show the dashed "YOUR LOGO HERE" placeholder.
  Entries with url "#" are not clickable.
*/

type Sponsor = { name: string; url: string; logo?: string };

type Tier = {
  itemIcon: string;
  title: string;
  lamp: string;
  sponsors: Sponsor[];
};

const PLACEHOLDER: Sponsor = { name: "Sponsor logo", url: "#" };

const TIERS: Tier[] = [
  {
    itemIcon: "/item-diamond.png",
    title: "Title Sponsor",
    lamp: "#41c65b",
    sponsors: [PLACEHOLDER],
  },
  {
    itemIcon: "/item-lapis.png",
    title: "Hosting Partner",
    lamp: "#5ff2f2",
    sponsors: [PLACEHOLDER],
  },
  {
    itemIcon: "/item-porkchop.png",
    title: "Refreshment Partner",
    lamp: "#e79ba9",
    sponsors: [PLACEHOLDER],
  },
  {
    itemIcon: "/item-glowstone.png",
    title: "Certificate Partner",
    lamp: "#e0dca8",
    sponsors: [PLACEHOLDER],
  },
  {
    itemIcon: "/item-ender-eye.png",
    title: "AI Partner",
    lamp: "#a855f7",
    sponsors: [PLACEHOLDER],
  },
  {
    itemIcon: "/item-firework.png",
    title: "Fun & Media Partner",
    lamp: "#fbbf24",
    sponsors: [PLACEHOLDER],
  },
];

function TierPanel({ tier, index }: { tier: Tier; index: number }) {
  return (
    <Reveal delay={index * 0.12}>
      {/*
        MOBILE SIZE KNOB: the whole panel is built at its normal (desktop) proportions and then
        shrunk on phones with CSS `zoom`, so borders, bevels, notches and text all scale together.
        - w-[66%]   → how wide the panel is on mobile (reference poster is ~55%)
        - zoom:0.6  → how small everything inside is (lower = smaller)
        From md up, both are reset so desktop is unchanged.
      */}
      <div className="mx-auto w-[66%] [zoom:0.6] md:w-auto md:[zoom:1]">
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
                className="pixel-heading truncate text-xs uppercase"
                style={{ color: "oklch(0.85 0.02 120)" }}
              >
                {tier.title}
              </h3>
            </div>
            <span className="mc-gui mc-notch flex h-6 w-6 shrink-0 items-center justify-center">
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
          <div className="mc-slot mt-2 p-2 md:mt-3 md:p-4">
            <div className="flex flex-wrap justify-center gap-4">
              {tier.sponsors.map((s) => {
                const isLink = s.url && s.url !== "#";
                return (
                  <a
                    key={s.name}
                    href={isLink ? s.url : undefined}
                    target={isLink ? "_blank" : undefined}
                    rel={isLink ? "noreferrer noopener" : undefined}
                    aria-label={`${s.name} — ${tier.title}`}
                    className="mc-gold-frame mc-notch mc-shine block w-full max-w-xs transition-transform hover:-translate-y-1"
                  >
                    <span
                      className="m-2 flex aspect-[5/1] items-center justify-center bg-white md:aspect-[2.6/1]"
                      style={{
                        boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.85)",
                      }}
                    >
                      {s.logo ? (
                        <img
                          src={s.logo}
                          alt={s.name}
                          className="max-h-8 max-w-[80%] object-contain md:max-h-12"
                        />
                      ) : (
                        /* Placeholder: dashed slot with label */
                        <span className="flex h-[74%] w-[88%] items-center justify-center border-2 border-dashed border-[#9aa0aa]">
                          <span
                            className="pixel-heading px-2 text-center text-xs uppercase leading-[1.6] md:text-[10px]"
                            style={{ color: "#7b818c" }}
                          >
                            Your logo here
                          </span>
                        </span>
                      )}
                    </span>
                  </a>
                );
              })}
            </div>
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
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 sm:px-6 md:py-24"
    >
      {/* Background layer and flanks (unchanged) */}
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

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-5xl text-center">
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
          <p className="mb-2 text-center font-terminal text-lg tracking-wider text-white/80 md:text-xl">
            ▸ The MineArena is built on
          </p>
          <h2 className="pixel-heading mb-8 text-center text-2xl uppercase text-foreground text-glow-green sm:text-4xl md:mb-12">
            SPONSORS
          </h2>
        </Reveal>

        <div className="grid items-start gap-3 md:grid-cols-2 md:gap-6 lg:gap-8">
          {TIERS.map((t, i) => (
            <TierPanel key={t.title} tier={t} index={i} />
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="mt-10 text-center font-terminal text-lg text-white/80 md:mt-12 md:text-xl">
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