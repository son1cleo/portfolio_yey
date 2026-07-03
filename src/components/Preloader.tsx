"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      onDone();
      return;
    }

    let raf: number;
    const start = performance.now();
    const duration = 1500;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        setTimeout(onDone, 550);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070a]"
        >
          <div className="relative flex h-36 w-36 items-center justify-center">
            <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
              <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="rgba(94, 234, 212, 0.15)" strokeWidth="2" />
              <circle
                cx="60"
                cy="60"
                r={RADIUS}
                fill="none"
                stroke="#5eead4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={offset}
              />
            </svg>
            <div className="h-28 w-28 overflow-hidden rounded-full border border-white/10 bg-black/40">
              {!photoFailed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/profile.jpg"
                  alt="Midhat Ratib Khan"
                  className="h-full w-full object-cover"
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-semibold tracking-wide text-teal-300">
                  MRK
                </div>
              )}
            </div>
            <span className="absolute -bottom-9 text-xs font-medium tracking-[0.2em] text-teal-200/70">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
