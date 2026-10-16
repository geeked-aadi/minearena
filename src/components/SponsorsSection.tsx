import sponsorBg from "@/assets/SPONSOR_BG.png";
import sponsorBgLeft from "@/assets/SPONSOR_BG_LEFT.png";
import sponsorBgRight from "@/assets/SPONSOR_BG_RIGHT.png";
import rakuten from "@/assets/rakuten.png";
import cleo from "@/assets/cleo.png";
import prolim from "@/assets/prolim.png";
import namana from "@/assets/namana.jpeg";
import logicBrackets from "@/assets/logicbrackets.jpeg";
import elevenLabs from "@/assets/elevenlabs.jpeg";
import devpost from "@/assets/devpost.jpg";
import inube from "@/assets/inube.jpg";
import { Reveal } from "./Reveal";

type Sponsor = { name: string; url: string; logo: string };

const ITEM_ICONS = [
  "/item-diamond.png",
  "/item-lapis.png",
  "/item-porkchop.png",
  "/item-glowstone.png",
  "/item-ender-eye.png",
  "/item-firework.png",
  "/item-emerald.png",
] as const;

const SPONSORS: Sponsor[] = [
  { name: "Rakuten", url: "https://www.rakuten.com", logo: rakuten },
  { name: "Cleo", url: "https://www.cleo.com", logo: cleo },
  { name: "Prolim", url: "https://www.prolim.com", logo: prolim },
  { name: "Namana", url: "https://namana.co.in", logo: namana },
  { name: "Logic Brackets", url: "https://logicbrackets.com", logo: logicBrackets },
  { name: "Eleven Labs", url: "https://elevenlabs.io", logo: elevenLabs },
  { name: "Inube", url: "https://www.inube.com", logo: inube },
  { name: "Devpost", url: "https://devpost.com", logo: devpost },
];

function SponsorCard({ sponsor, index }: { sponsor: Sponsor; index: number }) {
  const itemIcon = ITEM_ICONS[index % ITEM_ICONS.length];
  const lamp = ["#41c65b", "#5ff2f2", "#e79ba9", "#e0dca8", "#a855f7", "#ffc32b", "#6ee7b7"][index % 7];
  const isLink = sponsor.url && sponsor.url !== "#";

  return (
    <Reveal delay={index * 0.12}>
      {/* MOBILE SIZE KNOB */}
      <div className="mx-auto w-[66%] [zoom:0.6] md:w-auto md:[zoom:1]">
        {/* Minecraft advancement-window panel */}
        <div className="mc-gui mc-notch p-3">
          {/* Title bar: item icon + inset label + status lamp */}
          <div className="flex items-center gap-3">
            <span className="mc-gui mc-notch flex h-11 w-11 shrink-0 items-center justify-center bg-[#c6c6c6] p-1">
              <img src={itemIcon} alt="" className="h-7 w-7 object-contain" style={{ imageRendering: "pixelated" }} />
            </span>
            <div className="mc-slot flex h-8 min-w-0 flex-1 items-center justify-center px-3">
              <h3 className="pixel-heading truncate text-xs uppercase" style={{ color: "oklch(0.85 0.02 120)" }}>
                {sponsor.name}
              </h3>
            </div>
            <span className="mc-gui mc-notch flex h-6 w-6 shrink-0 items-center justify-center">
              <span className="block h-3 w-3" style={{ backgroundColor: lamp, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.55)" }} />
            </span>
          </div>

          {/* Inset slot area holding the sponsor tile */}
          <div className="mc-slot mt-2 p-2 md:mt-3 md:p-4">
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={isLink ? sponsor.url : undefined}
                target={isLink ? "_blank" : undefined}
                rel={isLink ? "noreferrer noopener" : undefined}
                aria-label={sponsor.name}
                className="mc-gold-frame mc-notch mc-shine block w-full max-w-xs transition-transform hover:-translate-y-1"
              >
                <span className="m-2 flex aspect-[2.6/1] items-center justify-center bg-white" style={{ boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.85)" }}>
                  <img src={sponsor.logo} alt={sponsor.name} className="h-12 w-auto object-contain" />
                </span>
              </a>
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
        <img src={sponsorBgLeft} alt="" className="pointer-events-none absolute bottom-0 left-0 h-auto w-[46%] max-w-[35rem] select-none object-left opacity-95 sm:w-[40%] lg:w-[34%]" />
        <img src={sponsorBgRight} alt="" className="pointer-events-none absolute bottom-0 right-0 h-auto w-[46%] max-w-[35rem] select-none object-right opacity-95 sm:w-[40%] lg:w-[34%]" />
      </div>

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-5xl text-center">
        {/* Glow halo behind advancement window */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[95%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(closest-side, rgba(252, 220, 95, 0.16), rgba(252, 220, 95, 0) 70%)",
          }}
        />

        <Reveal>
          <p className="mb-2 text-center font-terminal text-lg tracking-wider text-white/80 md:text-xl">
            ▸ The MineArena is built on
          </p>
          <h2 className="pixel-heading mb-8 text-center text-2xl uppercase text-foreground text-glow-green sm:text-4xl md:mb-12">
            Our Partners
          </h2>
        </Reveal>

        <div className="grid items-start gap-3 md:grid-cols-2 md:gap-6 lg:gap-8">
          {SPONSORS.map((sponsor, i) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} index={i} />
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="mt-10 text-center font-terminal text-lg text-white/80 md:mt-12 md:text-xl">
            Want to sponsor? Write to{" "}
            <a href="mailto:codecommit@bietdvg.edu" className="text-primary underline hover:text-white">
              codecommit@bietdvg.edu
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
