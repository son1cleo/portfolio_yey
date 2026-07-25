"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const HERO_SENTENCE = "A Data Scientist who ships Software";
const HIGHLIGHT_TERMS = ["Data Scientist", "Software"];
const HIGHLIGHT_RANGES = HIGHLIGHT_TERMS.map((term) => {
  const start = HERO_SENTENCE.indexOf(term);
  return { start, end: start + term.length };
}).sort((a, b) => a.start - b.start);

function getSentenceSegments() {
  const segments: { text: string; highlighted: boolean }[] = [];
  let cursor = 0;
  for (const range of HIGHLIGHT_RANGES) {
    if (range.start > cursor) segments.push({ text: HERO_SENTENCE.slice(cursor, range.start), highlighted: false });
    segments.push({ text: HERO_SENTENCE.slice(range.start, range.end), highlighted: true });
    cursor = range.end;
  }
  if (cursor < HERO_SENTENCE.length) segments.push({ text: HERO_SENTENCE.slice(cursor), highlighted: false });
  return segments;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 + 0.2, duration: 0.7, ease: "easeOut" },
  }),
};

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const sentenceSegments = getSentenceSegments();

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-12 overflow-x-clip px-4 py-24 lg:flex-row lg:gap-16 lg:px-8">
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="neon-frame relative aspect-[2/3] w-48 shrink-0 overflow-hidden rounded-xl sm:w-56 lg:w-64"
      >
        <Image src="/profile2.jpg" alt="Midhat Ratib Khan" fill sizes="256px" className="object-cover" priority />
      </motion.div>

      <div className="max-w-xl text-center lg:text-left">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate="visible"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--neon-green)]/30 bg-[var(--neon-green)]/10 px-4 py-1.5 backdrop-blur-sm"
        >
          <Zap className="h-4 w-4 text-[var(--neon-green)]" />
          <span className="text-sm font-medium text-zinc-200">Data Scientist · AI Engineer</span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate="visible"
          className="mt-6 bg-gradient-to-b from-white to-[var(--neon-green)] bg-clip-text font-sans text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl"
        >
          Hi, I&apos;m Midhat Ratib Khan
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate="visible"
          className="mx-auto mt-6 max-w-lg font-sans text-lg text-zinc-400 lg:mx-0"
        >
          {sentenceSegments.map((segment, index) => (
            <span key={index} className={segment.highlighted ? "font-semibold text-white" : undefined}>
              {segment.text}
            </span>
          ))}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate="visible"
          className="mt-10 flex justify-center lg:justify-start"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-sans font-semibold text-black shadow-lg transition-colors duration-300 hover:bg-zinc-200"
          >
            View Projects
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
