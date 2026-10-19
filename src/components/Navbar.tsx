import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import dirt from "../assets/dirt.png.asset.json";
import grass from "../assets/grass.png.asset.json";
import navbarLogo from "@/assets/navbar-logo.PNG";

const REGISTER_URL =
  "https://minearena-1-0.devpost.com/?preview_token=E6ZpH5CiiYbb1%2BpTW%2F6ykttDuJCuTv%2BdWtVjaduSeds%3D";
const GUIDE_URL = "https://youtu.be/VI1WYXkr9eY?si=Qw0zvICF2B1WmSO_";

const LINKS = [
  { id: "about", label: "ABOUT" },
  { id: "tracks", label: "TRACKS" },
  { id: "timeline", label: "TIMELINE" },
  { id: "rules", label: "RULES" },
  { id: "prizes", label: "PRIZES" },
  { id: "sponsors", label: "SPONSORS" },
  { id: "faq", label: "FAQS" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of ["home", ...LINKS.map((l) => l.id)]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const textShadow = { textShadow: "1px 1px 0 rgb(0 0 0 / 0.6)" };

  return (
    <header className="fixed inset-x-2 top-4 z-40 md:inset-x-6">
      <div className="relative mx-auto max-w-7xl">
        {/* Grass strip on top */}
        <div
          className="absolute inset-x-0 top-0 h-[10px] -translate-y-[9px] border-2 border-b-0 border-[#1f2e14]"
          style={{
            backgroundImage: `url(${grass.url || "/grass.png"})`,
            backgroundSize: "16px 16px",
            backgroundRepeat: "repeat",
            imageRendering: "pixelated",
          }}
        />
        {/* Dirt body */}
        <div
          className="flex items-center justify-between gap-2 rounded-b-[14px] border-2 border-[#1f2e14] px-2 pt-1 pb-3 shadow-[0_10px_28px_rgb(0_0_0/0.4)] sm:gap-4 md:px-4"
          style={{
            backgroundImage: `url(${dirt.url || "/dirt.png"})`,
            backgroundSize: "32px 32px",
            backgroundRepeat: "repeat",
            imageRendering: "pixelated",
          }}
        >
          <button
            onClick={() => scrollTo("home")}
            className="flex h-10 shrink-0 items-center justify-center self-center transition-transform hover:scale-105 active:scale-95"
            aria-label="MINEARENA Hackathon Home"
          >
            <img
              src={navbarLogo}
              alt="MINEARENA 1.0"
              className="block h-7 w-auto object-contain align-middle drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:h-8"
            />
          </button>

          {/* Full nav row: xl and up (there isn't room for 9 items below that) */}
          <nav className="hidden items-center gap-1 xl:flex">
            {LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={textShadow}
                className={`pixel-heading px-2.5 py-1.5 text-[9px] tracking-[0.15em] transition-colors ${
                  active === id ? "text-primary" : "text-foreground/85 hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
            <a
              href={GUIDE_URL}
              target="_blank"
              rel="noreferrer noopener"
              style={textShadow}
              className="pixel-heading px-2.5 py-1.5 text-[9px] tracking-[0.15em] text-[#fbbf24] transition-colors hover:text-white"
            >
              ▶ HOW TO REGISTER
            </a>
          </nav>

          {/* Right group: Register Now (always visible) + hamburger (below xl) */}
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Register Now"
              className="mc-shine pixel-heading border-2 border-[#7a4f05] bg-[#fbbf24] px-2.5 py-2 text-[8px] uppercase tracking-[0.08em] text-[#1a1206] shadow-[inset_2px_2px_0_rgba(255,255,255,0.3),inset_-2px_-2px_0_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5 sm:px-3.5 sm:text-[9px]"
            >
              <span className="sm:hidden">REGISTER</span>
              <span className="hidden sm:inline">REGISTER NOW</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center border border-border bg-secondary/80 text-foreground xl:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile / tablet dropdown */}
        {mobileOpen && (
          <div
            className="mt-2 flex flex-col gap-1 border-2 border-[#1f2e14] p-3 shadow-xl xl:hidden"
            style={{
              backgroundImage: `url(${dirt.url})`,
              backgroundSize: "32px 32px",
              imageRendering: "pixelated",
            }}
          >
            {LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={textShadow}
                className={`pixel-heading py-2 text-left text-[10px] tracking-wider transition-colors ${
                  active === id ? "text-primary" : "text-foreground/90 hover:text-primary"
                }`}
              >
                ▸ {label}
              </button>
            ))}
            <a
              href={GUIDE_URL}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setMobileOpen(false)}
              style={textShadow}
              className="pixel-heading py-2 text-left text-[10px] tracking-wider text-[#fbbf24] transition-colors hover:text-white"
            >
              ▶ HOW TO REGISTER
            </a>
          </div>
        )}
      </div>
    </header>
  );
}