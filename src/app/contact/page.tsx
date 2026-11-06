import { Github, Instagram, Linkedin } from "lucide-react";
import { EMAIL, GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL, X_URL } from "../../data/content";

export default function ContactPage() {
  const linkClass = "inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-zinc-200 transition-colors duration-200 hover:border-white/35 hover:text-white";

  return (
    <main className="page-shell max-w-5xl">
      <section className="border-y border-white/15 py-16 sm:py-24">
        <h1 className="font-display text-[clamp(2.75rem,8vw,6rem)] leading-[.95] tracking-[-.03em] text-white">Get in touch</h1>
        <a href={`mailto:${EMAIL}`} className="contact-email mt-8 inline-block min-h-11 break-all font-display text-[clamp(1.75rem,5vw,3.75rem)] leading-tight">{EMAIL}</a>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={linkClass}><Instagram size={16} /> Instagram</a>
          <a href={X_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>X</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={linkClass}><Github size={16} /> GitHub</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkClass}><Linkedin size={16} /> LinkedIn</a>
        </div>
      </section>
    </main>
  );
}
