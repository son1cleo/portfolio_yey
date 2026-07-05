"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const HERO_NAME = "Hi, I'm Midhat Ratib Khan";
const HERO_SENTENCE = "A Data Scientist who ships Software";
const HIGHLIGHT_TERMS = ["Data Scientist", "Software"];
const HIGHLIGHT_RANGES = HIGHLIGHT_TERMS.map((term) => {
  const start = HERO_SENTENCE.indexOf(term);
  return { start, end: start + term.length };
});
const HERO_SENTENCE_CHARS = Array.from(HERO_SENTENCE);

function isHighlighted(index: number) {
  return HIGHLIGHT_RANGES.some((range) => index >= range.start && index < range.end);
}

export default function Home() {
  const [typedName, setTypedName] = useState("");
  const [sentenceStart, setSentenceStart] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      const immediate = window.setTimeout(() => setTypedName(HERO_NAME), 0);
      return () => window.clearTimeout(immediate);
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedName(HERO_NAME.slice(0, index));
      if (index >= HERO_NAME.length) {
        window.clearInterval(timer);
      }
    }, 55);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const nameTypingDone = typedName.length >= HERO_NAME.length;
    if (!nameTypingDone) return;

    const timer = window.setTimeout(() => setSentenceStart(true), 300);
    return () => window.clearTimeout(timer);
  }, [typedName]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-x-clip px-4">
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="neon-frame relative aspect-[2/3] w-36 overflow-hidden rounded-xl sm:w-44"
      >
        <Image src="/profile2.jpg" alt="Midhat Ratib Khan" fill sizes="176px" className="object-cover" priority />
      </motion.div>

      <h1 className="mt-7 min-h-[1.4em] px-4 text-center font-mono text-2xl font-bold tracking-tight text-white sm:text-4xl">
        {typedName}
        {typedName.length < HERO_NAME.length && <span className="animate-pulse text-white/60">|</span>}
      </h1>

      <p className="mt-5 min-h-[1.6em] text-center font-mono text-base text-zinc-300 sm:text-xl">
        {sentenceStart &&
          HERO_SENTENCE_CHARS.map((char, index) => (
            <motion.span
              key={index}
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.08, delay: prefersReducedMotion ? 0 : index * 0.045, ease: "easeOut" }}
              className={isHighlighted(index) ? "text-white" : "text-zinc-400"}
            >
              {char}
            </motion.span>
          ))}
      </p>

      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-mono text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-zinc-200"
        >
          View Projects <ArrowUpRight size={16} />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-mono text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
        >
          Let&apos;s Talk
        </Link>
      </motion.div>
    </div>
  );
}
