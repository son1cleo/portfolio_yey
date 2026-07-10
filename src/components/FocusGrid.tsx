"use client";

import { BarChart3, BrainCircuit, Layers, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const focusAreas = [
  {
    title: "Data Science",
    blurb: "Statistical rigor turned into decisions, not just dashboards.",
    Icon: BarChart3,
  },
  {
    title: "AI Engineering",
    blurb: "Production LLM systems that hold up outside a notebook.",
    Icon: BrainCircuit,
  },
  {
    title: "Full-Stack Delivery",
    blurb: "Shipped products, end to end, on real deadlines.",
    Icon: Layers,
  },
  {
    title: "Applied LLMs / GenAI",
    blurb: "Evaluation, narration, and automation built on top of LLMs.",
    Icon: Sparkles,
  },
];

export function FocusGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
    >
      {focusAreas.map(({ title, blurb, Icon }) => (
        <div
          key={title}
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-200 hover:-translate-y-1 hover:border-white/30 sm:p-5"
        >
          <Icon size={22} className="text-white transition group-hover:text-white/80" />
          <h2 className="mt-3 font-mono text-sm font-semibold text-white">{title}</h2>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{blurb}</p>
        </div>
      ))}
    </motion.div>
  );
}
