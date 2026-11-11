import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About | Midhat Ratib Khan" };
const stack = [
  {
    label: "Data and analysis",
    tools:
      "pandas, NumPy, SciPy, scikit-learn, statistical analysis, EDA, matplotlib, seaborn, Jupyter",
  },
  {
    label: "Languages",
    tools:
      "Python, JavaScript, TypeScript, SQL (PostgreSQL, MySQL), Go, C, C++, Java, Dart, HTML/CSS",
  },
  {
    label: "Frontend",
    tools: "Next.js, React, Flutter, TailwindCSS, Framer Motion",
  },
  {
    label: "Databases & Deployment",
    tools:
      "MySQL, PostgreSQL, MongoDB, Supabase, Git/GitHub, Railway, Vercel, Linux (Ubuntu)",
  },
  {
    label: "AI & Evaluation",
    tools: "LangChain, LangGraph, TensorFlow, GSM8K, spaCy",
  },
  { label: "Backend", tools: "FastAPI, Celery, Redis" },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="page-shell max-w-4xl">
      <div className="about-intro">
        <div>
          <h1 className="text-4xl sm:text-5xl">About me</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
            I&apos;m Midhat, a CS graduate from NSU, Bangladesh. I build
            products around data and AI, from analysis and LLM evaluation to the
            software around them. I built Provetale (originally DataBrief) and
            have since stopped work on it.
          </p>
        </div>
        <Image
          src="/profile2-hero.webp"
          alt="Midhat Ratib Khan"
          width={800}
          height={1000}
          sizes="(max-width: 639px) 70vw, 240px"
          className="about-portrait"
        />
      </div>
      <section
        className="mt-10 border-t border-white/15 pt-7"
        aria-labelledby="stack-heading"
      >
        <h2 id="stack-heading" className="text-xl font-semibold">
          Tools I work with
        </h2>
        <dl className="mt-5 space-y-5">
          {stack.map((group) => (
            <div
              key={group.label}
              className="sm:grid sm:grid-cols-[190px_1fr] sm:gap-6"
            >
              <dt className="text-sm font-medium text-white">{group.label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-zinc-300 sm:mt-0">
                {group.tools}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
