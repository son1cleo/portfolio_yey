import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { selectedWork } from "../data/selected-work";

export default function Home() {
  return (
    <main className="page-shell max-w-6xl">
      <section className="flex items-start justify-between gap-8 border-b border-white/15 pb-8 sm:pb-10">
        <div className="min-w-0 max-w-3xl">
          <p className="text-sm font-medium text-[var(--neon-green)]">Midhat Ratib Khan</p>
          <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Data scientist who ships production software
            <span className="mt-3 block text-xl font-normal leading-relaxed tracking-normal text-zinc-300 sm:text-2xl">Analysis, LLM systems, and the apps around them.</span>
          </h1>
          <a href="/resume/MidhatRatibCV_DS.pdf" download className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-[var(--neon-green)]">
            Download Data science CV <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <Image src="/profile2.jpg" alt="Midhat Ratib Khan" width={120} height={160} priority className="hidden h-40 w-30 shrink-0 rounded-xl object-cover sm:block" />
      </section>
      <section aria-labelledby="selected-work" className="mt-7">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="selected-work" className="text-lg font-semibold">Selected work</h2>
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white">All projects <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className="mt-4 divide-y divide-white/15 border-y border-white/15 md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
          {selectedWork.map((project) => (
            <article key={project.id} className="min-w-0 py-4 md:px-5 md:py-6 md:first:pl-0 md:last:pr-0">
              <p className="text-sm font-medium text-[var(--neon-green)]">{project.evidence}</p>
              <h3 className="mt-1 text-xl font-semibold"><Link href={`/projects#${project.id}`} className="hover:underline underline-offset-4">{project.title}</Link></h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
