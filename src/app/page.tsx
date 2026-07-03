"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
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
  key: "ds" | "ae" | "fs";
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
  { key: "about", label: "About" },
  { key: "projects", label: "Projects" },
  { key: "connect", label: "Connect" },
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

const stackStrip = [
  "Python",
  "pandas",
  "scikit-learn",
  "LangChain",
  "FastAPI",
  "Next.js",
  "PostgreSQL",
  "Docker",
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null);
  const [currentViewSection, setCurrentViewSection] = useState<SectionKey | null>(null);
  const [showScrollIcon, setShowScrollIcon] = useState(true);
  const [photoFailed, setPhotoFailed] = useState(false);
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
    <div className="relative min-h-screen overflow-x-clip px-4 pb-20 pt-7 sm:px-8 sm:pt-8 md:px-10">
      <div className="hero-glow" aria-hidden />
      {!prefersReducedMotion && <motion.div className="cursor-spotlight" style={{ x: smoothCursorX, y: smoothCursorY }} aria-hidden />}

      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="nav-float"
      >
        <span className="pl-1 text-sm font-semibold tracking-tight text-white">Midhat<span className="text-emerald-400">.</span></span>
        <div className="hidden items-center gap-1 sm:flex">
          {sectionOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => selectSection(option.key)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                currentViewSection === option.key
                  ? "bg-white/12 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <a
          href="/resume/MidhatRatibCV_DS.pdf"
          download
          className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-4 py-1.5 text-xs font-semibold text-black transition hover:bg-emerald-300"
        >
          Resume <Download size={13} />
        </a>
      </motion.nav>

      <section className="relative flex min-h-screen flex-col items-center justify-center px-1 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {!prefersReducedMotion && (
            <motion.div
              className="absolute -inset-5 rounded-full border border-dashed border-emerald-400/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
              aria-hidden
            />
          )}
          <div className="arch-frame relative h-[220px] w-[180px] sm:h-[260px] sm:w-[210px]">
            {!photoFailed ? (
              <Image
                src="/profile.jpg"
                alt="Midhat Ratib Khan"
                fill
                sizes="(max-width: 640px) 180px, 210px"
                className="arch-photo"
                priority
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              <div className="arch-fallback">MRK</div>
            )}
          </div>
          <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-[11px] font-medium text-zinc-200 backdrop-blur-md">
            <span className="status-dot" /> Open to work
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="mt-10 text-center text-4xl font-bold tracking-tight text-white sm:text-6xl"
        >
          Midhat Ratib Khan
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="mt-4 text-center text-sm font-medium uppercase tracking-[0.2em] text-emerald-300/90 sm:text-base"
        >
          Data Scientist <span className="text-zinc-600">{"//"}</span> AI Engineer <span className="text-zinc-600">{"//"}</span> Full Stack Dev
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
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
            <ChevronDown size={32} className="text-white/50 transition hover:text-white" />
          </motion.button>
        )}
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto -mt-6 mb-16 flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3"
      >
        {stackStrip.map((item) => (
          <span key={item} className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
            {item}
          </span>
        ))}
      </motion.div>

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
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Data science-led, engineering-backed</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              Computer Science graduate primarily focused on data science and AI engineering, backed by full-stack delivery experience. I present the portfolio in role-specific tracks so clients can quickly match needs to the right CV.
            </p>

            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              {roleProfiles.map((role, index) => (
                <article
                  key={role.key}
                  className={`rounded-2xl border p-5 ${
                    index === 0 ? "border-emerald-400/40 bg-emerald-400/[0.07]" : "border-white/15 bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">{role.shortTitle}</p>
                      <h3 className="mt-1 text-lg font-semibold text-white">{role.title}</h3>
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wide ${
                        index === 0 ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300" : "border-white/20 bg-black/30 text-zinc-200"
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
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-emerald-300"
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
                    className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/50"
                    placeholder="Name"
                  />
                </label>
                <label className="grid gap-1 text-xs tracking-wide text-zinc-300 uppercase">
                  Subject
                  <input
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/50"
                    placeholder="Subject"
                  />
                </label>
                <label className="grid gap-1 text-xs tracking-wide text-zinc-300 uppercase">
                  Message
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/50"
                    placeholder="I visited your portfolio and would like to connect."
                  />
                </label>

                <div className="mt-2 flex flex-wrap gap-3">
                  <a
                    href={mailtoLink}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-emerald-300"
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
