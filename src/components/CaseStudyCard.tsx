"use client";

import Image from "next/image";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export type CaseStudyTheme = {
  background: string;
  panel: string;
  foreground: string;
  muted: string;
  accent: string;
  border: string;
  headlineFont: "font-sans" | "font-serif" | "font-mono";
};

export type CaseStudy = {
  id: string;
  eyebrow?: string;
  indexLabel?: string;
  windowLabel: string;
  screenshotSrc?: string;
  screenshotAlt: string;
  headline: string;
  headlineAccent?: string;
  subheadline?: string;
  description: string;
  meta: { label: string; value: string }[];
  href: string;
  linkLabel: string;
  theme: CaseStudyTheme;
};

function renderHeadline(headline: string, accentPart: string | undefined, accentColor: string) {
  if (!accentPart) return headline;
  const index = headline.indexOf(accentPart);
  if (index === -1) return headline;
  return (
    <>
      {headline.slice(0, index)}
      <span style={{ color: accentColor }}>{accentPart}</span>
      {headline.slice(index + accentPart.length)}
    </>
  );
}

export function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const { theme } = study;

  return (
    <motion.article
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
      className="overflow-hidden rounded-2xl border"
      style={{ background: theme.background, borderColor: theme.border }}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: theme.muted }}>
            {study.eyebrow ?? study.windowLabel}
          </p>
          {study.indexLabel && (
            <p className="font-mono text-xs font-semibold" style={{ color: theme.accent }}>
              {study.indexLabel}
            </p>
          )}
        </div>

        <div
          className="mt-4 overflow-hidden rounded-xl border"
          style={{ borderColor: theme.border, background: theme.panel }}
        >
          <div
            className="flex items-center gap-2 border-b px-4 py-2.5"
            style={{ borderColor: theme.border }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2 truncate font-mono text-xs" style={{ color: theme.muted }}>
              {study.windowLabel}
            </span>
          </div>

          <div className="relative aspect-[16/10] w-full">
            {study.screenshotSrc ? (
              <Image
                src={study.screenshotSrc}
                alt={study.screenshotAlt}
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover object-top"
              />
            ) : (
              <div
                className="flex h-full w-full flex-col items-center justify-center gap-2"
                style={{ background: theme.panel }}
              >
                <ImageOff size={22} style={{ color: theme.muted }} aria-hidden="true" />
                <span className="font-mono text-xs" style={{ color: theme.muted }}>
                  Screenshot pending
                </span>
              </div>
            )}
          </div>
        </div>

        <h2 className={`mt-8 text-3xl font-bold tracking-tight sm:text-4xl ${theme.headlineFont}`} style={{ color: theme.foreground }}>
          {renderHeadline(study.headline, study.headlineAccent, theme.accent)}
        </h2>

        {study.subheadline && (
          <p className={`mt-2 text-lg italic ${theme.headlineFont}`} style={{ color: theme.muted }}>
            {study.subheadline}
          </p>
        )}

        <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: theme.muted }}>
          {study.description}
        </p>

        <div className="mt-6 grid gap-4 border-t pt-5 sm:grid-cols-2" style={{ borderColor: theme.border }}>
          {study.meta.map((row) => (
            <div key={row.label}>
              <p className="font-mono text-xs uppercase tracking-wide" style={{ color: theme.accent }}>
                {row.label}
              </p>
              <p className="mt-1 text-sm" style={{ color: theme.foreground }}>
                {row.value}
              </p>
            </div>
          ))}
        </div>

        <a
          href={study.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm font-medium transition hover:opacity-80"
          style={{ color: theme.accent }}
        >
          {study.linkLabel} <ArrowUpRight size={14} />
        </a>
      </div>
    </motion.article>
  );
}
