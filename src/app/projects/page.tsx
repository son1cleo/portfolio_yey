"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/50">Projects</p>
        <h1 className="mt-3 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Selected work that supports client trust
        </h1>

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
                  <h4 className="text-sm font-medium text-white sm:text-base">{item.title}</h4>
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
