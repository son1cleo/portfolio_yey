import { PortfolioCard } from "./PortfolioCard";
import Image from "next/image";
import { PROVETALE_DESCRIPTION } from "../data/selected-work";
import { DataBriefEvidence } from "./DataBriefEvidence";

export function DataBriefCaseStudy() {
  return (
    <PortfolioCard
      id="databrief"
      title="DataBrief / Provetale"
      headingLevel={2}
      description={PROVETALE_DESCRIPTION}
      detail="Data analysis · LLM reporting"
      actions={
        <div className="project-links">
          <a
            href="https://provetale.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Sample reports ↗
          </a>
        </div>
      }
    >
      <dl className="mt-7 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="font-semibold">Problem</dt>
          <dd className="mt-2 text-sm leading-relaxed text-zinc-300">
            Spreadsheets contained unexpected patterns that were hard to find
            and explain. The challenge was checking each finding against its
            supporting evidence.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">My role</dt>
          <dd className="mt-2 text-sm leading-relaxed text-zinc-300">
            Built the application from upload and statistical analysis through
            LLM narration, report viewing, and document export.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Stack</dt>
          <dd className="mt-2 text-sm leading-relaxed text-zinc-300">
            Next.js · TypeScript statistics engine · Prisma / Neon Postgres ·
            Inngest · LangChain.js / LangGraph.js
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Outcome</dt>
          <dd className="mt-2 text-sm leading-relaxed text-zinc-300">
            A working report pipeline with an in-app reader and PDF, Word, and
            PowerPoint exports. The captured output below showed the narrative
            alongside its supporting statistics.
          </dd>
        </div>
      </dl>
      <figure className="mt-8">
        <a
          href="/projects/databrief-report.png"
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-lg border border-white/15"
          aria-label="Open full-size DataBrief report prototype screenshot"
        >
          <Image
            src="/projects/databrief-report.png"
            alt="DataBrief report prototype, now evolved into Provetale: two players each scored 10 goals, compared with a tournament average of 0.64 goals per player and standard deviation of 1.09."
            width={1871}
            height={879}
            sizes="(min-width: 1024px) 896px, 100vw"
            className="h-auto w-full"
          />
        </a>
        <figcaption className="mt-3 text-sm leading-relaxed text-zinc-400">
          DataBrief report prototype · evolved into Provetale. Open the image to
          read it at full size.
        </figcaption>
      </figure>
      <div className="mt-6 grid gap-5 border-t border-white/15 pt-6 sm:grid-cols-3">
        <div>
          <h3 className="font-semibold">Finding</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            The report identified a shared scoring lead: two players with 10
            goals each.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Statistic</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            The captured report gave a mean of 0.64 goals and a standard
            deviation of 1.09, putting 10 goals roughly 8.6 standard deviations
            above the mean.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Interpretation</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            An unusual result prompted investigation. Dataset scope and player
            records needed checking before an outlier could be treated as
            evidence of performance.
          </p>
          <p className="mt-2 text-xs text-zinc-400">
            Portfolio commentary, not a quoted report recommendation.
          </p>
        </div>
      </div>
      <DataBriefEvidence />
      <details className="mt-7 border-t border-white/15 pt-5">
        <summary className="cursor-pointer text-sm font-medium">
          See the upload interface
        </summary>
        <figure className="mt-4">
          <Image
            src="/projects/databrief-upload.png"
            alt="Early DataBrief interface, now evolved into Provetale, with file upload, data preview, configuration, and generation steps."
            width={1898}
            height={893}
            sizes="(min-width: 1024px) 896px, 100vw"
            className="h-auto w-full rounded-lg"
          />
          <figcaption className="mt-3 text-sm text-zinc-400">
            Early DataBrief interface · now Provetale. Upload → preview data →
            configure → generate.
          </figcaption>
        </figure>
      </details>
    </PortfolioCard>
  );
}
