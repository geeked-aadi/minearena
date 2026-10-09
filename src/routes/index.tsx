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
import { PrizesSection } from "../components/PrizesSection";
import { SponsorsSection } from "../components/SponsorsSection";
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

const TIMELINE = [
  { date: "Sep 1, 2026", title: "Registrations Open", desc: "Portals open. Assemble your party and sign up." },
  { date: "Sep 2, 2026", title: "PPT Submissions Begin", desc: "Submit your idea deck for the first screening round." },
  { date: "Oct 3, 2026", title: "PPT Submissions Close", desc: "Final call — no entries accepted after this date." },
  { date: "Oct 5, 2026", title: "Team Shortlisting Ends", desc: "Shortlisted teams announced via email and the portal." },
  { date: "Oct 10, 2026", title: "Hackathon Begins", desc: "Check-in, opening ceremony, and 24 hours on the clock." },
  { date: "Oct 11, 2026", title: "Hackathon Ends", desc: "Demos, judging, and the prize ceremony. Loot distributed." },
];

const RULES = [
  "Teams of 2–4 players. Solo adventurers welcome — we'll match you.",
  "All code must be written during the 24-hour event window.",
  "Open-source libraries and APIs are allowed; pre-built projects are not.",
  "Hardware hacks are welcome — bring your own components.",
  "Be respectful. Griefing other teams means instant disqualification.",
  "Judges' decisions are final, like bedrock.",
];

const FAQ_GROUPS = [
  {
    category: "Eligibility & Teams",
    items: [
      { q: "Who can participate?", a: "Any college student with a valid ID — beginners and veterans alike. The Overworld welcomes all." },
      { q: "Can we apply as a team?", a: "Yes! Teams of 2–4 can register together. Solo adventurers are welcome too." },
      { q: "Can I have team members from other colleges?", a: "Absolutely — cross-college teams are allowed, as long as every member is a current student." },
      { q: "What if I don't have a team?", a: "Register solo and we'll match you with teammates at the team-formation session." },
      { q: "What if I don't know how to code?", a: "No problem — design, hardware and idea tracks exist, and mentors will help you level up." },
    ],
  },
  {
    category: "Format & Schedule",
    items: [
      { q: "How can I apply?", a: "Hit the Register button, fill the form, and submit your idea deck before Oct 3, 2026." },
      { q: "How much will it cost?", a: "Nothing. Entry is completely free, including food, drinks and a place to crash overnight." },
      { q: "Is the hackathon online or offline?", a: "Fully offline at the BIET campus — 24 hours, doors open round the clock." },
    ],
  },
  {
    category: "Building & Judging",
    items: [
      { q: "What are the problem statements?", a: "Tracks across Web, AI/ML, Hardware and Open Innovation — revealed at the opening ceremony." },
      { q: "What can I build?", a: "Anything that solves the problem: apps, tools, games, hardware — if you can demo it, it counts." },
      { q: "Can I start working on my hack before the event?", a: "No — all code must be written during the 24-hour window. Ideas and research beforehand are fine." },
      { q: "What are the prizes to be won?", a: "Check the Prizes section — a prize pool worth ₹1L+ across the podium and special tracks." },
    ],
  },
  {
    category: "Logistics & Support",
    items: [
      { q: "What facilities will be provided to the participants?", a: "Meals, snacks, coffee, Wi-Fi, power, rest zones and mentor support — all on us." },
      { q: "Will the organizers carry the cost of travel for shortlisted teams?", a: "Travel is on the participants; everything inside the venue is covered by us." },
      { q: "What if I have more queries?", a: "Reach out anytime at hello@mindcrafthacks.dev — we reply within a day." },
    ],
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

      {/* PRIZES — podium with floating plaques & glowing crystals */}
      <PrizesSection />

      {/* SPONSORS — Minecraft advancement-window panels */}
      <SponsorsSection />

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
