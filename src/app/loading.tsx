import Image from "next/image";

export default function Loading() {
  return (
    <main className="grid min-h-[calc(100svh-5rem)] place-items-center px-6" aria-busy="true" aria-live="polite">
      <div className="flex items-center gap-3 text-zinc-300" role="status">
        <Image src="/logo.svg" alt="" width={32} height={32} className="size-8" />
        <span>Loading portfolio…</span>
      </div>
    </main>
  );
}
