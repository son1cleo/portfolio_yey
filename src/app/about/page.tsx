import type { Metadata } from "next";
import { Download } from "lucide-react";

export const metadata: Metadata = { title: "About | Midhat Ratib Khan" };
const stack = [
  { label: "Analysis & evaluation", tools: "Python, statistical analysis, EDA, GSM8K, spaCy" },
  { label: "LLM systems", tools: "LangChain, LangGraph, TensorFlow" },
  { label: "Production software", tools: "FastAPI, Celery, Redis, PostgreSQL, Next.js, TypeScript" },
];

export default function AboutPage() {
  return (
    <main className="page-shell max-w-4xl">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About me</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
        I’m Midhat Ratib Khan, a Computer Science graduate focused on data science.
        I work on statistical analysis, LLM evaluation, and reporting systems, and build
        the software around them—from data pipelines to the interfaces people use.
        My work includes DataBrief, mathematical reasoning evaluation for PorteHobe AI,
        and a physics chatbot evaluated across 6,000+ questions.
      </p>
      <section className="mt-10 border-t border-white/15 pt-7" aria-labelledby="stack-heading">
        <h2 id="stack-heading" className="text-xl font-semibold">Tools I work with</h2>
        <dl className="mt-5 space-y-5">
          {stack.map((group) => (
            <div key={group.label} className="sm:grid sm:grid-cols-[190px_1fr] sm:gap-6">
              <dt className="text-sm font-medium text-white">{group.label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-zinc-300 sm:mt-0">{group.tools}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="mt-10 border-t border-white/15 pt-7" aria-labelledby="cv-heading">
        <h2 id="cv-heading" className="text-xl font-semibold">My CV</h2>
        <a href="/resume/MidhatRatibCV_DS.pdf" download className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-200">
          <Download size={16} aria-hidden="true" /> Download data science CV
        </a>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-zinc-300">
          <span>Also available:</span>
          <a href="/resume/MidhatRatibCV_AE.pdf" download className="underline underline-offset-4 hover:text-white">AI engineering CV</a>
          <a href="/resume/MidhatRatibCV_FS.pdf" download className="underline underline-offset-4 hover:text-white">Full-stack CV</a>
        </div>
      </section>
    </main>
  );
}
