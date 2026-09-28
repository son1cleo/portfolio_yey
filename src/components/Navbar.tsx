"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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


  useEffect(() => {
    const onScroll = () => setIsFloating(window.scrollY > FLOAT_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header sticky top-0 z-50 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-4 border border-transparent backdrop-blur-md transition-colors md:justify-between ${isFloating ? "bg-[#0a0a0a]/95 border-white/10" : "bg-[#0a0a0a]/80"}`}>
      <Link href="/" className="shrink-0 text-sm font-semibold tracking-tight text-[var(--neon-green)]">
        Midhat Ratib Khan
      </Link>

      <nav aria-label="Main navigation" className="flex w-full items-center justify-center gap-1 md:w-auto sm:gap-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition sm:px-3 sm:text-xs ${
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
        className="hidden shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-white transition hover:bg-white/10 md:inline-flex"
      >
        Resume <Download size={12} />
      </a>
    </header>
  );
}
