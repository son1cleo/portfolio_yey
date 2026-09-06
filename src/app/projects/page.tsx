"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyCard, type CaseStudy } from "../../components/CaseStudyCard";

const caseStudies: CaseStudy[] = [
  {
    id: "databrief",
    windowLabel: "databrief — landing",
    screenshotSrc: "/projects/databrief.png",
    screenshotAlt: "DataBrief landing page showing an analysis engine finding an unexpected revenue drop",
    headline: "Your data knows something you don't.",
    headlineAccent: "you don't.",
    description:
      "Upload a spreadsheet, PDF or document — DataBrief finds what's statistically surprising in it and writes the finding up as a report.",
    meta: [
      { label: "Stack", value: "FastAPI · Celery · Redis · multi-tenant row-level security" },
      { label: "Status", value: "Production build — not yet publicly hosted, code on GitHub" },
    ],
    href: "https://github.com/son1cleo/databrief",
    linkLabel: "github.com/son1cleo/databrief",
    theme: {
      background: "#0b1220",
      panel: "#111a2e",
      foreground: "#ffffff",
      muted: "#8ea0c0",
      accent: "#4d8dff",
      border: "rgba(255,255,255,0.08)",
      headlineFont: "font-sans",
    },
  },
  {
    id: "msn",
    eyebrow: "case file — dhaka, bangladesh",
    indexLabel: "01 / 04",
    windowLabel: "msn-bd.org",
    screenshotSrc: "/projects/msn.png",
    screenshotAlt: "Media Support Network homepage with the headline 'For a free, safe and independent media'",
    headline: "Media Support Network",
    description:
      "A production website for Bangladesh's press-freedom advocacy body — built to read as credible to journalists, funders and government stakeholders in the same breath.",
    meta: [{ label: "Role", value: "Full-stack build — Next.js / TypeScript" }],
    href: "https://www.msn-bd.org",
    linkLabel: "msn-bd.org",
    theme: {
      background: "#0c1c2e",
      panel: "#0f2438",
      foreground: "#f5f2e9",
      muted: "#93a5bd",
      accent: "#f2565b",
      border: "rgba(255,255,255,0.08)",
      headlineFont: "font-serif",
    },
  },
  {
    id: "neel-foring",
    eyebrow: "Neel Foring Foundation",
    indexLabel: "01 / 04",
    windowLabel: "neel-foring.vercel.app",
    screenshotSrc: "/projects/neel-foring.png",
    screenshotAlt: "Neel Foring Foundation homepage with the headline 'Youth-led energy meets systemic change'",
    headline: "Youth-led energy, systemic change.",
    headlineAccent: "systemic change.",
    description:
      "A website for a Dhaka-based foundation equipping young people to lead on climate, technology and human rights.",
    meta: [{ label: "Role", value: "Full-stack build — Next.js" }],
    href: "https://neel-foring.vercel.app",
    linkLabel: "neel-foring.vercel.app",
    theme: {
      background: "#16241c",
      panel: "#1c2f24",
      foreground: "#f4ede1",
      muted: "#9db2a3",
      accent: "#e2823c",
      border: "rgba(255,255,255,0.08)",
      headlineFont: "font-sans",
    },
  },
  {
    id: "voice-of-time",
    indexLabel: "01 / 04",
    windowLabel: "newsvault-zeta.vercel.app",
    screenshotSrc: "/projects/voice-of-time.png",
    screenshotAlt: "Voice of Time bilingual news archive homepage",
    headline: "Voice of Time",
    subheadline: "সময়কণ্ঠ — a bilingual news archive",
    description:
      "Built around one editorial rule: a story published today but dated years ago never shows up as \"latest\" — it files into the historical record.",
    meta: [{ label: "Role", value: "Full-stack build — client turnaround: 2 days" }],
    href: "https://newsvault-zeta.vercel.app",
    linkLabel: "newsvault-zeta.vercel.app · bilingual archive, EN / BN",
    theme: {
      background: "#efe8d8",
      panel: "#e4dcc8",
      foreground: "#1f2a3d",
      muted: "#6b6455",
      accent: "#7a5216",
      border: "rgba(0,0,0,0.1)",
      headlineFont: "font-serif",
    },
  },
];

type ProjectItem = {
  title: string;
  summary: string;
  tag: "Project" | "Contribution";
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
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
    summary: "After evaluating 6,000+ questions and applying targeted refinements, improved overall chatbot accuracy.",
    tag: "Contribution",
    stack: ["spaCy", "Evaluation", "Data Analysis"],
  },
];

export default function ProjectsPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-20 pt-32 sm:px-8 sm:pt-36">
      <motion.section
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="panel"
      >
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/50">Case Studies</p>
      </motion.section>

      <div className="flex flex-col gap-6">
        <CaseStudyCard study={caseStudies[0]} index={0} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {caseStudies.slice(1).map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index + 1} />
          ))}
        </div>
      </div>

      <motion.section
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="panel"
      >
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/50">More work</p>

        <div className="mt-7 space-y-3">
          {workItems.map((item, index) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl border border-white/10 bg-black/20 p-4 sm:gap-6 sm:p-5"
            >
              <span className="mt-0.5 shrink-0 font-mono text-sm font-semibold text-white/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-sm font-medium text-white sm:text-base">{item.title}</h2>
                  <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-200">
                    {item.tag}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.summary}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/20 bg-black/30 px-2 py-0.5 text-[10px] text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white"
                    >
                      Live <ArrowUpRight size={13} />
                    </a>
                  )}
                  {item.repoUrl && (
                    <a
                      href={item.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white"
                    >
                      Repo <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
