"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ROUTE_ORDER = ["/", "/about", "/projects", "/contact"];

function getRouteIndex(pathname: string) {
  const index = ROUTE_ORDER.indexOf(pathname);
  return index === -1 ? ROUTE_ORDER.length : index;
}

const slideVariants = {
  initial: (direction: number) => ({ opacity: 0, x: direction * 48 }),
  animate: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -48 }),
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const currentIndex = getRouteIndex(pathname);
  const [trackedIndex, setTrackedIndex] = useState(currentIndex);
  const [direction, setDirection] = useState(1);

  if (trackedIndex !== currentIndex) {
    setDirection(currentIndex >= trackedIndex ? 1 : -1);
    setTrackedIndex(currentIndex);
  }

  return (
    <AnimatePresence mode="wait" custom={direction} initial={false}>
      <motion.div
        key={pathname}
        custom={direction}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-x-clip"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
