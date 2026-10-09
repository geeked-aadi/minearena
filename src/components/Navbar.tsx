import { useEffect, useState } from "react";
import { Pickaxe } from "lucide-react";

const LINKS = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "flow", label: "FLOW" },
  { id: "details", label: "DETAILS" },
  { id: "rules", label: "RULES" },
  { id: "prizes", label: "PRIZES" },
  { id: "faq", label: "FAQ" },
];

export function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of LINKS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b-2 border-border bg-background/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center border-2 border-border bg-secondary">
            <Pickaxe className="h-5 w-5 text-primary" />
          </span>
          <span className="text-left leading-tight">
            <span className="pixel-heading block text-[10px] text-foreground">
              MINDCRAFT
            </span>
            <span className="pixel-heading block text-[8px] text-primary text-glow-green">
              HACKATHON
            </span>
          </span>
        </button>

        <ul className="hidden items-center gap-6 md:flex">
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`pixel-heading text-[9px] tracking-wider transition-colors ${
                  active === id
                    ? "text-primary text-glow-green underline decoration-2 underline-offset-8"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <select
          aria-label="Navigate to section"
          className="border-2 border-border bg-secondary px-2 py-1 font-terminal text-lg text-foreground md:hidden"
          value={active}
          onChange={(e) => scrollTo(e.target.value)}
        >
          {LINKS.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </nav>
    </header>
  );
}
