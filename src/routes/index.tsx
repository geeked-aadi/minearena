import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  MapPin,
  Users,
  Clock,
  Trophy,
  ScrollText,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { MusicBar } from "../components/MusicBar";
import { CursorFollower } from "../components/CursorFollower";
import campusHero from "../assets/voxel-biet-campus.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mindcraft Hackathon — BIET's Minecraft-Themed Hackathon" },
      {
        name: "description",
        content:
          "Mindcraft Hackathon at BIET: a 24-hour Minecraft-themed hackathon. Build, craft and innovate in the Overworld. Oct 10–11, 2026.",
      },
      {
        property: "og:title",
        content: "Mindcraft Hackathon — BIET's Minecraft-Themed Hackathon",
      },
      {
        property: "og:description",
        content:
          "A 24-hour Minecraft-themed hackathon at BIET. Build, craft and innovate in the Overworld. Oct 10–11, 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FLOW = [
  { time: "09:00", title: "Check-in & Team Assembly", desc: "Collect your badges, find your crafting table." },
  { time: "10:00", title: "Opening Ceremony", desc: "Theme reveal and problem statements drop." },
  { time: "11:00", title: "Hacking Begins", desc: "24 hours on the clock. Start building." },
  { time: "20:00", title: "Mentor Round 1", desc: "Mentors visit every team for feedback." },
  { time: "08:00", title: "Mentor Round 2", desc: "Final polish guidance before submissions." },
  { time: "11:00", title: "Submissions Close", desc: "Push your build to the portal. Tools down." },
  { time: "13:00", title: "Judging & Demos", desc: "Present your creation to the panel." },
  { time: "16:00", title: "Prize Ceremony", desc: "Winners crowned. Loot distributed." },
];

const RULES = [
  "Teams of 2–4 players. Solo adventurers welcome — we'll match you.",
  "All code must be written during the 24-hour event window.",
  "Open-source libraries and APIs are allowed; pre-built projects are not.",
  "Hardware hacks are welcome — bring your own components.",
  "Be respectful. Griefing other teams means instant disqualification.",
  "Judges' decisions are final, like bedrock.",
];

const PRIZES = [
  { place: "1ST", amount: "₹50,000", note: "+ Diamond trophies & swag", highlight: true },
  { place: "2ND", amount: "₹30,000", note: "+ Gold trophies & swag", highlight: false },
  { place: "3RD", amount: "₹20,000", note: "+ Iron trophies & swag", highlight: false },
];

