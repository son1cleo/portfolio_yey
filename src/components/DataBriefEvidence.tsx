import Image from "next/image";

// Display the two screenshots within the supplied 1080 × 1350 project card.
// Keep the source intact and exclude the surrounding legacy marketing copy.
const frames = [
  {
    title: "Usage dashboard",
    x: 88,
    alt: "DataBrief dashboard showing report usage, plan information, and reports marked ready.",
    caption: "Report usage and completed reports in the dashboard.",
  },
  {
    title: "Report narrative and chart",
    x: 554,
    alt: "DataBrief generated report about study time and academic performance, with a written analysis and a bar chart.",
    caption: "A second report pairs its written analysis with a supporting chart.",
  },
];

export function DataBriefEvidence() {
  return (
    <section aria-labelledby="databrief-evidence" className="mt-8 border-t border-white/15 pt-6">
      <h3 id="databrief-evidence" className="text-lg font-semibold">Inside the product</h3>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        {frames.map((frame) => (
          <figure key={frame.title} className="min-w-0">
            <h4 className="mb-3 text-sm font-medium text-zinc-200">{frame.title}</h4>
            <div className="relative aspect-[439/250] overflow-hidden rounded-lg border border-white/15 bg-[#0b1220]">
              <Image
                src="/projects/databrief.png"
                alt={frame.alt}
                width={1080}
                height={1350}
                unoptimized
                className="absolute h-auto max-w-none"
                style={{ width: `${(1080 / 439) * 100}%`, left: `${(-frame.x / 439) * 100}%`, top: `${(-900 / 250) * 100}%` }}
              />
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-zinc-400">{frame.caption}</figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-3 text-xs text-zinc-400">Screenshot excerpts from the project overview.</p>
    </section>
  );
}
