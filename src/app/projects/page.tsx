import { DataBriefCaseStudy } from "../../components/DataBriefCaseStudy";
import { selectedWork } from "../../data/selected-work";
import { evaluationWork } from "../../data/evaluation-work";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyCard, type CaseStudy } from "../../components/CaseStudyCard";

const caseStudies: CaseStudy[] = [
  {
    id: "msn",
    eyebrow: "case file: dhaka, bangladesh",
    windowLabel: "msn-bd.org",
    screenshotSrc: "/projects/msn.png",
    screenshotAlt: "Media Support Network homepage with the headline 'For a free, safe and independent media'",
    headline: "Media Support Network",
    description:
      "A production website for Bangladesh's press-freedom advocacy body, built to read as credible to journalists, funders and government stakeholders in the same breath.",
    meta: [{ label: "Role", value: "Full-stack build: Next.js / TypeScript" }],
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
    windowLabel: "neel-foring.vercel.app",
    screenshotSrc: "/projects/neel-foring.png",
    screenshotAlt: "Neel Foring Foundation homepage with the headline 'Youth-led energy meets systemic change'",
    headline: "Youth-led energy, systemic change.",
    headlineAccent: "systemic change.",
    description:
      "A website for a Dhaka-based foundation equipping young people to lead on climate, technology and human rights.",
    meta: [{ label: "Role", value: "Full-stack build: Next.js" }],
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
    windowLabel: "newsvault-zeta.vercel.app",
    screenshotSrc: "/projects/voice-of-time.png",
    screenshotAlt: "Voice of Time bilingual news archive homepage",
    headline: "Voice of Time",
    subheadline: "সময়কণ্ঠ: a bilingual news archive",
    description:
      "Built around one editorial rule: a story published today but dated years ago never shows up as \"latest\". It files into the historical record.",
    meta: [{ label: "Role", value: "Full-stack build; client turnaround: 2 days" }],
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
];

export default function ProjectsPage() {

  return (
    <main className="page-shell flex max-w-5xl flex-col gap-8 sm:gap-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Selected projects</h1>
        <p className="mt-3 max-w-2xl text-zinc-300">Analysis, model evaluation, and the software that makes them useful.</p>
      </header>
      <DataBriefCaseStudy />
      <section aria-label="AI evaluation work" className="grid gap-6">
        {evaluationWork.map((study) => {
          const project = selectedWork.find((item) => item.id === study.id)!;
          return (
          <article id={project.id} key={project.id} className="scroll-mt-36 rounded-xl border border-white/15 bg-white/[0.03] p-6">
            <p className="text-sm font-medium text-[var(--neon-green)]">{project.evidence}</p>
            <h2 className="mt-2 text-2xl font-semibold">{project.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{project.summary}</p>
            <dl className="mt-5 grid gap-5 text-sm sm:grid-cols-2">
              <div><dt className="font-medium">Problem</dt><dd className="mt-1 leading-relaxed text-zinc-300">{study.problem}</dd></div>
              <div><dt className="font-medium">My contribution</dt><dd className="mt-1 leading-relaxed text-zinc-300">{study.contribution}</dd></div>
              <div><dt className="font-medium">Evaluation approach</dt><dd className="mt-1 leading-relaxed text-zinc-300">{study.method}</dd></div>
              <div><dt className="font-medium">Outcome</dt><dd className="mt-1 leading-relaxed text-zinc-300">{study.outcome}</dd></div>
              <div className="sm:col-span-2"><dt className="font-medium">Tools & methods</dt><dd className="mt-1 text-zinc-300">{study.tools}</dd></div>
            </dl>
          </article>
          );
        })}
      </section>

      <section aria-labelledby="shipped-sites" className="flex flex-col gap-6">
        <div><h2 id="shipped-sites" className="text-2xl font-semibold">Shipped for clients</h2><p className="mt-2 text-sm text-zinc-300">Production delivery alongside my data science work.</p></div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index + 1} />
          ))}
        </div>
      </section>

      <section className="border-t border-white/15 pt-8">
        <h2 className="text-2xl font-semibold">More engineering work</h2>

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
                  <h3 className="text-sm font-medium text-white sm:text-base">{item.title}</h3>
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
      </section>
    </main>
  );
}
