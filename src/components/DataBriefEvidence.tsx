import Image from "next/image";
export function DataBriefEvidence() {
  return (
    <section
      aria-labelledby="databrief-evidence"
      className="mt-8 border-t border-white/15 pt-6"
    >
      <h3 id="databrief-evidence">Inside the build</h3>
      <p className="mt-3 text-sm text-zinc-400">
        Screenshots from when the app was running.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {[
          {
            src: "/projects/databrief-dashboard.webp",
            alt: "DataBrief usage dashboard and completed reports",
          },
          {
            src: "/projects/databrief-narrative.webp",
            alt: "DataBrief report narrative with a supporting chart",
          },
        ].map((frame) => (
          <figure key={frame.src}>
            <Image
              src={frame.src}
              alt={frame.alt}
              width={439}
              height={250}
              sizes="(max-width: 767px) 88vw, 500px"
              className="h-auto w-full rounded-lg"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
