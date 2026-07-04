"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, Github } from "lucide-react";
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
import { FocusGrid } from "../../components/FocusGrid";

type RoleProfile = {
  key: "ds" | "ae" | "fs";
  title: string;
  shortTitle: string;
  summary: string;
  highlights: string[];
  cvHref: string;
};

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

const techCategories = [
  {
    label: "Languages",
    items: [
      { name: "Python", Icon: SiPython },
      { name: "C", Icon: SiC },
      { name: "C++", Icon: SiCplusplus },
      { name: "Java", Icon: FaJava },
      { name: "Dart", Icon: SiDart },
      { name: "Go", Icon: SiGo },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "TypeScript", Icon: SiTypescript },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "TailwindCSS", Icon: SiTailwindcss },
      { name: "Framer Motion", Icon: SiFramer },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Express", Icon: SiExpress },
      { name: "Django", Icon: SiDjango },
      { name: "Flask", Icon: SiFlask },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "MySQL", Icon: SiMysql },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Supabase", Icon: SiSupabase },
    ],
  },
  {
    label: "AI & LLM",
    items: [
      { name: "LangChain", Icon: SiLangchain },
      { name: "LangGraph", Icon: SiLanggraph },
      { name: "TensorFlow", Icon: SiTensorflow },
    ],
  },
  {
    label: "Mobile",
    items: [{ name: "Flutter", Icon: SiFlutter }],
  },
];

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-20 pt-32 sm:px-8 sm:pt-36">
      <motion.section
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="panel"
      >
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/50">About</p>
        <h1 className="mt-3 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Data science-led, engineering-backed
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
          Computer Science graduate primarily focused on data science and AI engineering, backed by full-stack
          delivery experience. I present the portfolio in role-specific tracks so clients can quickly match needs to
          the right CV.
        </p>

        <div className="mt-7">
          <FocusGrid />
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {roleProfiles.map((role, index) => (
            <article
              key={role.key}
              className={`rounded-2xl border p-5 transition hover:-translate-y-1 ${
                index === 0 ? "border-white/40 bg-white/[0.07]" : "border-white/15 bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                    {role.shortTitle}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{role.title}</h3>
                </div>
                <span
                  className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${
                    index === 0
                      ? "border-white/40 bg-white/15 text-white"
                      : "border-white/20 bg-black/30 text-zinc-200"
                  }`}
                >
                  {index === 0 ? "Focus" : "CV"}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{role.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {role.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[11px] text-zinc-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <a
                href={role.cvHref}
                download
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 font-mono text-sm font-medium text-black transition hover:-translate-y-0.5 hover:bg-zinc-200"
              >
                <Download size={15} /> Download {role.shortTitle} CV
              </a>
            </article>
          ))}
        </div>

        <div className="mt-7 rounded-2xl border border-white/15 bg-white/5 p-5">
          <h3 className="font-mono text-sm font-medium tracking-wide text-white uppercase">Tech Stack</h3>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {techCategories.map((category) => (
              <div key={category.label}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">{category.label}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {category.items.map(({ name, Icon }) => (
                    <span
                      key={name}
                      title={name}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/30 text-zinc-300 transition hover:border-white/40 hover:text-white"
                    >
                      <Icon size={17} />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="/resume/MidhatRatibCV_DS.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-mono text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-zinc-200"
          >
            <Download size={16} /> Download DS CV
          </a>
          <a
            href="/resume/MidhatRatibCV_AE.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 font-mono text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            <Download size={16} /> Download AE CV
          </a>
          <a
            href="/resume/MidhatRatibCV_FS.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 font-mono text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            <Download size={16} /> Download FS CV
          </a>
          <a
            href="https://github.com/son1cleo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 font-mono text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            <Github size={16} /> GitHub
          </a>
        </div>
      </motion.section>
    </main>
  );
}
