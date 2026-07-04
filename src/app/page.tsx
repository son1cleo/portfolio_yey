"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const HERO_NAME = "Hi, I'm Midhat Ratib Khan";
const HERO_SENTENCE = "A Data Scientist who ships software";
const HERO_SENTENCE_HIGHLIGHT_START = HERO_SENTENCE.indexOf("Data Scientist");
const HERO_SENTENCE_HIGHLIGHT_END = HERO_SENTENCE_HIGHLIGHT_START + "Data Scientist".length;
const HERO_SENTENCE_CHARS = Array.from(HERO_SENTENCE);

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
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-[1.4em] px-4 text-center font-mono text-2xl font-bold tracking-tight text-white sm:text-4xl"
      >
        {typedName}
        {typedName.length < HERO_NAME.length && <span className="animate-pulse text-white/60">|</span>}
      </motion.h1>

      <p className="mt-5 min-h-[1.6em] text-center font-mono text-base text-zinc-300 sm:text-xl">
        {sentenceStart &&
          HERO_SENTENCE_CHARS.map((char, index) => {
            const isHighlight = index >= HERO_SENTENCE_HIGHLIGHT_START && index < HERO_SENTENCE_HIGHLIGHT_END;
            return (
              <motion.span
                key={index}
                initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : index * 0.025, ease: "easeOut" }}
                className={isHighlight ? "text-white" : "text-zinc-400"}
              >
                {char}
              </motion.span>
            );
          })}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
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
