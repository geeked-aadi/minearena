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
      { title: "MINEARENA 1.0 — National-Level 24-Hour Hackathon at BIET Davangere" },
      {
        name: "description",
        content:
          "MINEARENA 1.0 is a national-level 24-hour Minecraft-themed hackathon at Bapuji Institute of Engineering and Technology, Davangere. ₹75,000 prize pool. Nov 13–14, 2026.",
      },
      {
        property: "og:title",
        content: "MINEARENA 1.0 — National-Level 24-Hour Hackathon at BIET Davangere",
      },
      {
        property: "og:description",
        content:
          "Innovate. Build. Transform. A national-level 24-hour hackathon at BIET Davangere with a ₹75,000 prize pool. Nov 13–14, 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TIMELINE = [
  { date: "Oct 15, 2026", title: "Registrations Open", desc: "Registration and first-round ideation submissions begin." },
  { date: "Oct 30, 2026", title: "Idea Submission Deadline", desc: "First-round ideation submissions close. Final call." },
  { date: "Nov 5, 2026", title: "Top 50 Teams Announced", desc: "Selected teams qualify for the on-campus round." },
  { date: "Nov 5–12, 2026", title: "Confirmation & Fee Payment", desc: "Selected teams complete registration formalities and fee payment." },
  { date: "Nov 13–14, 2026", title: "24-Hour On-Campus Hackathon", desc: "The main event at BIET Campus, Davangere. Loot distributed." },
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
      { q: "How can I apply?", a: "Registrations open Oct 15, 2026 — fill the form and submit your ideation entry before Oct 30." },
      { q: "How much will it cost?", a: "The ideation round is free. Shortlisted teams complete a participation-fee payment during Nov 5–12 to confirm their on-campus slot." },
      { q: "Is the hackathon online or offline?", a: "Fully offline at the BIET campus — 24 hours, doors open round the clock." },
    ],
  },
  {
    category: "Building & Judging",
    items: [
      { q: "What are the problem statements?", a: "Tracks across Web, AI/ML, Hardware and Open Innovation — revealed at the opening ceremony." },
      { q: "What can I build?", a: "Anything that solves the problem: apps, tools, games, hardware — if you can demo it, it counts." },
      { q: "Can I start working on my hack before the event?", a: "No — all code must be written during the 24-hour window. Ideas and research beforehand are fine." },
      { q: "What are the prizes to be won?", a: "Check the Prizes section — a ₹75,000 prize pool across the podium and special awards." },
    ],
  },
  {
    category: "Logistics & Support",
    items: [
      { q: "What facilities will be provided to the participants?", a: "Meals, snacks, coffee, Wi-Fi, power, rest zones and mentor support — all on us." },
      { q: "Will the organizers carry the cost of travel for shortlisted teams?", a: "Travel is on the participants; everything inside the venue is covered by us." },
      { q: "What if I have more queries?", a: "Reach out to the Code Commit team at BIET Davangere — we reply within a day." },
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
            BIET DAVANGERE PRESENTS
          </p>
          <h1 className="pixel-heading text-2xl leading-relaxed text-foreground sm:text-4xl lg:text-5xl">
            MINEARENA
          </h1>
          <h2 className="pixel-heading mt-3 text-lg text-primary text-glow-green sm:text-2xl">
            1.0 · NATIONAL HACKATHON
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-terminal text-2xl text-foreground/90">
            Innovate. Build. Transform. 24 hours in the Overworld.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 font-terminal text-xl text-foreground/80">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" /> Nov 13–14, 2026
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> SSM Cultural Hall, BIET Davangere
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
            MINEARENA 1.0 is a national-level, 24-hour hackathon at Bapuji
            Institute of Engineering and Technology, Davangere — a platform for
            innovation, collaboration and technology-driven problem-solving.
            Bringing together passionate students, developers and creative
            thinkers from across the country, it transforms ideas into impactful
            solutions. Just like Minecraft, there are no limits here — only the
            ones you haven't broken yet.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Clock, stat: "24", label: "Hours of hacking" },
              { icon: Users, stat: "Top 50", label: "Teams on campus" },
              { icon: Trophy, stat: "₹75,000", label: "Prize pool" },
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

      {/* TIMELINE */}
      <section id="flow" className="mx-auto max-w-3xl px-4 py-24">
        <SectionHeading>TIMELINE</SectionHeading>
        <ol className="relative border-l-2 border-border pl-8">
          {TIMELINE.map((item) => (
            <li key={item.date + item.title} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[41px] flex h-4 w-4 items-center justify-center border-2 border-primary bg-background" />
              <p className="pixel-heading text-[10px] text-gold">{item.date}</p>
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
            { icon: CalendarDays, title: "When", body: "November 13–14, 2026. Registrations open Oct 15; idea submissions close Oct 30; top 50 teams announced Nov 5." },
            { icon: MapPin, title: "Where", body: "SSM Cultural Hall, BIET Campus, Davangere, Karnataka. On-campus round for shortlisted teams." },
            { icon: Users, title: "Who", body: "Students from institutions across the country. Top 50 teams from the ideation round make it to campus." },
            { icon: ScrollText, title: "What to build", body: "Identify a real-world problem, develop an innovative solution, and build a working prototype within 24 hours." },
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
        <div className="space-y-10">
          {FAQ_GROUPS.map((group) => (
            <div key={group.category}>
              <h3 className="pixel-heading mb-4 text-[11px] text-gold">
                {group.category}
              </h3>
              <div className="space-y-4">
                {group.items.map((f) => (
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
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-border px-4 py-10 text-center">
        <p className="pixel-heading text-[10px] text-primary text-glow-green">
          MINEARENA 1.0
        </p>
        <p className="mt-3 font-terminal text-lg text-muted-foreground">
          Organized by Code Commit — Build fast. Commit to it. · Student tech club, BIET Davangere
        </p>
        <p className="mt-1 font-terminal text-lg text-muted-foreground">
          An Institution's Innovation Council (Ministry of Education) initiative · Not affiliated with Mojang or Microsoft.
        </p>
      </footer>

      <MusicBar />
    </div>
  );
}
