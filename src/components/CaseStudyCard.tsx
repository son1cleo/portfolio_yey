"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";
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
  href: string;
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
    <motion.a
      href={study.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${study.headline}`}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
      className="group block h-full min-w-0 overflow-hidden rounded-2xl border transition-[transform,filter] duration-300 hover:-translate-y-1 hover:brightness-110 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--neon-green)]"
      style={{ background: theme.background, borderColor: theme.border }}
    >
      <div className="flex h-full flex-col p-5 sm:p-6">
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
                sizes="(min-width: 1024px) 256px, (min-width: 640px) calc(100vw - 128px), calc(100vw - 80px)"
                className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
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

        <h3 className={`mt-6 text-2xl font-bold tracking-tight ${theme.headlineFont}`} style={{ color: theme.foreground }}>
          {renderHeadline(study.headline, study.headlineAccent, theme.accent)}
        </h3>

        {study.subheadline && (
          <p className={`mt-2 text-lg italic ${theme.headlineFont}`} style={{ color: theme.muted }}>
            {study.subheadline}
          </p>
        )}

        <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: theme.muted }}>
          {study.description}
        </p>

      </div>
    </motion.a>
  );
}
