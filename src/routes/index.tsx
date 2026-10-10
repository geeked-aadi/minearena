import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  MapPin,
  Users,
  Clock,
  Trophy,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CursorFollower } from "../components/CursorFollower";
import { PrizesSection } from "../components/PrizesSection";
import { SponsorsSection } from "../components/SponsorsSection";
import { SectionSeam } from "../components/SectionSeam";
import { Reveal } from "../components/Reveal";
import campusHero from "../assets/voxel-biet-campus.png.asset.json";

import aboutBg from "@/assets/about_bg.png";
import aboutLeft from "@/assets/about_left.png";
import aboutRight from "@/assets/about_right.png";
import tracksBg from "@/assets/tracks_bg.png";
import tracksLeft from "@/assets/tracks_left.png";
import tracksRight from "@/assets/tracks_right.png";
import timelineBg from "@/assets/timeline_bg.png";
import timelineLeft from "@/assets/timeline_left.png";
import timelineRight from "@/assets/timeline_right.png";
import faqBg from "@/assets/faq_bg.png";
import faqLeft from "@/assets/faq_left.png";
import faqRight from "@/assets/faq_right.png";
import prevBg from "@/assets/prev_bg.png";
import prevLeft from "@/assets/prev_left.png";
import prevRight from "@/assets/prev_right.png";

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

const TRACKS = [
  {
    title: "IoT & Hardware",
    oreIcon: "/copper_stone.png",
    barColor: "#b5651d",
    desc: "Wire up sensors, boards, and signals. Build something that reaches out of the screen and into the real physical world.",
  },
  {
    title: "Agentic AI / GenAI",
    oreIcon: "/diamond_deepslate.png",
    barColor: "#4c3a8c",
    desc: "Agents that plan, tools they call, models that generate. Ship autonomous AI that actually does the work, not just chats about it.",
  },
  {
    title: "Blockchain / Web3",
    oreIcon: "/gold_nether.png",
    barColor: "#caa23a",
    desc: "Smart contracts, dApps, and on-chain decentralized tooling. Build for a world where trust lives in the code.",
  },
  {
    title: "Open Innovation",
    oreIcon: "/grass.png",
    barColor: "#4a7c4e",
    desc: "No rails, no boundaries. If it solves a pressing real-world problem and you can demo a prototype in 24 hours, build it.",
  },
];

const TIMELINE = [
  {
    date: "October 15, 2026",
    title: "Registrations Open",
    desc: "Registration and first-round ideation submissions begin.",
  },
  {
    date: "October 30, 2026",
    title: "Idea Submission Deadline",
    desc: "First-round ideation submissions close. Final call for team entries.",
  },
  {
    date: "November 5, 2026",
    title: "Top 50 Teams Announced",
    desc: "Selected teams qualify for the on-campus round at BIET Davangere.",
  },
  {
    date: "Nov 5–12, 2026",
    title: "Confirmation & Fee Payment",
    desc: "Selected teams complete registration formalities and confirmation.",
  },
  {
    date: "November 13, 2026",
    title: "24-Hour Hackathon Begins",
    desc: "Opening ceremony and coding kick-off at SSM Cultural Hall, BIET.",
  },
  {
    date: "November 14, 2026",
    title: "Judging & Loot Distribution",
    desc: "Final pitches to judges, evaluation, and prize ceremony.",
  },
];

const RULES = [
  "Teams of 2–4 players. Solo adventurers welcome — we will match you.",
  "All code must be written during the 24-hour event window.",
  "Open-source libraries and APIs are allowed; pre-built projects are disqualified.",
  "Hardware hacks are welcome — bring your own components and boards.",
  "Be respectful. Griefing other teams means instant disqualification.",
  "Judges' decisions are final, indestructible like bedrock.",
];

