"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const FLOAT_THRESHOLD = 48;

export function Navbar() {
  const [isFloating, setIsFloating] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsFloating(window.scrollY > FLOAT_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={
        isFloating
          ? {
              top: "0.9rem",
              maxWidth: "42rem",
              borderRadius: 9999,
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
              paddingTop: "0.65rem",
              paddingBottom: "0.65rem",
              backgroundColor: "rgba(10, 10, 10, 0.78)",
              borderColor: "rgba(255, 255, 255, 0.14)",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.55)",
            }
          : {
              top: "0rem",
              maxWidth: "72rem",
              borderRadius: 0,
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              paddingTop: "1.35rem",
              paddingBottom: "1.35rem",
              backgroundColor: "rgba(10, 10, 10, 0)",
              borderColor: "rgba(255, 255, 255, 0)",
              boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            }
      }
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 z-50 flex w-full -translate-x-1/2 items-center justify-between border backdrop-blur-md"
    >
      <Link href="/" className="neon-brand shrink-0 font-mono text-sm font-semibold tracking-tight">
        son1cleo
      </Link>

      <nav className="flex items-center gap-1 sm:gap-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition sm:px-3 sm:text-xs ${
                isActive ? "bg-white/12 text-white" : "text-white/55 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <a
        href="/resume/MidhatRatibCV_DS.pdf"
        download
        className="hidden shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-white transition hover:bg-white/10 sm:inline-flex"
      >
        Resume <Download size={12} />
      </a>
    </motion.header>
  );
}
