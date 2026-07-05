"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { ROUTE_ORDER, getRouteIndex } from "../lib/routeOrder";

const COOLDOWN_MS = 900;
const EDGE_THRESHOLD = 4;

export function ScrollNavigator() {
  const pathname = usePathname();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const lockedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const index = getRouteIndex(pathname);
    if (index >= ROUTE_ORDER.length) return;

    const onWheel = (event: WheelEvent) => {
      if (lockedRef.current) return;

      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - EDGE_THRESHOLD;
      const atTop = window.scrollY <= EDGE_THRESHOLD;

      let nextRoute: string | undefined;
      if (event.deltaY > 0 && atBottom && index < ROUTE_ORDER.length - 1) {
        nextRoute = ROUTE_ORDER[index + 1];
      } else if (event.deltaY < 0 && atTop && index > 0) {
        nextRoute = ROUTE_ORDER[index - 1];
      }

      if (!nextRoute) return;

      lockedRef.current = true;
      router.push(nextRoute);
      window.setTimeout(() => {
        lockedRef.current = false;
      }, COOLDOWN_MS);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [pathname, router, prefersReducedMotion]);

  return null;
}
