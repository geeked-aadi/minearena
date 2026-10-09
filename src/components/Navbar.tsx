import { useEffect, useState } from "react";
import { Pickaxe } from "lucide-react";
import dirt from "../assets/dirt.png.asset.json";
import grass from "../assets/grass.png.asset.json";

const LINKS = [
  { id: "about", label: "ABOUT" },
  { id: "flow", label: "TIMELINE" },
  { id: "details", label: "DETAILS" },
  { id: "rules", label: "RULES" },
  { id: "prizes", label: "PRIZES" },
  { id: "sponsors", label: "SPONSORS" },
  { id: "faq", label: "FAQS" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

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
    setOpen(false);
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
            backgroundImage: `url(${grass.url})`,
            backgroundSize: "16px 16px",
            imageRendering: "pixelated",
          }}
        />
        {/* Dirt body */}
        <div
          className="flex items-center justify-between gap-4 rounded-b-[14px] border-2 border-[#1f2e14] px-4 py-2 shadow-[0_10px_28px_rgb(0_0_0/0.4)] md:px-6"
          style={{
            backgroundImage: `url(${dirt.url})`,
            backgroundSize: "32px 32px",
            imageRendering: "pixelated",
          }}
        >
          <button onClick={() => scrollTo("home")} className="flex shrink-0 items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center border-2 border-[#1f2e14] bg-background/70">
              <Pickaxe className="h-5 w-5 text-primary" />
            </span>
            <span className="text-left leading-tight" style={textShadow}>
              <span className="pixel-heading block text-[10px] text-foreground">MINE ARENA</span>
              <span className="pixel-heading block text-[8px] text-primary">1.0 · HACKATHON</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1.5 md:flex">
            {LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={textShadow}
                className={`pixel-heading px-3 py-1.5 text-[9px] tracking-[0.15em] transition-colors ${
                  active === id ? "text-primary" : "text-foreground/85 hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex shrink-0 flex-col items-center justify-center gap-1.5 p-3 md:hidden"
          >
            <span className={`block h-[2px] w-5 bg-foreground/85 transition-transform ${open ? "translate-y-[8px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-5 bg-foreground/85 transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[2px] w-5 bg-foreground/85 transition-transform ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
          </button>
        </div>

        {open && (
          <div
            className="mt-2 flex flex-col border-2 border-[#1f2e14] p-2 md:hidden"
            style={{ backgroundImage: `url(${dirt.url})`, backgroundSize: "32px 32px", imageRendering: "pixelated" }}
          >
            {LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={textShadow}
                className="pixel-heading px-3 py-3 text-left text-[10px] tracking-[0.15em] text-foreground"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
