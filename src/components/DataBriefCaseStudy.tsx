import Image from "next/image";

export function DataBriefCaseStudy() {
  return (
    <article id="databrief" className="scroll-mt-36 rounded-2xl border border-white/15 bg-[#0b1220] p-5 sm:p-8">
      <p className="text-sm font-medium text-[var(--neon-green)]">Data analysis · LLM reporting</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">DataBrief</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-300">Turn a raw dataset into a report that explains what stands out—and the statistics behind it.</p>
      <dl className="mt-7 grid gap-6 sm:grid-cols-2">
        <div><dt className="font-semibold">Problem</dt><dd className="mt-2 text-sm leading-relaxed text-zinc-300">A spreadsheet can contain an unexpected pattern without making it obvious. The work is finding it, checking the evidence, and explaining it clearly.</dd></div>
        <div><dt className="font-semibold">My role</dt><dd className="mt-2 text-sm leading-relaxed text-zinc-300">Built the application from upload and statistical analysis through LLM narration, report viewing, and document export.</dd></div>
        <div><dt className="font-semibold">Stack</dt><dd className="mt-2 text-sm leading-relaxed text-zinc-300">Next.js · TypeScript statistics engine · Prisma / Neon Postgres · Inngest · LangChain.js / LangGraph.js</dd></div>
        <div><dt className="font-semibold">Outcome</dt><dd className="mt-2 text-sm leading-relaxed text-zinc-300">A working report pipeline with an in-app reader and PDF, Word, and PowerPoint exports. The captured output below shows the narrative alongside its supporting statistics.</dd></div>
      </dl>
      <figure className="mt-8">
        <a href="/projects/databrief-report.png" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-white/15" aria-label="Open full-size DataBrief report screenshot">
          <Image src="/projects/databrief-report.png" alt="DataBrief report: two players each scored 10 goals, compared with a tournament average of 0.64 goals per player and standard deviation of 1.09." width={1871} height={879} sizes="(min-width: 1024px) 896px, 100vw" className="h-auto w-full" />
        </a>
        <figcaption className="mt-3 text-sm leading-relaxed text-zinc-400">Actual report view from the local build. Open the image to read it at full size.</figcaption>
      </figure>
      <div className="mt-6 grid gap-5 border-t border-white/15 pt-6 sm:grid-cols-3">
        <div><h3 className="font-semibold">Finding</h3><p className="mt-2 text-sm leading-relaxed text-zinc-300">The report identifies a shared scoring lead: two players with 10 goals each.</p></div>
        <div><h3 className="font-semibold">Statistic</h3><p className="mt-2 text-sm leading-relaxed text-zinc-300">The captured report gives a mean of 0.64 goals and a standard deviation of 1.09, putting 10 goals roughly 8.6 standard deviations above the mean.</p></div>
        <div><h3 className="font-semibold">Interpretation</h3><p className="mt-2 text-sm leading-relaxed text-zinc-300">An unusual result is a prompt to investigate. Check dataset scope and player records before treating an outlier as evidence of performance.</p><p className="mt-2 text-xs text-zinc-400">Portfolio commentary, not a quoted report recommendation.</p></div>
      </div>
      <details className="mt-7 border-t border-white/15 pt-5">
        <summary className="cursor-pointer text-sm font-medium">See the upload interface</summary>
        <figure className="mt-4">
          <Image src="/projects/databrief-upload.png" alt="DataBrief upload screen with file upload, data preview, configuration, and generation steps." width={1898} height={893} sizes="(min-width: 1024px) 896px, 100vw" className="h-auto w-full rounded-lg" />
          <figcaption className="mt-3 text-sm text-zinc-400">Upload → preview data → configure → generate.</figcaption>
        </figure>
      </details>
      <a href="https://github.com/son1cleo/databrief" target="_blank" rel="noopener noreferrer" className="mt-7 inline-block text-sm text-zinc-200 underline underline-offset-4 hover:text-white">Explore the source on GitHub</a>
    </article>
  );
}
