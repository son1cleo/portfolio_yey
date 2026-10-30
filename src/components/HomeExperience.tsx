"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, ChevronDown, Github, Instagram, Linkedin } from "lucide-react";
import { PreviewButton } from "./LivePreview";
import { selectedWork } from "../data/selected-work";
import {
  EMAIL, GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL, PROVETALE_URL, X_URL,
  clientWork, edits, pageIndex, proofPoints, timeline,
} from "../data/content";

const ease = [0.16, 1, 0.3, 1] as const;
const externalClass = "link-draw inline-flex min-h-11 items-center gap-1.5 text-sm text-zinc-200 hover:text-white";
const pillClass = "inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-5 font-mono text-xs uppercase tracking-[0.08em] transition hover:border-white/40";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduced ? 0 : 0.25, delay, ease }}>{children}</motion.div>;
}

function CountValue({ value, countTo, prefix = "", suffix = "" }: { value: string; countTo?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(countTo ? 0 : null);
  useEffect(() => {
    if (!visible || !countTo || reduced) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      setCount(Math.round(countTo * Math.min((now - start) / 900, 1)));
      if (now - start < 900) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [countTo, reduced, visible]);
  return <span ref={ref}>{countTo ? `${prefix}${reduced ? countTo : count}${suffix}` : value}</span>;
}

function BrowserFrame({ image, alt, url, priority = false, terminalFallback = false }: { image: string; alt: string; url: string; priority?: boolean; terminalFallback?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="browser-frame group/frame overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a] transition-colors hover:border-white/30">
      <div className="flex h-10 items-center gap-2 border-b border-white/15 px-4"><i className="size-2 rounded-full bg-white/20" /><i className="size-2 rounded-full bg-white/20" /><i className="size-2 rounded-full bg-white/20" /><span className="ml-2 truncate font-mono text-[10px] text-white/40">{url}</span></div>
      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-950">
        {!failed ? <Image src={image} alt={alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 80vw" onError={() => setFailed(true)} className="object-cover transition-transform duration-500 motion-safe:group-hover/frame:scale-[1.02]" /> : terminalFallback ?
          <div className="grid h-full place-items-center p-8 font-mono text-xs text-zinc-400"><div><p className="text-[var(--neon-green)]">$ provetale build --production</p><p className="mt-3">Narrative layer compiled.</p><p>Evidence checked. Report ready.</p></div></div> :
          <div className="grid h-full place-items-center p-8 font-mono text-xs text-zinc-500">Preview unavailable · {alt}</div>}
      </div>
    </div>
  );
}

function ReelTile({ reel }: { reel: (typeof edits)[number] }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [posterFailed, setPosterFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const video = ref.current;
    if (!video || reduced || videoFailed) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting ? video.play().catch(() => undefined) : video.pause(), { threshold: 0.55 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced, videoFailed]);
  return (
    <a href={reel.instagramUrl} target="_blank" rel="noopener noreferrer" className="group relative aspect-[9/16] min-h-11 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 focus-visible:outline-offset-4">
      {!posterFailed && <Image src={reel.poster} alt={`Poster for ${reel.title}`} fill sizes="(max-width: 768px) 50vw, 25vw" onError={() => setPosterFailed(true)} className="object-cover" />}
      {!videoFailed && <video ref={ref} muted loop playsInline preload="none" poster={posterFailed ? undefined : reel.poster} onError={() => setVideoFailed(true)} className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100" aria-label={reel.title}><source src={reel.mp4} type="video/mp4" /></video>}
      {(posterFailed && videoFailed) && <div className="grid h-full place-items-center p-5 text-center font-display text-xl text-zinc-300">{reel.title}</div>}
      <div className="absolute inset-x-0 bottom-0 bg-[#0a0a0a]/85 p-4 backdrop-blur-sm"><p className="font-display text-lg leading-tight">{reel.title}</p><p className="mt-2 font-mono text-[10px] text-white/50 transition-colors group-hover:text-[var(--neon-green)]">{reel.duration}</p></div>
    </a>
  );
}

function MarginIndex() {
  const [active, setActive] = useState("provetale");
  const [heroVisible, setHeroVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sections = pageIndex.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const observers = sections.map((section) => {
      const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setActive(section.id), { rootMargin: "-40% 0px -55% 0px" });
      observer.observe(section); return observer;
    });
    const visibility = (id: string, setter: (value: boolean) => void) => {
      const element = document.getElementById(id); if (!element) return null;
      const observer = new IntersectionObserver(([entry]) => setter(entry.isIntersecting), { threshold: 0.15 }); observer.observe(element); return observer;
    };
    const hero = visibility("hero", setHeroVisible); const contact = visibility("contact", setContactVisible);
    return () => { observers.forEach((observer) => observer.disconnect()); hero?.disconnect(); contact?.disconnect(); };
  }, []);
  useEffect(() => {
    const close = (event: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", escape); };
  }, []);
  const activeItem = pageIndex.find((item) => item.id === active)!;
  const hidden = heroVisible || contactVisible;
  return (
    <>
      <motion.nav aria-label="Page index" className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 xl:block 2xl:left-[max(2rem,calc((100vw-72rem)/2-12rem))]" animate={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? "none" : "auto" }}>
        <div className="relative border-l border-white/10 pl-4">{pageIndex.map((item) => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} className="group relative block min-h-11 py-2"><span className={`block font-mono text-[11px] ${active === item.id ? "text-[var(--neon-green)]" : "text-white/30"}`}>{item.number}</span><span className={`block font-mono text-[10px] uppercase tracking-[0.12em] ${active === item.id ? "text-white" : "text-white/45"}`}>{item.label}</span>{active === item.id && <><motion.i layoutId="lane-active" className="absolute -left-[17px] top-2 h-8 w-px bg-[var(--neon-green)]" /><span className="mt-1 hidden max-w-40 text-[13px] leading-snug text-zinc-400 min-[1536px]:block">{item.blurb}</span></>}</a>)}</div>
      </motion.nav>
      <motion.nav aria-label="Page index" className="fixed left-2 top-1/2 z-40 hidden -translate-y-1/2 md:block xl:hidden" animate={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? "none" : "auto" }}>
        <div className="relative border-l border-white/10 pl-2">{pageIndex.map((item) => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} aria-label={`${item.number} ${item.label}`} className="group relative flex min-h-11 items-center"><span className={`font-mono text-[10px] ${active === item.id ? "text-[var(--neon-green)]" : "text-white/30"}`}>{item.number}</span><span className="pointer-events-none absolute left-9 whitespace-nowrap rounded-md border border-white/10 bg-[#0a0a0a] px-2 py-1 font-mono text-[10px] uppercase tracking-[.12em] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{item.label}</span>{active === item.id && <motion.i layoutId="tablet-lane-active" className="absolute -left-[9px] h-5 w-px bg-[var(--neon-green)]" />}</a>)}</div>
      </motion.nav>
      <motion.nav aria-label="Page index" className="fixed inset-x-0 top-[61px] z-40 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md md:hidden" animate={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? "none" : "auto", y: hidden ? -8 : 0 }} ref={menuRef}>
        <div className="flex h-10 items-center justify-between px-4"><span className="font-mono text-[11px] tracking-[0.12em]">{activeItem.number} / {activeItem.label.toUpperCase()}</span><button type="button" className="flex min-h-10 items-center gap-1 font-mono text-[11px] text-zinc-300" aria-expanded={open} onClick={() => setOpen((value) => !value)}>Index <ChevronDown size={13} /></button></div>
        <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="border-t border-white/10 bg-[#0a0a0a] p-2">{pageIndex.map((item) => <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 rounded-lg px-3 font-mono text-xs hover:bg-white/5"><span className="text-[var(--neon-green)]">{item.number}</span>{item.label}</a>)}</motion.div>}</AnimatePresence>
        <motion.i className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--neon-green)]" style={{ scaleX: (pageIndex.findIndex((item) => item.id === active) + 1) / pageIndex.length }} />
      </motion.nav>
    </>
  );
}

export function HomeExperience() {
  const reduced = useReducedMotion();
  return (
    <main className="home-shell mx-auto w-full max-w-6xl px-4 sm:px-8">
      <MarginIndex />
      <section id="hero" className="grid min-h-[calc(100svh-5rem)] items-center gap-10 border-b border-white/15 py-14 md:grid-cols-[minmax(0,1.25fr)_minmax(260px,.75fr)] md:py-20">
        <div>
          <motion.h1 className="max-w-3xl font-display text-[40px] leading-[1.08] tracking-[-.01em] sm:text-5xl lg:text-[64px]" initial={reduced ? false : "hidden"} animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: .08 } } }}>
            {["Data scientist who ships", "production software"].map((line) => <motion.span key={line} className="block" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: .5, ease } } }}>{line}</motion.span>)}
          </motion.h1>
          <motion.p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-300" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : .31, duration: .4 }}>Analysis, LLM systems, and the apps around them.</motion.p>
          <div className="mt-8 flex flex-wrap items-center gap-5"><a href="#provetale" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f5f5f5] px-6 font-mono text-xs uppercase tracking-[.08em] text-black transition hover:bg-zinc-300">See Provetale <ArrowDown size={15} /></a><a href={`mailto:${EMAIL}`} className={externalClass}>Email me <ArrowUpRight size={15} /></a></div>
          <div className="mt-10 grid grid-cols-2 border-y border-white/15 sm:grid-cols-4">{proofPoints.map((item, index) => <div key={item.label} className={`py-4 ${index % 2 ? "border-l border-white/15 pl-4" : "pr-4"} sm:border-l sm:border-white/15 sm:px-4 sm:first:border-l-0 sm:first:pl-0`}><strong className="block font-mono text-sm font-normal text-[var(--neon-green)]"><CountValue {...item} /></strong><span className="mt-1 block font-mono text-[10px] leading-snug text-white/45">{item.label}</span></div>)}</div>
        </div>
        <motion.div initial={reduced ? false : { opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduced ? 0 : .6, ease }} className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-white/15"><Image src="/profile2.jpg" alt="Midhat Ratib Khan" fill priority sizes="(max-width: 768px) 90vw, 35vw" className="object-cover" /></motion.div>
      </section>

      <section id="provetale" className="scroll-mt-28 border-b border-white/15 py-20 md:py-28">
        <motion.div className="mb-12 h-px origin-left bg-[var(--neon-green)]" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: .8 }} transition={{ duration: reduced ? 0 : .6, ease }} />
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end"><div><p className="section-index">01 · My product</p><h2>Provetale</h2><p className="mt-4 max-w-md text-xl text-zinc-300">The modern narrative toolkit for data &amp; engineering.</p><p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-400">Designed, built and shipped solo. I share the build on Instagram.</p><div className="mt-6 flex flex-wrap gap-2"><span className="chip">Founder</span><span className="chip">In production</span></div></div><Reveal delay={.12}><BrowserFrame image="/work/provetale.png" alt="Provetale product homepage" url="provetale.com" priority terminalFallback /></Reveal></div>
        <div className="mt-8 flex flex-wrap gap-3"><a href={PROVETALE_URL} target="_blank" rel="noopener noreferrer" className={pillClass}>Visit provetale.com <ArrowUpRight size={14} /></a><PreviewButton site={{ name: "Provetale", url: PROVETALE_URL, urlLabel: "provetale.com", image: "/work/provetale.png", alt: "Provetale product homepage" }} className={pillClass} /><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={externalClass}>Follow the build on Instagram <ArrowUpRight size={14} /></a></div>
      </section>

      <section id="work" className="scroll-mt-28 border-b border-white/15 py-20 md:py-28"><Reveal><p className="section-index">02 · Client work</p><h2>Sites built for real organizations</h2></Reveal><div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">{clientWork.map((site, index) => <Reveal key={site.id} className={index === 0 ? "lg:row-span-2" : ""} delay={index * .05}><article className="h-full border-t border-white/15 pt-5"><BrowserFrame image={site.image} alt={site.alt} url={site.urlLabel} /><p className="mt-5 font-mono text-xs text-[var(--neon-green)]">{site.outcome}</p><h3 className="mt-2">{site.name}</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">{site.description}</p><div className="mt-4 flex flex-wrap gap-2">{site.chips.map((chip) => <span className="chip" key={chip}>{chip}</span>)}</div><div className="mt-5 flex flex-wrap gap-4"><PreviewButton site={site} className={externalClass} /><a href={site.url} target="_blank" rel="noopener noreferrer" className={externalClass}>Visit live <ArrowUpRight size={14} /></a></div></article></Reveal>)}</div></section>

      <section id="edits" className="scroll-mt-28 border-b border-white/15 py-20 md:py-28"><Reveal><p className="section-index">03 · Edits</p><h2>I also cut short-form video</h2></Reveal><div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">{edits.map((reel) => <ReelTile key={reel.title} reel={reel} />)}</div><div className="mt-8"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={externalClass}>More on Instagram <ArrowUpRight size={14} /></a></div><Reveal className="mt-14 border-y border-white/15 py-8"><p className="font-mono text-xs uppercase tracking-[.12em] text-white/45">3 AM terminal · cut map</p><div className="mt-7 grid gap-7 md:grid-cols-3">{timeline.map((beat, index) => <div key={beat.time}><p className="font-mono text-[11px] text-white/45">{beat.time}</p><p className="mt-3 font-display text-xl leading-snug">{beat.quote}</p><motion.i className={`mt-5 block h-px origin-left ${index === 2 ? "bg-[var(--neon-green)]" : "bg-white/35"}`} initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : .45, delay: reduced ? 0 : index * .25, ease }} /></div>)}</div></Reveal></section>

      <section id="data" className="scroll-mt-28 border-b border-white/15 py-20 md:py-28"><Reveal><p className="section-index">04 · Data &amp; AI</p><h2>Selected work</h2></Reveal><div className="mt-10 divide-y divide-white/15 border-y border-white/15 md:grid md:grid-cols-3 md:divide-x md:divide-y-0">{selectedWork.map((project) => <article key={project.id} className="py-6 md:px-6 md:first:pl-0 md:last:pr-0"><p className="font-mono text-xs text-[var(--neon-green)]">{project.evidence}</p><h3 className="mt-2">{project.title}</h3><p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.summary}</p></article>)}</div><div className="mt-10 grid gap-6 md:grid-cols-2"><BrowserFrame image="/projects/databrief-upload.png" alt="Early DataBrief interface, now evolved into Provetale" url="Early DataBrief interface · now Provetale" /><BrowserFrame image="/projects/databrief-report.png" alt="DataBrief report prototype, now evolved into Provetale" url="DataBrief report prototype · evolved into Provetale" /></div></section>

      <section id="contact" className="scroll-mt-28 py-20 md:py-32"><Reveal><p className="section-index">Contact</p><h2>Email me with the brief</h2><a href={`mailto:${EMAIL}`} className="contact-email mt-7 inline-block break-all font-display text-[clamp(2rem,6vw,4rem)] leading-tight">{EMAIL}</a><p className="mt-6 max-w-2xl leading-relaxed text-zinc-300">For data science roles, LLM evaluation, websites, edits, or a product built around data.</p><div className="mt-8 flex flex-wrap gap-x-6 gap-y-2"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={externalClass}><Instagram size={16} /> Instagram <ArrowUpRight size={13} /></a><a href={X_URL} target="_blank" rel="noopener noreferrer" className={externalClass}>X <ArrowUpRight size={13} /></a><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={externalClass}><Github size={16} /> GitHub <ArrowUpRight size={13} /></a><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={externalClass}><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a></div></Reveal></section>
    </main>
  );
}
