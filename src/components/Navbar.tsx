"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram } from "lucide-react";
import { INSTAGRAM_URL } from "../data/content";

const navLinks = [{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/projects", label: "Projects" }, { href: "/contact", label: "Contact" }];

export function Navbar() {
  const [isFloating, setIsFloating] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const onScroll = () => setIsFloating(window.scrollY > 48);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`site-header sticky top-0 z-50 mx-auto flex w-full max-w-6xl items-center justify-between gap-3 border border-transparent backdrop-blur-md transition-colors ${isFloating ? "border-white/10 bg-[#0a0a0a]/95" : "bg-[#0a0a0a]/80"}`}>
      <Link href="/" className="shrink-0 text-sm font-semibold tracking-tight text-[var(--neon-green)]">Midhat Ratib Khan</Link>
      <nav aria-label="Main navigation" className="hidden items-center justify-center gap-1 md:flex sm:gap-2">{navLinks.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition ${pathname === link.href ? "bg-white/12 text-white" : "text-white/55 hover:text-white"}`}>{link.label}</Link>)}</nav>
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-wide text-white/60 lg:flex"><i className="size-1.5 rounded-full bg-[var(--neon-green)]" />Available for projects</span>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full text-zinc-300 hover:text-white"><Instagram size={16} /></a>
        <a href={pathname === "/" ? "#contact" : "/#contact"} className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 font-mono text-[11px] uppercase tracking-wide transition hover:border-white/40">Contact</a>
      </div>
    </header>
  );
}
