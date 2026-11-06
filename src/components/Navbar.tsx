"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Menu, X } from "lucide-react";
import { INSTAGRAM_URL } from "../data/content";

const navLinks = [{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/projects", label: "Projects" }, { href: "/contact", label: "Contact" }];

export function Navbar() {
  const [isFloating, setIsFloating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const onScroll = () => setIsFloating(window.scrollY > 48);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`site-header sticky top-0 z-50 mx-auto flex w-full max-w-6xl items-center justify-between gap-3 border border-transparent backdrop-blur-md transition-colors ${isFloating || menuOpen ? "border-white/10 bg-[#0a0a0a]/95" : "bg-[#0a0a0a]/80"}`}>
      <Link href="/" aria-label="Midhat Ratib Khan — home" onClick={() => setMenuOpen(false)} className="grid size-11 shrink-0 place-items-center rounded-xl focus-visible:outline-offset-2">
        <Image src="/logo.svg" alt="" width={36} height={36} priority className="size-9" />
      </Link>
      <nav aria-label="Main navigation" className="hidden items-center justify-center gap-1 md:flex sm:gap-2">{navLinks.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition ${pathname === link.href ? "bg-white/12 text-white" : "text-white/55 hover:text-white"}`}>{link.label}</Link>)}</nav>
      <div className="flex items-center gap-1 sm:gap-2">
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hidden size-11 place-items-center rounded-full text-zinc-300 hover:text-white md:grid"><Instagram size={16} /></a>
        <a href={pathname === "/" ? "#contact" : "/#contact"} className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 font-mono text-[11px] uppercase tracking-wide transition hover:border-white/40">Contact</a>
        <button type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)} className="grid size-11 place-items-center rounded-full border border-white/15 text-zinc-200 transition-colors hover:border-white/35 hover:text-white md:hidden">
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute inset-x-0 top-full border-y border-white/10 bg-[#0a0a0a] p-3 md:hidden">
          <div className="grid gap-1">
            {navLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} aria-current={pathname === link.href ? "page" : undefined} className={`flex min-h-12 items-center justify-between rounded-xl px-4 text-base ${pathname === link.href ? "bg-white/10 text-white" : "text-zinc-300 hover:bg-white/5 hover:text-white"}`}><span>{link.label}</span>{pathname === link.href && <span className="font-mono text-xs text-[var(--neon-green)]">Current</span>}</Link>)}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-3 rounded-xl px-4 text-base text-zinc-300 hover:bg-white/5 hover:text-white"><Instagram size={17} /> Instagram</a>
          </div>
        </nav>
      )}
    </header>
  );
}
