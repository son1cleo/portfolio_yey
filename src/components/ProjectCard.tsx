"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export type ProjectItem = {
  title: string;
  summary: string;
  tag: "Project" | "Contribution";
  stack: string[];
  image?: string;
  repoUrl?: string;
  liveUrl?: string;
};

export function ProjectCard({ item, index }: { item: ProjectItem; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(item.image) && !imageFailed;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.015] shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-200 hover:-translate-y-1 hover:border-teal-400/30">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-black/30">
        {showImage ? (
          <Image
            src={item.image as string}
            alt={item.title}
            fill
            loading="lazy"
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-400/15 via-white/5 to-black/40">
            <span className="font-serif text-4xl font-bold text-white/25">{item.title.charAt(0)}</span>
          </div>
        )}
        <span
          className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-teal-300 backdrop-blur-sm"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] text-zinc-200 backdrop-blur-sm">
          {item.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h4 className="text-sm font-medium text-white sm:text-base">{item.title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-white/20 bg-black/30 px-2 py-0.5 text-[10px] text-zinc-300">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white"
            >
              Live <ArrowUpRight size={13} />
            </a>
          )}
          {item.repoUrl && (
            <a
              href={item.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white"
            >
              Repo <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
