"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const HERO_NAME = "Hi, I'm Midhat Ratib Khan";
const HERO_SENTENCE = "A Data Scientist who ships software";
const HERO_SENTENCE_HIGHLIGHT_START = HERO_SENTENCE.indexOf("Data Scientist");
const HERO_SENTENCE_HIGHLIGHT_END = HERO_SENTENCE_HIGHLIGHT_START + "Data Scientist".length;

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

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

      <motion.h1
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="mt-7 px-4 text-center font-mono text-2xl font-bold tracking-tight text-white sm:text-4xl"
      >
        {HERO_NAME}
      </motion.h1>

      <motion.p
        initial={prefersReducedMotion ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="mt-5 text-center font-mono text-base text-zinc-400 sm:text-xl"
      >
        {HERO_SENTENCE.slice(0, HERO_SENTENCE_HIGHLIGHT_START)}
        <span className="text-white">
          {HERO_SENTENCE.slice(HERO_SENTENCE_HIGHLIGHT_START, HERO_SENTENCE_HIGHLIGHT_END)}
        </span>
        {HERO_SENTENCE.slice(HERO_SENTENCE_HIGHLIGHT_END)}
      </motion.p>

      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
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
