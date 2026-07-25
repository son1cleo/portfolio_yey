"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GooeyText } from "./ui/gooey-text-morphing";

const INTRO_TEXTS = ["Hi", "I'm Midhat", "A Data Scientist", "who ships Software"];
const SESSION_KEY = "intro-shown";

function subscribeNoop() {
  return () => {};
}

function getAlreadyShownSnapshot() {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

function getAlreadyShownServerSnapshot() {
  return true;
}

export function Preloader() {
  const alreadyShown = useSyncExternalStore(subscribeNoop, getAlreadyShownSnapshot, getAlreadyShownServerSnapshot);
  const prefersReducedMotion = useReducedMotion();
  const [dismissed, setDismissed] = useState(false);

  const showIntro = !alreadyShown && !prefersReducedMotion && !dismissed;

  const handleComplete = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] px-6"
        >
          <GooeyText
            texts={INTRO_TEXTS}
            morphTime={1}
            cooldownTime={0.3}
            onComplete={handleComplete}
            className="font-mono font-bold"
            textClassName="text-[var(--neon-green)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
