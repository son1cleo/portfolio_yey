"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

type PreviewSite = { name: string; url: string; urlLabel: string; image: string; alt: string };

export function PreviewButton({ site, className = "" }: { site: PreviewSite; className?: string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const launch = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      window.open(site.url, "_blank", "noopener,noreferrer");
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <button ref={triggerRef} type="button" onClick={launch} className={className}>Preview live</button>
      {open && <LivePreview site={site} onClose={() => setOpen(false)} returnFocus={() => triggerRef.current?.focus()} />}
    </>
  );
}

function LivePreview({ site, onClose, returnFocus }: { site: PreviewSite; onClose: () => void; returnFocus: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setTimedOut(true), 6000);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>("button")?.focus());
    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      returnFocus();
    };
  }, [onClose, returnFocus]);

  return (
    <AnimatePresence>
      {(
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#0a0a0a]/90 p-4 backdrop-blur-md"
          initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-label={`Live preview of ${site.name}`} className="flex max-h-[92vh] w-full max-w-[1280px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a]"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex min-h-14 items-center gap-3 border-b border-white/15 px-4">
              <span className="min-w-0 flex-1 truncate font-mono text-xs text-zinc-300">{site.urlLabel}</span>
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex min-h-11 items-center gap-1 font-mono text-xs">Open in new tab <ArrowUpRight size={14} /></a>
              <button type="button" onClick={onClose} aria-label="Close live preview" className="grid size-11 place-items-center rounded-full border border-white/15 hover:border-white/30"><X size={18} /></button>
            </div>
            <div className="relative aspect-[16/10] min-h-0 w-full bg-zinc-950">
              {!loaded && <Image src={site.image} alt={site.alt} fill sizes="100vw" className="object-cover" />}
              {!timedOut && <iframe src={site.url} title={`Live preview of ${site.name}`} loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" referrerPolicy="no-referrer" onLoad={() => setLoaded(true)} className={`absolute inset-0 h-full w-full bg-white transition-opacity ${loaded ? "opacity-100" : "opacity-0"}`} />}
              {timedOut && !loaded && <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/15 bg-[#0a0a0a]/95 p-4 text-sm text-zinc-300">This site can&apos;t be previewed here. <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-white underline decoration-[var(--neon-green)] underline-offset-4">open it in a new tab <ArrowUpRight className="inline" size={14} /></a></div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
