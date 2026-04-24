"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import {
  getLatestCompletedForPortfolio,
  getPinnedSkillsForPortfolio,
  getSummaryForPortfolio,
  type TrackerSkill,
  type TrackerSummary,
} from "../data/tracker-store";

type ProjectItem = {
  title: string;
  summary: string;
  tag: "Project" | "Contribution";
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
};

type SectionKey = "about" | "projects" | "connect";

type RoleProfile = {
  key: "ae" | "fs" | "da";
  title: string;
  shortTitle: string;
  summary: string;
  highlights: string[];
  cvHref: string;
};

const workItems: ProjectItem[] = [
  {
    title: "RatibBuilds Portfolio",
    summary:
      "My personal portfolio website featuring modern motion UI, interactive sections, and project showcases.",
    tag: "Project",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://ratibbuilds.vercel.app/",
    repoUrl: "https://github.com/son1cleo/portfolio_yey",
  },
  {
    title: "SouthForge",
    summary:
      "An offline-first, browser-based IDE with local AI support, in-browser runtime execution, workspace persistence, and terminal-driven Git and GitHub flows.",
    tag: "Project",
    stack: ["React", "Vite", "Monaco", "WebContainers", "WebLLM", "IndexedDB"],
    liveUrl: "https://offlineide.vercel.app/",
    repoUrl: "https://github.com/son1cleo/offlineide",
  },
  {
    title: "SchedulEase",
    summary: "A Flutter-based web app built for streamlined scheduling and planning workflows.",
    tag: "Project",
    stack: ["Flutter", "Dart", "Web App"],
    repoUrl: "https://github.com/son1cleo/SchedulEase",
  },
  {
    title: "IEEE Web Automation",
    summary:
      "Built and deployed a Django-based web mail automation service to improve operational flow for IEEE NSU Student Chapter.",
    tag: "Project",
    stack: ["Django", "Python", "Automation", "Web Infrastructure"],
  },
  {
    title: "PorteHobe AI",
    summary:
      "After evaluation and refinement, improved mathematical reasoning accuracy by 15% through GSM8K benchmarking against Mathstral and Gemini.",
    tag: "Contribution",
    stack: ["LLM Evaluation", "GSM8K", "Reasoning", "Model Benchmarking"],
  },
  {
    title: "Physics Chatbot",
    summary:
      "After evaluating 6,000+ questions and applying targeted refinements, improved overall chatbot accuracy.",
    tag: "Contribution",
    stack: ["spaCy", "Evaluation", "Data Analysis"],
  },
];

const sectionOptions: Array<{ key: SectionKey; label: string }> = [
  { key: "about", label: "About me" },
  { key: "projects", label: "Projects and Contributions" },
  { key: "connect", label: "Let's get connected" },
];

const roleProfiles: RoleProfile[] = [
  {
    key: "ae",
    title: "AI Engineer",
    shortTitle: "AE",
    summary:
      "Build AI products, evaluation pipelines, and decision support systems that turn messy data into usable intelligence.",
    highlights: ["LLM workflows", "Model evaluation", "Automation with real outcomes"],
    cvHref: "/resume/MidhatRatibCV_AE.pdf",
  },
  {
    key: "fs",
    title: "Full Stack Dev",
    shortTitle: "FS",
    summary:
      "Design and ship polished websites and web apps from frontend motion to backend integration and deployment.",
    highlights: ["Next.js products", "Client portals", "Clean delivery under deadlines"],
    cvHref: "/resume/MidhatRatibCV_FS.pdf",
  },
  {
    key: "da",
    title: "Data Analyst",
    shortTitle: "DA",
    summary:
      "Translate raw data into clear dashboards, insights, and process improvements that clients can act on fast.",
    highlights: ["Reporting", "Insight generation", "Business-facing analysis"],
    cvHref: "/resume/MidhatRatibCV_DA.pdf",
  },
];