const FAQS = [
  {
    q: "Who can participate?",
    a: "Any college student with a valid ID. Beginners and veterans alike — the Overworld welcomes all.",
  },
  {
    q: "Is there a registration fee?",
    a: "No. Entry is completely free, including food, drinks and a place to crash overnight.",
  },
  {
    q: "Do I need a team before registering?",
    a: "No. Register solo and we'll help you find teammates at the team-formation session.",
  },
  {
    q: "What should I bring?",
    a: "Your laptop, charger, college ID and any hardware you want to hack with. We provide the rest.",
  },
  {
    q: "Can I stay overnight at the venue?",
    a: "Yes — the campus stays open all 24 hours with rest zones, snacks and plenty of coffee.",
  },
];

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="pixel-heading mb-10 text-center text-lg text-primary text-glow-green sm:text-2xl">
      {children}
    </h2>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      <CursorFollower />

      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <img
          src={campusHero.url}
          alt="Voxel art of the BIET campus at sunset"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/55" />
        <div className="relative z-10 px-4 text-center">
          <p className="pixel-heading mb-4 text-[10px] tracking-widest text-gold sm:text-xs">
            BIET PRESENTS
          </p>
          <h1 className="pixel-heading text-2xl leading-relaxed text-foreground sm:text-4xl lg:text-5xl">
            MINDCRAFT
          </h1>
          <h2 className="pixel-heading mt-3 text-lg text-primary text-glow-green sm:text-2xl">
            HACKATHON
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-terminal text-2xl text-foreground/90">
            24 hours. One Overworld. Build something legendary.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 font-terminal text-xl text-foreground/80">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" /> Oct 10–11, 2026
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> BIET Campus
            </span>
          </div>
          <a
            href="#details"
            className="mc-button mt-10 inline-block px-8 py-4 text-xs sm:text-sm"
          >
            REGISTER NOW
          </a>
        </div>
        <ChevronDown className="absolute bottom-8 left-1/2 z-10 h-8 w-8 -translate-x-1/2 animate-bounce text-primary" />
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-5xl px-4 py-24">
        <SectionHeading>ABOUT</SectionHeading>
        <div className="mc-card p-8 text-center">
          <p className="font-terminal text-2xl leading-relaxed text-foreground/90">
            Mindcraft Hackathon is BIET's flagship 24-hour build-a-thon, themed
            around the blocky universe we all grew up in. Just like Minecraft,
            there are no limits here — only the ones you haven't broken yet.
            Gather your party, pick a problem statement, and craft a working
            prototype before the sun rises twice.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Clock, stat: "24", label: "Hours of hacking" },
              { icon: Users, stat: "300+", label: "Builders expected" },
              { icon: Trophy, stat: "₹1L+", label: "Prize pool" },
            ].map(({ icon: Icon, stat, label }) => (
              <div key={label} className="border-2 border-border bg-secondary p-4">
                <Icon className="mx-auto h-6 w-6 text-primary" />
                <p className="pixel-heading mt-3 text-sm text-gold">{stat}</p>
                <p className="font-terminal text-lg text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section id="flow" className="mx-auto max-w-3xl px-4 py-24">
        <SectionHeading>EVENT FLOW</SectionHeading>
        <ol className="relative border-l-2 border-border pl-8">
          {FLOW.map((item) => (
            <li key={item.time + item.title} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[41px] flex h-4 w-4 items-center justify-center border-2 border-primary bg-background" />
              <p className="pixel-heading text-[10px] text-gold">{item.time}</p>
              <h3 className="pixel-heading mt-2 text-[11px] text-foreground">
                {item.title}
              </h3>
              <p className="font-terminal text-xl text-muted-foreground">{item.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* DETAILS */}
      <section id="details" className="mx-auto max-w-5xl px-4 py-24">
        <SectionHeading>DETAILS</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { icon: CalendarDays, title: "When", body: "October 10–11, 2026. Check-in opens 9:00 AM on Day 1, prize ceremony wraps by 5:00 PM on Day 2." },
            { icon: MapPin, title: "Where", body: "BIET Main Campus — Central Block & Innovation Labs. Overnight stay zones included." },
            { icon: Users, title: "Who", body: "Teams of 2–4 college students from any stream. Solo registrations get matched with a team." },
            { icon: ScrollText, title: "What to build", body: "Problem statements across Web, AI/ML, Hardware and Open Innovation, revealed at the opening ceremony." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="mc-card p-6">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="pixel-heading mt-3 text-[11px] text-foreground">{title}</h3>
              <p className="mt-2 font-terminal text-xl leading-snug text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* RULES */}
      <section id="rules" className="mx-auto max-w-3xl px-4 py-24">
        <SectionHeading>RULES</SectionHeading>
        <div className="mc-card p-8">
          <ul className="space-y-4">
            {RULES.map((rule, i) => (
              <li key={rule} className="flex gap-4 font-terminal text-xl text-foreground/90">
                <span className="pixel-heading shrink-0 text-[10px] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRIZES */}
      <section id="prizes" className="mx-auto max-w-5xl px-4 py-24">
        <SectionHeading>PRIZES</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-3">
          {PRIZES.map((p) => (
            <div
              key={p.place}
              className={`mc-card p-8 text-center ${p.highlight ? "border-primary" : ""}`}
            >
              <Trophy
                className={`mx-auto h-10 w-10 ${p.highlight ? "text-gold" : "text-muted-foreground"}`}
              />
              <p className="pixel-heading mt-4 text-xs text-primary">{p.place} PLACE</p>
              <p className="pixel-heading mt-3 text-lg text-foreground">{p.amount}</p>
              <p className="mt-2 font-terminal text-lg text-muted-foreground">{p.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center font-terminal text-xl text-muted-foreground">
          Plus track prizes, best all-girls team, and best freshman team awards.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-24">
        <SectionHeading>FAQ</SectionHeading>
        <div className="space-y-4">
          {FAQS.map((f) => (
            <details key={f.q} className="mc-card group p-6">
              <summary className="flex cursor-pointer list-none items-center gap-3">
                <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
                <span className="pixel-heading text-[10px] leading-relaxed text-foreground">
                  {f.q}
                </span>
              </summary>
              <p className="mt-4 pl-8 font-terminal text-xl text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-border px-4 py-10 text-center">
        <p className="pixel-heading text-[10px] text-primary text-glow-green">
          MINDCRAFT HACKATHON
        </p>
        <p className="mt-3 font-terminal text-lg text-muted-foreground">
          Organized by the BIET Developer Society · hello@mindcrafthacks.dev
        </p>
        <p className="mt-1 font-terminal text-lg text-muted-foreground">
          Not affiliated with Mojang or Microsoft. Made with ⛏ by students.
        </p>
      </footer>

      <MusicBar />
    </div>
  );
}
