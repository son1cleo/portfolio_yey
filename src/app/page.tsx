"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import {
  SiPython,
  SiC,
  SiCplusplus,
  SiDart,
  SiGo,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFlask,
  SiFlutter,
  SiTailwindcss,
  SiFramer,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiLangchain,
  SiLanggraph,
  SiTensorflow,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import {
  getLatestCompletedForPortfolio,
  getPinnedSkillsForPortfolio,
  getSummaryForPortfolio,
  type TrackerSkill,
  type TrackerSummary,
} from "../data/tracker-store";
import { Preloader } from "../components/Preloader";
import { GhostHeading } from "../components/GhostHeading";

const HeroScene = dynamic(() => import("../components/HeroScene"), { ssr: false });

function subscribeToDesktopQuery(callback: () => void) {
  const mql = window.matchMedia("(min-width: 768px)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function getDesktopServerSnapshot() {
  return false;
}

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
  key: "ds" | "ae" | "fs";
  title: string;
  shortTitle: string;
  summary: string;
  highlights: string[];
  cvHref: string;
};

const workItems: ProjectItem[] = [
  {
    title: "DataBrief",
    summary:
      "Production SaaS that turns raw CSV/Excel datasets into narrative analytical reports (PDF, DOCX, PPTX) with a 6-type statistical analysis engine, question-aware column selection, and LLM-generated narration. Async infrastructure with multi-tenant row-level security and fallback template narration for LLM outages.",
    tag: "Project",
    stack: ["FastAPI", "Celery", "Redis", "PostgreSQL", "LLM Narration", "Docker"],
    liveUrl: "https://databrief-six.vercel.app/",
  },
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

const HERO_INTRO_TEXT = "Midhat Ratib Khan";
const heroRoleSequence = ["Data Scientist", "AI Engineer", "Full Stack Dev"] as const;

function SidebarLogo({ size, failed, onError }: { size: number; failed: boolean; onError: () => void }) {
  if (failed) {
    return (
      <span
        className="flex items-center justify-center rounded-full border border-white/15 bg-black/40 font-bold text-white"
        style={{ width: size, height: size, fontSize: size * 0.36 }}
      >
        M
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/profile.jpg"
      alt="Midhat Ratib Khan"
      onError={onError}
      className="rounded-full border border-white/15 object-cover"
      style={{ width: size, height: size }}
    />
  );
}

const sectionOptions: Array<{ key: SectionKey; label: string }> = [
  { key: "about", label: "About" },
  { key: "projects", label: "Work" },
  { key: "connect", label: "Contact" },
];

const roleProfiles: RoleProfile[] = [
  {
    key: "ds",
    title: "Data Scientist",
    shortTitle: "DS",
    summary:
      "Turn messy, raw datasets into statistically-grounded insight and production analytics systems — from EDA and hypothesis testing to LLM-powered reporting pipelines.",
    highlights: ["Statistical analysis & EDA", "Production data pipelines", "LLM-narrated reporting"],
    cvHref: "/resume/MidhatRatibCV_DS.pdf",
  },
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
];

const techStack = [
  { name: "Python", Icon: SiPython },
  { name: "C", Icon: SiC },
  { name: "C++", Icon: SiCplusplus },
  { name: "Java", Icon: FaJava },
  { name: "Dart", Icon: SiDart },
  { name: "Go", Icon: SiGo },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress },
  { name: "Django", Icon: SiDjango },
  { name: "Flask", Icon: SiFlask },
  { name: "Flutter", Icon: SiFlutter },
  { name: "TailwindCSS", Icon: SiTailwindcss },
  { name: "Framer Motion", Icon: SiFramer },
  { name: "MySQL", Icon: SiMysql },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Supabase", Icon: SiSupabase },
  { name: "LangChain", Icon: SiLangchain },
  { name: "LangGraph", Icon: SiLanggraph },
  { name: "TensorFlow", Icon: SiTensorflow },
];

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null);
  const [currentViewSection, setCurrentViewSection] = useState<SectionKey | null>(null);
  const [showScrollIcon, setShowScrollIcon] = useState(true);
  const [typedIntro, setTypedIntro] = useState("");
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [logoPhotoFailed, setLogoPhotoFailed] = useState(false);
  const heroScrollRef = useRef<HTMLElement>(null);
  const isDesktop = useSyncExternalStore(subscribeToDesktopQuery, getDesktopSnapshot, getDesktopServerSnapshot);
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
  const scrollRafRef = useRef<number | undefined>(undefined);
  const prefersReducedMotion = useReducedMotion();
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const smoothCursorX = useSpring(cursorX, { damping: 24, stiffness: 420, mass: 0.24 });
  const smoothCursorY = useSpring(cursorY, { damping: 24, stiffness: 420, mass: 0.24 });
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroScrollRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(heroScrollProgress, "change", (value) => {
    const nextIndex = Math.min(heroRoleSequence.length - 1, Math.floor(value * heroRoleSequence.length));
    setActiveRoleIndex((current) => (current === nextIndex ? current : nextIndex));
  });

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
    if (!introDone) return;

    if (prefersReducedMotion) {
      const immediate = window.setTimeout(() => setTypedIntro(HERO_INTRO_TEXT), 0);
      return () => window.clearTimeout(immediate);
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedIntro(HERO_INTRO_TEXT.slice(0, index));
      if (index >= HERO_INTRO_TEXT.length) {
        window.clearInterval(timer);
      }
    }, 45);

    return () => window.clearInterval(timer);
  }, [introDone, prefersReducedMotion]);

  useEffect(() => {
    const aboutElement = document.getElementById("section-about");
    const projectsElement = document.getElementById("section-projects");
    const connectElement = document.getElementById("section-connect");

    const updateFromScroll = () => {
      scrollRafRef.current = undefined;

      const scrollY = window.scrollY;
      setShowScrollIcon(scrollY <= 50);

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
      if (scrollRafRef.current) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

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

  return (
    <div className="relative min-h-screen overflow-x-clip px-4 pb-20 pt-7 sm:px-8 sm:pt-8 md:px-10 lg:pl-28">
      {!introDone && <Preloader onDone={() => setIntroDone(true)} />}

      {!prefersReducedMotion && <motion.div className="cursor-spotlight" style={{ x: smoothCursorX, y: smoothCursorY }} aria-hidden />}

      {/* Fixed left sidebar (desktop) */}
      <aside className="sidebar">
        <SidebarLogo size={34} failed={logoPhotoFailed} onError={() => setLogoPhotoFailed(true)} />

        <nav className="sidebar-links">
          {sectionOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => selectSection(option.key)}
              className={`sidebar-link ${currentViewSection === option.key ? "is-active" : ""}`}
            >
              {option.label}
            </button>
          ))}
          <a href="/resume/MidhatRatibCV_DS.pdf" download className="sidebar-link">
            Resume
          </a>
        </nav>

        <div className="sidebar-social">
          <div className="sidebar-rule" aria-hidden />
          <a href="https://github.com/son1cleo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href="https://linkedin.com/in/midhat-ratib-khan-9969012bb" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href={mailtoLink} aria-label="Email">
            <Mail size={16} />
          </a>
        </div>
      </aside>

      {/* Compact mobile nav */}
      <div className="fixed left-4 top-4 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-md lg:hidden">
        <SidebarLogo size={26} failed={logoPhotoFailed} onError={() => setLogoPhotoFailed(true)} />
        <div className="h-4 w-px bg-white/15" />
        {sectionOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => selectSection(option.key)}
            className={`text-[11px] font-medium uppercase tracking-wide transition ${
              currentViewSection === option.key ? "text-teal-300" : "text-zinc-400"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="nav-float">
        <button
          type="button"
          onClick={() => selectSection("connect")}
          className="rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white/10"
        >
          Contact
        </button>
      </div>

      <section ref={heroScrollRef} className="relative" style={{ height: "240vh" }}>
        <div className="sticky top-0 flex min-h-screen flex-col items-center justify-center overflow-hidden px-1 pt-20">
          {isDesktop && !prefersReducedMotion && (
            <div className="hero-scene-wrap">
              <HeroScene interactive />
            </div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 min-h-[1em] px-4 text-center text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
            style={{ textShadow: "0 0 34px rgba(45, 212, 191, 0.4), 0 2px 12px rgba(0, 0, 0, 0.75)" }}
          >
            {typedIntro}
            {typedIntro.length < HERO_INTRO_TEXT.length && <span className="animate-pulse text-teal-300">|</span>}
          </motion.h1>

          <div className="relative z-10 mt-6 flex h-14 items-center justify-center sm:h-16">
            <AnimatePresence mode="wait">
              <motion.p
                key={heroRoleSequence[activeRoleIndex]}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-2xl font-semibold uppercase tracking-[0.2em] text-teal-300 sm:text-3xl"
              >
                {heroRoleSequence[activeRoleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="relative z-10 mt-3 flex items-center justify-center gap-1.5">
            {heroRoleSequence.map((role, index) => (
              <span
                key={role}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeRoleIndex ? "w-6 bg-teal-300" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              type="button"
              onClick={() => selectSection("projects")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-zinc-200"
            >
              View Projects <ArrowUpRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => selectSection("connect")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Let&apos;s Talk
            </button>
          </motion.div>

          {showScrollIcon && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="absolute bottom-16 z-10 animate-bounce cursor-pointer"
              type="button"
              aria-label="Scroll to About section"
              onClick={() => {
                const aboutElement = document.getElementById("section-about");
                aboutElement?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.96 }}
            >
              <ChevronDown size={32} className="text-white/50 transition hover:text-white" />
            </motion.button>
          )}
        </div>
      </section>

      <div className="marquee mx-auto -mt-6 mb-16 w-full max-w-4xl">
        <div className="marquee-track">
          {[...techStack, ...techStack].map(({ name, Icon }, index) => (
            <span key={`${name}-${index}`} title={name} className="flex items-center justify-center text-zinc-500 transition hover:text-teal-300">
              <Icon size={26} />
            </span>
          ))}
        </div>
      </div>

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
            <GhostHeading
              text="About"
              as="h2"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              Computer Science graduate primarily focused on data science and AI engineering, backed by full-stack delivery experience. I present the portfolio in role-specific tracks so clients can quickly match needs to the right CV.
            </p>

            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              {roleProfiles.map((role, index) => (
                <article
                  key={role.key}
                  className={`rounded-2xl border p-5 ${
                    index === 0 ? "border-teal-400/40 bg-teal-400/[0.07]" : "border-white/15 bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">{role.shortTitle}</p>
                      <h3 className="mt-1 text-lg font-semibold text-white">{role.title}</h3>
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wide ${
                        index === 0 ? "border-teal-400/40 bg-teal-400/15 text-teal-300" : "border-white/20 bg-black/30 text-zinc-200"
                      }`}
                    >
                      {index === 0 ? "Focus" : "CV"}
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
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:bg-zinc-200"
                  >
                    <Download size={15} /> Download {role.shortTitle} CV
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <h3 className="text-sm font-medium tracking-wide text-white uppercase">Tech Stack</h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  {techStack.map(({ name, Icon }) => (
                    <span
                      key={name}
                      title={name}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/30 text-zinc-300 transition hover:border-teal-400/40 hover:text-teal-300"
                    >
                      <Icon size={17} />
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
                <p className="mt-2 rounded-lg border border-amber-300/30 bg-amber-300/12 px-3 py-2 text-xs text-amber-100">
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
                href="/resume/MidhatRatibCV_DS.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-teal-300"
              >
                <Download size={16} /> Download DS CV
              </a>
              <a
                href="/resume/MidhatRatibCV_AE.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <Download size={16} /> Download AE CV
              </a>
              <a
                href="/resume/MidhatRatibCV_FS.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <Download size={16} /> Download FS CV
              </a>
              <a
                href="https://github.com/son1cleo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/10"
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
            <GhostHeading
              text="Work"
              as="h2"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
            <div className="mt-7 space-y-3">
              {workItems.map((item, index) => (
                <div key={item.title} className="flex gap-4 rounded-xl border border-white/10 bg-black/20 p-4 sm:gap-6 sm:p-5">
                  <span
                    className="mt-0.5 shrink-0 text-sm font-semibold text-teal-400"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="text-sm font-medium text-white sm:text-base">{item.title}</h4>
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
                </div>
              ))}
            </div>
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
            <GhostHeading
              text="Contact"
              as="h2"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
            <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_1fr]">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Let&apos;s build something that gets hired</h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-300">
                  If you need data science work, an AI implementation, or a full-stack product, send me the brief and I&apos;ll reply with the best-fit CV and next steps.
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
                    className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-400/50"
                    placeholder="Name"
                  />
                </label>
                <label className="grid gap-1 text-xs tracking-wide text-zinc-300 uppercase">
                  Subject
                  <input
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-400/50"
                    placeholder="Subject"
                  />
                </label>
                <label className="grid gap-1 text-xs tracking-wide text-zinc-300 uppercase">
                  Message
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-400/50"
                    placeholder="I visited your portfolio and would like to connect."
                  />
                </label>

                <div className="mt-2 flex flex-wrap gap-3">
                  <a
                    href={mailtoLink}
                    className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-teal-300"
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
