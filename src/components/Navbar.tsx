"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (menuOpen) {
      dialog?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
        dialog?.close();
      };
    }
    dialog?.close();
  }, [menuOpen]);
  const close = () => {
    setMenuOpen(false);
    buttonRef.current?.focus();
  };
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="header-inner">
        <Link
          href="/"
          aria-label="Midhat Ratib Khan home"
          className="brand-link"
        >
          <Image src="/logo.svg" alt="" width={34} height={34} priority />
          <span>RatibBuilds</span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          ref={buttonRef}
          type="button"
          aria-label="Open navigation"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(true)}
          className="menu-toggle"
        >
          <Menu size={21} />
        </button>
        <dialog
          ref={dialogRef}
          id="mobile-navigation"
          className="mobile-menu"
          onCancel={close}
          aria-labelledby="menu-title"
        >
          <div className="mobile-menu-top">
            <span id="menu-title">RatibBuilds</span>
            <button
              type="button"
              onClick={close}
              aria-label="Close navigation"
              className="menu-close"
            >
              <X size={24} />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p>Personal portfolio. No services offered.</p>
        </dialog>
      </div>
    </header>
  );
}