const FAQ_GROUPS = [
  {
    category: "Eligibility & Teams",
    items: [
      {
        q: "Who can participate?",
        a: "Any college student with a valid ID — beginners and veterans alike. The Overworld welcomes all.",
      },
      {
        q: "Can we apply as a team?",
        a: "Yes! Teams of 2–4 can register together. Solo adventurers are welcome too.",
      },
      {
        q: "Can I have team members from other colleges?",
        a: "Absolutely — cross-college teams are allowed, as long as every member is a current college student.",
      },
      {
        q: "What if I don't have a team?",
        a: "Register solo and we'll match you with teammates at the team-formation session.",
      },
      {
        q: "What if I don't know how to code?",
        a: "No problem — design, hardware and idea tracks exist, and mentors will help you level up.",
      },
    ],
  },
  {
    category: "Format & Schedule",
    items: [
      {
        q: "How can I apply?",
        a: "Registrations open Oct 15, 2026 — fill the form and submit your ideation entry before Oct 30.",
      },
      {
        q: "How much will it cost?",
        a: "The ideation round is free. Shortlisted teams complete a participation fee payment during Nov 5–12 to confirm their on-campus slot.",
      },
      {
        q: "Is the hackathon online or offline?",
        a: "Fully offline at the BIET campus in Davangere — 24 hours, doors open round the clock.",
      },
    ],
  },
  {
    category: "Building & Judging",
    items: [
      {
        q: "What are the problem statements?",
        a: "Tracks across IoT, AI/GenAI, Blockchain and Open Innovation — problem statements and guidelines revealed at the opening ceremony.",
      },
      {
        q: "What can I build?",
        a: "Anything that solves the problem: apps, tools, hardware, agents — if you can demo it, it counts.",
      },
      {
        q: "Can I start working on my hack before the event?",
        a: "No — all code must be written during the 24-hour window. Ideas, planning and research beforehand are fine.",
      },
      {
        q: "What are the prizes to be won?",
        a: "Check the Prizes section — ₹75,000 total prize pool across the podium and special track awards.",
      },
    ],
  },
  {
    category: "Logistics & Support",
    items: [
      {
        q: "What facilities will be provided to participants?",
        a: "Meals, snacks, coffee, Wi-Fi, power, rest zones and mentor support — all on us.",
      },
      {
        q: "Will organizers cover travel for shortlisted teams?",
        a: "Travel is on the participants; everything inside the venue is covered by us.",
      },
      {
        q: "What if I have more queries?",
        a: "Reach out to the Code Commit team at BIET Davangere — codecommit@bietdvg.edu.",
      },
    ],
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      <CursorFollower />

      {/* ===================== HERO SECTION ===================== */}
      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <img
          src={campusHero.url}
          alt="Voxel art of the BIET campus at sunset"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/70" />

        <div className="relative z-10 px-4 text-center">
          <Reveal>
            <div
              className="pointer-events-auto inline-flex flex-col items-center gap-4"
              style={{
                backgroundImage: `url('/hero_bg.png')`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                paddingTop: "32px",
                paddingBottom: "40px",
                paddingLeft: "40px",
                paddingRight: "40px",
                filter:
                  "drop-shadow(0 10px 0 rgba(0,0,0,0.45)) drop-shadow(0 14px 28px rgba(0,0,0,0.55))",
              }}
            >
              <div className="flex flex-col items-center gap-3">
                <p
                  className="pixel-heading text-xs uppercase tracking-[0.2em] text-[#f5ead0] sm:text-sm"
                  style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.55)" }}
                >
                  BIET DAVANGERE PRESENTS
                </p>
                <h1
                  className="pixel-heading text-3xl leading-relaxed text-[#ffffff] sm:text-5xl lg:text-6xl"
                  style={{
                    textShadow:
                      "4px 4px 0 #000, 0 0 30px rgba(251,191,36,0.45)",
                  }}
                >
                  MINEARENA
                </h1>
                <h2
                  className="pixel-heading text-base text-primary sm:text-2xl"
                  style={{ textShadow: "2px 2px 0 #000" }}
                >
                  1.0 · NATIONAL HACKATHON
                </h2>

                <p className="max-w-md text-center font-terminal text-2xl text-[#f5ead0]">
                  Join us at SSM Cultural Hall, BIET Davangere
                </p>

                <span
                  className="inline-block px-4 py-1.5 text-xs font-pixel uppercase tracking-[0.2em] select-none text-[#3a2a18]"
                  style={{
                    background: "#a9772f",
                    border: "2px solid #2b1d10",
                    boxShadow:
                      "inset 2px 2px 0 rgba(255,255,255,0.25), inset -2px -2px 0 rgba(0,0,0,0.35)",
                  }}
                >
                  Nov 13–14, 2026 · ₹75,000 Prize Pool
                </span>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="#about"
                    className="mc-button px-8 py-3 text-xs sm:text-sm"
                  >
                    EXPLORE DUNGEON
                  </a>
                  <a
                    href="#prizes"
                    className="mc-button mc-button-gold px-8 py-3 text-xs sm:text-sm"
                  >
                    VIEW LOOT ₹75K
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <a
          href="#about"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-primary hover:text-white"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </a>
      </section>

      <SectionSeam />

      {/* ===================== ABOUT SECTION ===================== */}
      <section
        id="about"
        className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 sm:px-6"
        style={{
          backgroundImage: `url(${aboutBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-[#0c0c0e]/20" />
        <img
          src={aboutLeft}
          alt=""
          className="pointer-events-none absolute bottom-0 left-0 z-10 h-full w-auto max-w-[46vw] select-none object-cover object-left"
        />
        <img
          src={aboutRight}
          alt=""
          className="pointer-events-none absolute bottom-0 right-0 z-10 h-full w-auto max-w-[46vw] select-none object-cover object-right"
        />

        <div className="relative z-30 mx-auto w-full max-w-5xl text-left">
          <div className="grid w-full gap-6 md:grid-cols-2 md:items-stretch md:gap-6">
            {/* Left Page: About overview */}
            <Reveal className="h-full z-30 relative">
              <div className="relative h-full z-30">
                <div
                  className="absolute inset-0 z-20"
                  style={{
                    backgroundImage: "url('/book_bg.png')",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    imageRendering: "pixelated",
                    transform: "scaleX(-1)",
                  }}
                />
                <div className="relative z-30 flex h-full flex-col justify-between px-8 py-10 sm:px-10 sm:py-12 md:px-14 md:py-16">
                  <div>
                    <h2 className="pixel-heading text-2xl uppercase text-[#3a2a17] sm:text-3xl md:text-4xl font-bold">
                      ABOUT
                    </h2>
                    <div className="my-3 h-1 w-16 bg-[#3a2a17]/40" />
                    <p className="font-terminal text-sm leading-relaxed text-[#3a2a17d9] sm:text-base">
                      MINEARENA 1.0 is BIET Davangere's flagship 24-hour national
                      hackathon, uniting top student developers, creators, and
                      innovators from across India to solve high-impact challenges.
                    </p>
                    <p className="mt-3 font-terminal text-sm leading-relaxed text-[#3a2a17d9] sm:text-base">
                      Hosted at the historic SSM Cultural Hall, participants
                      receive dedicated mentorship, high-speed connectivity, meals,
                      and a platform to build solutions from scratch. Just like
                      Minecraft, there are no boundaries — only the blocks you
                      place.
                    </p>
                  </div>

                  <div className="mt-6 rounded-none border-2 border-[#3a2a17] bg-[#e9e0ca]/90 p-2 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.2)]">
                    <div className="grid grid-cols-3 text-center">
                      <div className="border-r-2 border-[#3a2a17]/40 px-1 py-2">
                        <Clock className="mx-auto h-6 w-6 text-[#3a2a17] sm:h-7 sm:w-7" />
                        <span className="pixel-heading mt-1 block text-[20px] leading-none text-[#3a2a17] sm:text-[28px]">24</span>
                        <span className="pixel-heading block text-[10px] text-[#3a2a17] sm:text-xs">HRS</span>
                        <span className="font-terminal text-[10px] text-[#3a2a17]/80 sm:text-xs">Hacking</span>
                      </div>
                      <div className="border-r-2 border-[#3a2a17]/40 px-1 py-2">
                        <Users className="mx-auto h-6 w-6 text-[#3a2a17] sm:h-7 sm:w-7" />
                        <span className="pixel-heading mt-1 block text-[20px] leading-none text-[#3a2a17] sm:text-[28px]">50</span>
                        <span className="pixel-heading block text-[10px] text-[#3a2a17] sm:text-xs">TOP</span>
                        <span className="font-terminal text-[10px] text-[#3a2a17]/80 sm:text-xs">Teams</span>
                      </div>
                      <div className="px-1 py-2">
                        <Trophy className="mx-auto h-6 w-6 text-[#3a2a17] sm:h-7 sm:w-7" />
                        <span className="pixel-heading mt-1 block text-[18px] leading-none text-[#3a2a17] sm:text-[26px]">₹75K</span>
                        <span className="pixel-heading block text-[10px] text-[#3a2a17] sm:text-xs">POOL</span>
                        <span className="font-terminal text-[10px] text-[#3a2a17]/80 sm:text-xs">Prize</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Page: Notice Board Quests */}
            <Reveal delay={0.2} className="h-full z-30 relative">
              <div className="relative h-full z-30">
                <div
                  className="absolute inset-0 z-20"
                  style={{
                    backgroundImage: "url('/book_bg.png')",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    imageRendering: "pixelated",
                  }}
                />
                <div className="relative z-30 flex h-full flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-14">
                  <div>
                    <div className="flex items-center justify-between border-b-2 border-dashed border-[#3a2a17]/50 pb-3">
                      <span className="pixel-heading flex items-center gap-2 text-[14px] uppercase tracking-[0.08em] text-[#3a2a17] sm:text-xl">
                        <span className="text-lg sm:text-2xl">📜</span>
                        NOTICE BOARD
                      </span>
                      <span className="font-terminal text-[10px] text-[#3a2a17]/80 sm:text-sm">
                        Open Bounties
                      </span>
                    </div>

                    <div className="mt-4 space-y-4">
                      {/* Quest 1 */}
                      <div className="border-b border-dashed border-[#3a2a17]/35 pb-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="pixel-heading text-[11px] text-[#3a2a17] sm:text-sm">
                            📦 Quest: Sponsor
                          </span>
                          <span className="font-terminal text-[10px] text-[#3a2a17]/80 sm:text-xs">
                            Reward: Campus brand reach
                          </span>
                        </div>
                        <a
                          href="mailto:codecommit@bietdvg.edu?subject=Sponsor%20Inquiry%20MineArena"
                          className="mc-shine mt-2 block border-2 border-[#7a4f05] bg-[#fbbf24] px-3 py-2 text-center font-pixel text-[10px] uppercase text-[#1a1206] shadow-[inset_2px_2px_0_rgba(255,255,255,0.3),inset_-2px_-2px_0_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5 sm:text-[12px]"
                        >
                          Accept Quest →
                        </a>
                      </div>

                      {/* Quest 2 */}
                      <div className="border-b border-dashed border-[#3a2a17]/35 pb-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="pixel-heading text-[11px] text-[#3a2a17] sm:text-sm">
                            ⚖ Quest: Judge / Mentor
                          </span>
                          <span className="font-terminal text-[10px] text-[#3a2a17]/80 sm:text-xs">
                            Reward: Front-row seat to talent
                          </span>
                        </div>
                        <a
                          href="mailto:codecommit@bietdvg.edu?subject=Judge%20Inquiry%20MineArena"
                          className="mc-shine mt-2 block border-2 border-[#0b5f6e] bg-[#22d3ee] px-3 py-2 text-center font-pixel text-[10px] uppercase text-[#1a1206] shadow-[inset_2px_2px_0_rgba(255,255,255,0.3),inset_-2px_-2px_0_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5 sm:text-[12px]"
                        >
                          Accept Quest →
                        </a>
                      </div>

                      {/* Quest 3 */}
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="pixel-heading text-[11px] text-[#3a2a17] sm:text-sm">
                            🤝 Quest: Community Partner
                          </span>
                          <span className="font-terminal text-[10px] text-[#3a2a17]/80 sm:text-xs">
                            Reward: Co-branded student network
                          </span>
                        </div>
                        <a
                          href="mailto:codecommit@bietdvg.edu?subject=Partner%20Inquiry%20MineArena"
                          className="mc-shine mt-2 block border-2 border-[#5b2d80] bg-[#c084fc] px-3 py-2 text-center font-pixel text-[10px] uppercase text-[#1a1206] shadow-[inset_2px_2px_0_rgba(255,255,255,0.3),inset_-2px_-2px_0_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5 sm:text-[12px]"
                        >
                          Accept Quest →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionSeam />

      {/* ===================== TRACKS SECTION ===================== */}
      <section
        id="tracks"
        className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 sm:px-6"
      >
        {/* Background & Flanks */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-[#8a8a8a]">
          <img
            src={tracksBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0c0c0e]/30" />
          <img
            src={tracksLeft}
            alt=""
            className="pointer-events-none absolute bottom-0 left-0 h-[min(100%,calc(40vw/0.46))] w-auto max-w-none select-none object-cover object-left sm:h-[min(100%,calc(38vw/0.46))] lg:h-full lg:max-w-[46vw]"
          />
          <img
            src={tracksRight}
            alt=""
            className="pointer-events-none absolute bottom-0 right-0 h-[min(100%,calc(40vw/0.5))] w-auto max-w-none select-none object-cover object-right sm:h-[min(100%,calc(38vw/0.5))] lg:h-full lg:max-w-[46vw]"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl text-left">
          <Reveal>
            <h2
              className="pixel-heading mb-10 text-2xl uppercase text-[#f5f5f0] sm:text-4xl md:text-5xl"
              style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.6)" }}
            >
              TRACKS
            </h2>
          </Reveal>

          {/* Hanging Minecraft Oak Signs */}
          <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
            {TRACKS.map((t, idx) => (
              <Reveal key={t.title} delay={idx * 0.1}>
                <div className="relative pt-3">
                  {/* Oak Log Header Beam */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-3 -right-3 top-0 h-3"
                    style={{
                      backgroundImage: "url('/oak_log.png')",
                      backgroundSize: "16px 16px",
                      imageRendering: "pixelated",
                      boxShadow:
                        "inset 0 2px 0 rgba(255,255,255,0.16), inset 0 -2px 0 rgba(0,0,0,0.4)",
                    }}
                  />

                  {/* Dual Iron Chains */}
                  <div className="mx-auto flex w-1/2 justify-between">
                    <div
                      aria-hidden="true"
                      className="h-5 w-1.5"
                      style={{
                        backgroundColor: "#6e6e6e",
                        borderLeft: "2px solid #8f8f8f",
                        borderRight: "2px solid #2e2e2e",
                        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.45)",
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="h-5 w-1.5"
                      style={{
                        backgroundColor: "#6e6e6e",
                        borderLeft: "2px solid #8f8f8f",
                        borderRight: "2px solid #2e2e2e",
                        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.45)",
                      }}
                    />
                  </div>

                  {/* Signboard */}
                  <div
                    className="flex w-full flex-1 flex-col gap-2 p-4"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(233,207,157,0.65), rgba(233,207,157,0.65)), url('/oak_sign.png')",
                      backgroundSize: "auto, 48px 48px",
                      imageRendering: "pixelated",
                      border: "3px solid #4b3418",
                      boxShadow:
                        "inset 0 3px 0 rgba(255,255,255,0.18), inset 0 -3px 0 rgba(0,0,0,0.28), 0 10px 24px rgba(0,0,0,0.45)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={t.oreIcon}
                        alt=""
                        className="h-7 w-7 shrink-0"
                        style={{ imageRendering: "pixelated" }}
                      />
                      <h3
                        className="pixel-heading text-sm uppercase sm:text-base"
                        style={{
                          color: "#241608",
                          textShadow: "1px 1px 0 rgba(255,255,255,0.3)",
                        }}
                      >
                        {t.title}
                      </h3>
                    </div>

                    <div
                      aria-hidden="true"
                      className="h-[2px] w-full"
                      style={{ backgroundColor: t.barColor, opacity: 0.8 }}
                    />

                    <p className="font-terminal text-2xl leading-relaxed text-[#241608]">
                      {t.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionSeam />

      {/* ===================== TIMELINE SECTION ===================== */}
      <section
        id="timeline"
        className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 sm:px-6"
      >
        {/* Background & Flanks */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-[#3a3a3e]">
          <img
            src={timelineBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0c0c0e]/45" />
          <img
            src={timelineLeft}
            alt=""
            className="pointer-events-none absolute bottom-0 left-0 h-[min(100%,calc(40vw/0.64))] w-auto max-w-none select-none object-cover object-left sm:h-[min(100%,calc(38vw/0.64))] lg:h-full lg:max-w-[46vw]"
          />
          <img
            src={timelineRight}
            alt=""
            className="pointer-events-none absolute bottom-0 right-0 h-[min(100%,calc(40vw/0.82))] w-auto max-w-none select-none object-cover object-right sm:h-[min(100%,calc(38vw/0.82))] lg:h-full lg:max-w-[46vw]"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          <Reveal>
            <h2
              className="pixel-heading mb-14 text-2xl uppercase text-[#f5f5f0] sm:text-4xl md:text-5xl"
              style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.6)" }}
            >
              TIMELINE
            </h2>
          </Reveal>

          {/* Rail Track with Milestone Cards */}
          <div className="relative flex flex-col gap-14 py-6">
            {/* Center vertical chain */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 top-0 left-6 md:left-1/2 md:-translate-x-1/2"
              style={{
                width: 12,
                backgroundImage: "url('/chain_strip.png')",
                backgroundSize: "12px 32px",
                backgroundRepeat: "repeat-y",
                imageRendering: "pixelated",
                filter:
                  "drop-shadow(0 0 2px rgba(233,240,255,0.85)) drop-shadow(0 0 6px rgba(198,213,255,0.4))",
              }}
            />

            {TIMELINE.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={item.date}
                  className="relative grid grid-cols-1 md:grid-cols-2 md:gap-10"
                >
                  {/* Horizontal Rail Track backdrop across the row */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-1/2 hidden md:block"
                    style={{
                      height: 47,
                      marginTop: -28,
                      backgroundImage: "url('/rail_strip.png')",
                      backgroundSize: "32px 47px",
                      backgroundRepeat: "repeat-x",
                      imageRendering: "pixelated",
                      maskImage:
                        "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                    }}
                  />

                  {/* Milestone Card */}
                  <Reveal
                    delay={i * 0.1}
                    className={`relative ml-14 flex flex-col gap-1.5 md:ml-0 ${
                      isEven ? "" : "md:col-start-2"
                    }`}
                  >
                    <div
                      className="relative flex flex-col gap-1.5 px-6 py-5 text-left"
                      style={{
                        backgroundColor: "#39418a",
                        backgroundImage:
                          "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 2px, rgba(0,0,0,0.05) 2px 4px), repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0 2px, rgba(255,255,255,0.04) 2px 4px)",
                        border: "3px solid #212752",
                        boxShadow:
                          "inset 0 3px 0 rgba(255,255,255,0.12), inset 0 -6px 10px rgba(0,0,0,0.28), 0 12px 24px rgba(0,0,0,0.45)",
                      }}
                    >
                      {/* Top chain hanging strip */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute"
                        style={{
                          top: -15,
                          left: -13,
                          right: -13,
                          height: 12,
                          backgroundImage: "url('/chain_strip_rotated.png')",
                          backgroundSize: "32px 12px",
                          backgroundRepeat: "repeat-x",
                          imageRendering: "pixelated",
                          filter:
                            "drop-shadow(0 0 2px rgba(233,240,255,0.85)) drop-shadow(0 0 6px rgba(198,213,255,0.4))",
                        }}
                      />

                      {/* Inner border highlight */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute"
                        style={{
                          inset: 5,
                          border: "3px solid rgba(206, 214, 255, 0.24)",
                        }}
                      />

                      <span
                        className="pixel-heading text-xs uppercase tracking-[0.2em] text-white/70 md:text-sm"
                        style={{ textShadow: "1px 1px 0 #000" }}
                      >
                        {item.date}
                      </span>
                      <h3
                        className="pixel-heading text-sm uppercase text-white md:text-base"
                        style={{ textShadow: "1px 1px 0 #000" }}
                      >
                        {item.title}
                      </h3>
                      <p className="font-terminal text-2xl text-white/85">
                        {item.desc}
                      </p>

                      {/* Minecart connected alongside rail */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute hidden md:block"
                        style={{
                          ...(isEven
                            ? { left: "100%", marginLeft: 32 }
                            : { right: "100%", marginRight: 32 }),
                          bottom: "calc(50% + 2px)",
                          width: 76,
                          height: 45,
                        }}
                      >
                        <div
                          className="absolute"
                          style={{
                            ...(isEven ? { right: "100%" } : { left: "100%" }),
                            bottom: 11,
                            width: 32,
                            height: 4,
                            backgroundColor: "#6e6e6e",
                            borderTop: "1px solid #8f8f8f",
                            borderBottom: "1px solid #2e2e2e",
                          }}
                        />
                        <img
                          src="/minecart.png"
                          alt=""
                          width={76}
                          height={45}
                          className="block drop-shadow-md"
                          style={isEven ? undefined : { transform: "scaleX(-1)" }}
                        />
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionSeam />

      {/* ===================== RULES SECTION ===================== */}
      <section id="rules" className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 sm:px-6">
        {/* Background & Flanks */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-[#3c0909]">
          <img
            src={prevBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#3a0606]/40" />
          <img
            src={prevLeft}
            alt=""
            className="pointer-events-none absolute bottom-0 left-0 h-[min(100%,calc(40vw/0.5))] w-auto max-w-none select-none object-cover object-left sm:h-[min(100%,calc(38vw/0.5))] lg:h-full lg:max-w-[46vw]"
          />
          <img
            src={prevRight}
            alt=""
            className="pointer-events-none absolute bottom-0 right-0 h-[min(100%,calc(40vw/0.5))] w-auto max-w-none select-none object-cover object-right sm:h-[min(100%,calc(38vw/0.5))] lg:h-full lg:max-w-[46vw]"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <Reveal>
            <p className="mb-2 text-center font-terminal text-xl tracking-wider text-red-200/80">
              ▸ The Laws of the Arena
            </p>
            <h2 className="pixel-heading mb-10 text-center text-2xl uppercase text-[#ff5555] sm:text-4xl" style={{ textShadow: "0 0 10px rgba(255, 85, 85, 0.5), 2px 2px 0px #3a0000" }}>
              RULES OF ENGAGEMENT
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="p-6 sm:p-8 border-[3px] border-[#3a2615]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(26, 18, 6, 0.88), rgba(26, 18, 6, 0.88)), url('/dirt.png')",
                backgroundSize: "auto, 32px 32px",
                backgroundRepeat: "repeat",
                imageRendering: "pixelated",
                boxShadow:
                  "inset 0 0 0 2px rgba(255,255,255,0.1), inset 0 0 0 4px #120b03, 0 10px 24px rgba(0,0,0,0.5)",
              }}
            >
              <ul className="space-y-4">
                {RULES.map((rule, i) => (
                  <li
                    key={rule}
                    className="flex items-start gap-4 font-terminal text-2xl text-foreground/90"
                  >
                    <span className="pixel-heading shrink-0 text-xs text-[#ff5555] pt-1">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span className="text-[#f5f5f0]">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionSeam />

      {/* ===================== PRIZES SECTION ===================== */}
      <PrizesSection />

      <SectionSeam />

      {/* ===================== SPONSORS SECTION ===================== */}
      <SponsorsSection />

      <SectionSeam />

      {/* ===================== FAQ SECTION ===================== */}
      <section
        id="faq"
        className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 sm:px-6"
      >
        {/* Background & Flanks */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-[#3a3a3e]">
          <img
            src={faqBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0c0c0e]/45" />
          <img
            src={faqLeft}
            alt=""
            className="pointer-events-none absolute bottom-0 left-0 h-[min(100%,calc(40vw/0.64))] w-auto max-w-none select-none object-cover object-left sm:h-[min(100%,calc(38vw/0.64))] lg:h-full lg:max-w-[46vw]"
          />
          <img
            src={faqRight}
            alt=""
            className="pointer-events-none absolute bottom-0 right-0 h-[min(100%,calc(40vw/0.82))] w-auto max-w-none select-none object-cover object-right sm:h-[min(100%,calc(38vw/0.82))] lg:h-full lg:max-w-[46vw]"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <Reveal>
            <p className="mb-2 text-center font-terminal text-xl tracking-wider text-white/80">
              ▸ Everything you need to survive day one
            </p>
            <h2 className="pixel-heading mb-14 text-center text-2xl uppercase text-foreground text-glow-green sm:text-4xl">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </Reveal>

          <div className="space-y-8">
            {FAQ_GROUPS.map((group, gIdx) => (
              <div key={group.category}>
                <Reveal delay={gIdx * 0.08}>
                  <h3
                    className="pixel-heading mb-4 inline-block px-3 py-1 text-xs uppercase tracking-[0.2em] sm:text-sm"
                    style={{
                      color: "#dba213",
                      backgroundColor: "rgba(33, 22, 12, 0.75)",
                      border: "2px solid rgba(73, 54, 6, 0.8)",
                      boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.2)",
                      textShadow: "1px 1px 0 #000",
                    }}
                  >
                    {group.category}
                  </h3>
                </Reveal>
                <div className="space-y-3">
                  {group.items.map((f, i) => (
                    <Reveal key={f.q} delay={i * 0.04}>
                      <details
                        className="group overflow-hidden transition-all"
                        style={{
                          border: "2px solid #1f1f1f",
                          boxShadow:
                            "inset 2px 2px 0 rgba(255,255,255,0.15), inset -2px -2px 0 rgba(0,0,0,0.35)",
                        }}
                      >
                        <summary
                          className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                          style={{
                            backgroundImage:
                              "linear-gradient(rgba(12, 12, 14, 0.4), rgba(12, 12, 14, 0.4)), url('/stone.png')",
                            backgroundSize: "auto, 32px 32px",
                            backgroundRepeat: "repeat",
                            imageRendering: "pixelated",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
                            <span
                              className="pixel-heading text-xs uppercase text-white leading-relaxed sm:text-sm"
                              style={{ textShadow: "1px 1px 0 #000" }}
                            >
                              {f.q}
                            </span>
                          </div>
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-base leading-none text-white/80 transition-transform duration-200 group-open:rotate-180 md:text-lg"
                          >
                            ▾
                          </span>
                        </summary>
                        <div
                          className="border-t border-[#1f1f1f] px-5 py-4"
                          style={{
                            backgroundImage:
                              "linear-gradient(rgba(12, 12, 14, 0.82), rgba(12, 12, 14, 0.82)), url('/deepslate.png')",
                            backgroundSize: "auto, 32px 32px",
                            backgroundRepeat: "repeat",
                            imageRendering: "pixelated",
                            boxShadow: "inset 0 4px 10px rgba(0,0,0,0.5)",
                          }}
                        >
                          <p className="font-terminal text-2xl text-white/85 leading-relaxed">
                            {f.a}
                          </p>
                        </div>
                      </details>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionSeam />

      {/* ===================== FOOTER ===================== */}
      <footer className="relative isolate flex flex-col items-center justify-center gap-12 overflow-hidden px-6 py-12 md:py-20 bg-[#0a0a0a]">
        <div
          className="absolute inset-0 -z-10 h-full w-full opacity-80"
          style={{
            backgroundImage: "linear-gradient(rgba(18, 11, 3, 0.95), rgba(18, 11, 3, 0.95)), url('/bedrock.png')",
            backgroundSize: "auto, 64px 64px",
            backgroundRepeat: "repeat",
            imageRendering: "pixelated",
          }}
        />

        <div className="relative z-10 grid w-full max-w-6xl gap-12 md:grid-cols-3 md:items-start md:gap-8">
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <h2 className="pixel-heading text-2xl text-primary text-glow-green sm:text-3xl">
              MINEARENA 1.0
            </h2>
            <address className="flex flex-col gap-1 not-italic mt-2">
              <span className="font-terminal text-xl text-white/70">Bapuji Institute of Engineering and Technology</span>
              <span className="font-terminal text-xl text-white/70">SSM Cultural Hall, BIET Campus</span>
              <span className="font-terminal text-xl text-white/70">Davangere, Karnataka 577004</span>
              <a
                href="https://maps.app.goo.gl/"
                target="_blank"
                rel="noreferrer noopener"
                className="font-terminal text-xl -my-1.5 mt-1 inline-block py-1.5 text-white/70 underline underline-offset-4 transition-colors hover:text-white"
              >
                View on Google Maps
              </a>
            </address>
          </div>

          <div className="flex flex-col items-center gap-6">
            {/* Advancement Banner */}
            <div
              className="relative w-full max-w-[420px] select-none border-[3px] border-[#3a2615] bg-[#1a1206] p-4 flex items-center gap-4"
              style={{
                boxShadow:
                  "inset 0 0 0 2px rgba(255,255,255,0.1), inset 0 0 0 4px #120b03, 0 10px 24px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src="/bedrock.png"
                alt=""
                className="h-12 w-12 object-contain"
                style={{ imageRendering: "pixelated" }}
              />
              <div className="flex flex-col justify-center gap-1">
                <span className="pixel-heading text-[10px] text-[#ffff00] sm:text-xs" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.8)" }}>
                  Advancement Made!
                </span>
                <span className="pixel-heading text-[10px] text-white sm:text-xs" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.8)" }}>
                  The Bottom of the World
                </span>
              </div>
            </div>

            {/* Social Links */}
            <ul className="flex items-center justify-center gap-4">
              <li>
                <a
                  href="https://www.instagram.com/codecommit_biet?exln=MTh0ampqMGRqbGpxbg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:-translate-y-0.5 hover:border-[#e4405f] hover:bg-white/10 hover:text-[#e4405f]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.741 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.741 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.688.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.259 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/bietcodecommit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:-translate-y-0.5 hover:border-[#4da3e8] hover:bg-white/10 hover:text-[#4da3e8]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center gap-8 text-center md:items-end md:text-right">
            <div className="flex flex-col items-center gap-3 md:items-end">
              <h3 className="pixel-heading text-sm uppercase tracking-[0.2em] text-white">Contact Us</h3>
              <div className="flex flex-col gap-2.5 font-terminal text-xl">
                <a href="mailto:codecommit@bietdvg.edu" className="-my-1.5 inline-block py-1.5 text-white/70 hover:text-white">codecommit@bietdvg.edu</a>
                <a href="tel:+919886634901" className="group -my-1.5 inline-block py-1.5 text-white/70 hover:text-white">
                  <span className="block text-sm text-white/45 group-hover:text-white/70">Aditya Aradhya</span>
                  +91 98866 34901
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 md:items-end">
              <h3 className="pixel-heading text-sm uppercase tracking-[0.2em] text-white">Quick Links</h3>
              <nav className="flex flex-col gap-1.5 font-terminal text-xl">
                <a href="https://www.bietdvg.edu/" target="_blank" rel="noreferrer noopener" className="-my-1.5 inline-block py-1.5 text-white/70 hover:text-white">BIET Official Website</a>
                <a href="/under-construction" className="-my-1.5 inline-block py-1.5 text-white/70 hover:text-white">About Code Commit</a>
                <a href="https://www.bietdvg.edu/" target="_blank" rel="noreferrer noopener" className="-my-1.5 inline-block py-1.5 text-white/70 hover:text-white">College Home</a>
                <a href="/under-construction" className="-my-1.5 inline-block py-1.5 text-white/70 hover:text-white">FAQs</a>
              </nav>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-6xl border-t border-white/10 pt-6">
          <p className="text-center font-terminal text-lg uppercase tracking-[0.15em] text-white/70">
            © 2026 Code Commit · Bapuji Institute of Engineering and Technology
          </p>
        </div>
      </footer>
    </div>
  );
}
