"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("Portfolio inquiry");
  const [message, setMessage] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const mailtoLink = useMemo(() => {
    const body = [
      message || "I visited your portfolio and would like to connect.",
      "",
      name ? `Sender: ${name}` : "",
    ].join("\n");

    return `mailto:midhat.ratib@gmail.com?subject=${encodeURIComponent(
      subject || "Portfolio inquiry"
    )}&body=${encodeURIComponent(body)}`;
  }, [message, name, subject]);

  return (
    <main className="page-shell max-w-5xl">
      <motion.section
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="panel"
      >
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/50">Contact</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <h1 className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Let&apos;s talk data
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-300">
              For data science roles, LLM evaluation, or a product built around data, send me a note.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://github.com/son1cleo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 font-mono text-sm font-medium text-white transition hover:bg-white/10"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/midhat-ratib-khan-9969012bb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 font-mono text-sm font-medium text-white transition hover:bg-white/10"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href={mailtoLink}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 font-mono text-sm font-medium text-white transition hover:bg-white/10"
              >
                <Mail size={16} className="shrink-0" /> <span className="break-all">midhat.ratib@gmail.com</span>
              </a>
            </div>
          </div>

          <form className="grid gap-3" onSubmit={(event) => event.preventDefault()}>
            <label className="grid gap-1 font-mono text-xs tracking-wide text-zinc-300 uppercase">
              Your Name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="min-w-0 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/50"
                placeholder="Name"
              />
            </label>
            <label className="grid gap-1 font-mono text-xs tracking-wide text-zinc-300 uppercase">
              Subject
              <input
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className="min-w-0 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/50"
                placeholder="Subject"
              />
            </label>
            <label className="grid gap-1 font-mono text-xs tracking-wide text-zinc-300 uppercase">
              Message
              <textarea
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="min-w-0 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/50"
                placeholder="I visited your portfolio and would like to connect."
              />
            </label>

            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href={mailtoLink}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 font-mono text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-zinc-200"
              >
                <Mail size={15} /> Compose email
              </a>
            </div>
          </form>
        </div>
      </motion.section>
    </main>
  );
}