const roleIntroLines = [
  { key: "ae", label: "AE", text: "I make AI actually work." },
  { key: "fs", label: "FS", text: "Pixel to database no handoff needed." },
  { key: "da", label: "DA", text: "I turn noise into decisions." },
] as const;

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null);
  const [menuEligible, setMenuEligible] = useState(false);
  const [hideMenuWhileScrolling, setHideMenuWhileScrolling] = useState(false);
  const [showScrollIcon, setShowScrollIcon] = useState(true);
  const [landingComplete, setLandingComplete] = useState(false);
  const [currentViewSection, setCurrentViewSection] = useState<SectionKey | null>(null);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("Portfolio inquiry");
  const [message, setMessage] = useState("");
  const [trackerSummary, setTrackerSummary] = useState<TrackerSummary>({
    total: 0,
    inProgress: 0,
    completed: 0,
    pinned: 0,
  });
  const [pinnedSkills, setPinnedSkills] = useState<TrackerSkill[]>([]);
  const [latestCompleted, setLatestCompleted] = useState<TrackerSkill | null>(null);
  const [heroLine, setHeroLine] = useState(roleIntroLines[0].text);
  const [heroLineIndex, setHeroLineIndex] = useState(0);
  const [heroIsDeleting, setHeroIsDeleting] = useState(false);
  const scrollStopTimerRef = useRef<number | undefined>(undefined);
  const scrollRafRef = useRef<number | undefined>(undefined);
  const heroTimerRef = useRef<number | undefined>(undefined);
  const prefersReducedMotion = useReducedMotion();
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const smoothCursorX = useSpring(cursorX, { damping: 24, stiffness: 420, mass: 0.24 });
  const smoothCursorY = useSpring(cursorY, { damping: 24, stiffness: 420, mass: 0.24 });

  useEffect(() => {
    const previousScrollRestoration =
      "scrollRestoration" in window.history ? window.history.scrollRestoration : null;

    if (previousScrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      if (previousScrollRestoration) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  useEffect(() => {
    // Landing animation completes after 3 seconds
    const timer = setTimeout(() => {
      setLandingComplete(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (heroTimerRef.current) {
      window.clearTimeout(heroTimerRef.current);
    }

    if (prefersReducedMotion) {
      return;
    }

    const currentText = roleIntroLines[heroLineIndex].text;
    const typingSpeed = heroIsDeleting ? 36 : 42;

    if (!heroIsDeleting && heroLine === currentText) {
      heroTimerRef.current = window.setTimeout(() => {
        setHeroIsDeleting(true);
      }, 1150);
      return () => {
        if (heroTimerRef.current) window.clearTimeout(heroTimerRef.current);
      };
    }

    if (heroIsDeleting && heroLine === "") {
      heroTimerRef.current = window.setTimeout(() => {
        setHeroIsDeleting(false);
        setHeroLineIndex((current) => (current + 1) % roleIntroLines.length);
      }, 220);
      return () => {
        if (heroTimerRef.current) window.clearTimeout(heroTimerRef.current);
      };
    }

    heroTimerRef.current = window.setTimeout(() => {
      setHeroLine((current) => {
        if (heroIsDeleting) {
          return current.slice(0, -1);
        }

        return currentText.slice(0, current.length + 1);
      });
    }, typingSpeed);

    return () => {
      if (heroTimerRef.current) {
        window.clearTimeout(heroTimerRef.current);
      }
    };
  }, [heroIsDeleting, heroLine, heroLineIndex, prefersReducedMotion]);

  useEffect(() => {
    if (!landingComplete) return;

    const aboutElement = document.getElementById("section-about");
    const projectsElement = document.getElementById("section-projects");
    const connectElement = document.getElementById("section-connect");

    const updateFromScroll = () => {
      scrollRafRef.current = undefined;

      const scrollY = window.scrollY;
      const nearBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
      const canShowMenu = scrollY > 40;

      setShowScrollIcon(scrollY <= 50);
      setMenuEligible(canShowMenu);
      // Hide while actively scrolling, except at very bottom.
      setHideMenuWhileScrolling(canShowMenu && !nearBottom);

      if (scrollStopTimerRef.current) {
        window.clearTimeout(scrollStopTimerRef.current);
      }

      scrollStopTimerRef.current = window.setTimeout(() => {
        setHideMenuWhileScrolling(false);
      }, 280);

      const viewportCenter = window.innerHeight / 2;
      let nextSection: SectionKey | null = null;

      if (aboutElement) {
        const rect = aboutElement.getBoundingClientRect();
        if (rect.top < viewportCenter && rect.bottom > viewportCenter) {
          nextSection = "about";
        }
      }
      if (projectsElement) {
        const rect = projectsElement.getBoundingClientRect();
        if (rect.top < viewportCenter && rect.bottom > viewportCenter) {
          nextSection = "projects";
        }
      }
      if (connectElement) {
        const rect = connectElement.getBoundingClientRect();
        if (rect.top < viewportCenter && rect.bottom > viewportCenter) {
          nextSection = "connect";
        }
      }

      setCurrentViewSection((prev) => (prev === nextSection ? prev : nextSection));
    };

    const onScroll = () => {
      if (scrollRafRef.current) return;
      scrollRafRef.current = window.requestAnimationFrame(updateFromScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollStopTimerRef.current) {
        window.clearTimeout(scrollStopTimerRef.current);
      }
      if (scrollRafRef.current) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [landingComplete]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const finePointerQuery = window.matchMedia("(pointer: fine)");
    if (!finePointerQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 80);
      cursorY.set(e.clientY - 80);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, prefersReducedMotion]);

  useEffect(() => {
    const syncTrackerData = () => {
      setTrackerSummary(getSummaryForPortfolio());
      setPinnedSkills(getPinnedSkillsForPortfolio().slice(0, 3));
      setLatestCompleted(getLatestCompletedForPortfolio());
    };

    syncTrackerData();
    window.addEventListener("storage", syncTrackerData);
    return () => window.removeEventListener("storage", syncTrackerData);
  }, []);

  const mailtoLink = useMemo(() => {
    const body = [
      message || "I visited your portfolio and would like to connect.",
      "",
      name ? `Sender: ${name}` : "",
    ].join("\n");

    return `mailto:ratibkhan907@gmail.com?subject=${encodeURIComponent(
      subject || "Portfolio inquiry"
    )}&body=${encodeURIComponent(body)}`;
  }, [message, name, subject]);

  const selectSection = (section: SectionKey) => {
    setActiveSection(section);
    setCurrentViewSection(section);
    setTimeout(() => {
      const container = document.getElementById(`section-${section}`);
      container?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleSectionKeyDown = (event: React.KeyboardEvent<HTMLElement>, section: SectionKey) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectSection(section);
    }
  };

  const sectionHoverMotion = prefersReducedMotion
    ? undefined
    : {
        y: -6,
      };

  const showOptions = landingComplete && menuEligible;
  const isMenuVisible = showOptions && !hideMenuWhileScrolling;

  return (
    <div className="relative min-h-screen overflow-x-clip px-4 pb-20 pt-7 sm:px-8 sm:pt-8 md:px-10">
      <div className="hero-glow" aria-hidden />
      {!prefersReducedMotion && <motion.div className="cursor-spotlight" style={{ x: smoothCursorX, y: smoothCursorY }} aria-hidden />}

      <section className="relative flex min-h-screen flex-col items-center justify-center px-1">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center text-2xl font-semibold tracking-[0.28em] text-white drop-shadow-2xl sm:text-4xl"
          style={{
            fontFamily: "var(--font-type-machine)",
            textShadow: "0 0 24px rgba(255, 255, 255, 0.2)",
          }}
        >
          Midhat Ratib Khan
        </motion.p>

        <div className="mt-6 min-h-[14rem] w-full max-w-3xl">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-zinc-200">
              {roleIntroLines[heroLineIndex].label}
            </span>
            <motion.p
              key={roleIntroLines[heroLineIndex].key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white drop-shadow-2xl sm:text-5xl"
              style={{ fontFamily: "var(--font-type-machine)", textShadow: "0 0 30px rgba(255, 255, 255, 0.2)" }}
            >
              {heroLine}
              <span className="animate-blink">|</span>
            </motion.p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.18em] text-zinc-300 sm:text-[11px]">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">AI Engineer</span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Full Stack Dev</span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Data Analyst</span>
        </div>

        <AnimatePresence>
          {showScrollIcon && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="absolute bottom-16 animate-bounce cursor-pointer"
              type="button"
              aria-label="Scroll to About section"
              onClick={() => {
                const aboutElement = document.getElementById("section-about");
                aboutElement?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.96 }}
            >
              <ChevronDown size={32} className="text-white/60 transition hover:text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </section>

      <div className="h-[18vh]" />

      {showOptions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isMenuVisible ? 1 : 0, y: isMenuVisible ? 0 : 12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ pointerEvents: isMenuVisible ? "auto" : "none" }}
          className="fixed bottom-5 left-1/2 z-30 w-[calc(100%-1rem)] max-w-3xl -translate-x-1/2 rounded-2xl border border-white/15 bg-black/65 p-2 backdrop-blur-md sm:bottom-8 sm:w-[calc(100%-2rem)] sm:p-3"
        >
          <div className="grid gap-2 sm:grid-cols-3">
            {sectionOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => selectSection(option.key)}
                className={`rounded-xl px-3 py-2 text-xs transition sm:py-2.5 sm:text-sm ${
                  currentViewSection === option.key
                    ? "bg-white text-black"
                    : "bg-white/5 text-white hover:bg-white/12"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        {/* About Me Section */}
        <motion.section
          id="section-about"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={sectionHoverMotion}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="floating-page cursor-pointer"
          onClick={() => !activeSection && selectSection("about")}
          role="button"
          tabIndex={0}
          aria-label="Open About section"
          onKeyDown={(event) => handleSectionKeyDown(event, "about")}
        >
          <div className="panel relative overflow-hidden">
            <p className="text-xs tracking-[0.22em] text-white/60 uppercase">About me</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Client-ready across three roles</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              Computer Science graduate focused on AI, full-stack delivery, and data work. I now present the portfolio in role-specific tracks so clients can quickly match needs to the right CV.
            </p>

            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              {roleProfiles.map((role) => (
                <article key={role.key} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">{role.shortTitle}</p>
                      <h3 className="mt-1 text-lg font-semibold text-white">{role.title}</h3>
                    </div>
                    <span className="rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[10px] uppercase tracking-wide text-zinc-200">
                      CV
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">{role.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.highlights.map((item) => (
                      <span key={item} className="rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[11px] text-zinc-200">
                        {item}
                      </span>
                    ))}
                  </div>

                  <a
                    href={role.cvHref}
                    download
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
                  >
                    <Download size={15} /> Download {role.shortTitle} CV
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <h3 className="text-sm font-medium tracking-wide text-white uppercase">Tech Stack</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Python",
                    "C",
                    "C++",
                    "Java",
                    "Dart",
                    "Go",
                    "JavaScript",
                    "TypeScript",
                    "Next.js",
                    "React",
                    "Node.js",
                    "Express",
                    "Django",
                    "Flask",
                    "Flutter",
                    "TailwindCSS",
                    "Framer Motion",
                    "MySQL",
                    "PostgreSQL",
                    "MongoDB",
                    "Supabase",
                    "LangChain",
                    "LangGraph",
                    "TensorFlow",
                  ].map((item) => (
                    <span key={item} className="rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[11px] text-zinc-200">
                      {item}
                    </span>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-medium tracking-wide text-white uppercase">Learning + credibility</h3>
                  <a
                    href="/tracker"
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/25 px-2.5 py-1 text-[11px] text-zinc-100 transition hover:bg-white/10"
                  >
                    Open Tracker <ArrowUpRight size={13} />
                  </a>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  Ongoing structured upskilling across analytics, ML, product delivery, and Python workflows.
                </p>
                <p className="mt-2 rounded-lg border border-sky-300/25 bg-sky-300/10 px-3 py-2 text-xs text-sky-100">
                  Demo version on portfolio. The full tracker product is on the way, but this site is now optimized to convert clients.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-zinc-400">Completed</p>
                    <p className="mt-0.5 text-lg font-semibold text-white">{trackerSummary.completed}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-zinc-400">In Progress</p>
                    <p className="mt-0.5 text-lg font-semibold text-white">{trackerSummary.inProgress}</p>
                  </div>
                </div>
                {latestCompleted && (
                  <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3">
                    <p className="text-[10px] uppercase tracking-wide text-zinc-400">Latest Completed</p>
                    <p className="mt-1 text-sm font-medium text-white">{latestCompleted.title}</p>
                    <p className="mt-0.5 text-[11px] text-zinc-400">{latestCompleted.category}</p>
                  </div>
                )}
              </article>
            </div>

            {pinnedSkills.length > 0 && (
              <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-5">
                <h3 className="text-sm font-medium tracking-wide text-white uppercase">Pinned Learnings</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pinnedSkills.map((skill) => (
                    <span key={skill.id} className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] text-zinc-200">
                      {skill.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/resume/MidhatRatibCV_AE.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                <Download size={16} /> Download AE CV
              </a>
              <a
                href="/resume/MidhatRatibCV_FS.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <Download size={16} /> Download FS CV
              </a>
              <a
                href="/resume/MidhatRatibCV_DA.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <Download size={16} /> Download DA CV
              </a>
              <a
                href="https://github.com/son1cleo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>
        </motion.section>

        {/* Projects and Contributions Section */}
        <motion.section
          id="section-projects"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={sectionHoverMotion}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="floating-page cursor-pointer"
          onClick={() => !activeSection && selectSection("projects")}
          role="button"
          tabIndex={0}
          aria-label="Open Projects and Contributions section"
          onKeyDown={(event) => handleSectionKeyDown(event, "projects")}
        >
          <div className="panel">
            <p className="text-xs tracking-[0.22em] text-white/60 uppercase">Projects and Contributions</p>
            <article className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-5">
              <h3 className="text-base font-semibold text-white">Selected work that supports client trust</h3>
              <div className="mt-4 space-y-4">
                {workItems.map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="text-sm font-medium text-white">{item.title}</h4>
                      <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] text-zinc-200">
                        {item.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <span key={tech} className="rounded-full border border-white/20 bg-black/30 px-2 py-0.5 text-[10px] text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {item.liveUrl && (
                        <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white">
                          Live <ArrowUpRight size={13} />
                        </a>
                      )}
                      {item.repoUrl && (
                        <a href={item.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white">
                          Repo <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </motion.section>

        {/* Let's Get Connected Section */}
        <motion.section
          id="section-connect"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={sectionHoverMotion}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="floating-page cursor-pointer"
          onClick={() => !activeSection && selectSection("connect")}
          role="button"
          tabIndex={0}
          aria-label="Open Connect section"
          onKeyDown={(event) => handleSectionKeyDown(event, "connect")}
        >
          <div className="panel">
            <p className="text-xs tracking-[0.22em] text-white/60 uppercase">Let&apos;s get connected</p>
            <div className="mt-4 grid gap-8 md:grid-cols-[1.1fr_1fr]">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Let&apos;s build something that gets hired</h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-300">
                  If you need AI implementation, a full-stack product, or data analysis support, send me the brief and I&apos;ll reply with the best-fit CV and next steps.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/son1cleo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    <Github size={16} /> GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/midhat-ratib-khan-9969012bb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    <Linkedin size={16} /> LinkedIn
                  </a>
                  <a
                    href={mailtoLink}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    <Mail size={16} /> Email
                  </a>
                </div>
              </div>

              <form className="grid gap-3" onSubmit={(event) => event.preventDefault()}>
                <label className="grid gap-1 text-xs tracking-wide text-zinc-300 uppercase">
                  Your Name
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/35"
                    placeholder="Name"
                  />
                </label>
                <label className="grid gap-1 text-xs tracking-wide text-zinc-300 uppercase">
                  Subject
                  <input
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/35"
                    placeholder="Subject"
                  />
                </label>
                <label className="grid gap-1 text-xs tracking-wide text-zinc-300 uppercase">
                  Message
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/35"
                    placeholder="I visited your portfolio and would like to connect."
                  />
                </label>

                <div className="mt-2 flex flex-wrap gap-3">
                  <a
                    href={mailtoLink}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
                  >
                    <Mail size={15} /> Start a Project
                  </a>
                </div>
              </form>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
