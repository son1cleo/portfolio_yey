"use client";
import Image from "next/image";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { previousWebWork } from "../data/content";

export function ThingsBuilt() {
  return (
    <div className="build-log">
      <div className="build-log-label font-mono">
        <span>~/portfolio/builds</span>
        <span>4 entries</span>
      </div>
      <Accordion type="single" collapsible>
        {previousWebWork.map((site, index) => (
          <AccordionItem key={site.id} value={site.id}>
            <AccordionTrigger className="build-trigger">
              <span className="build-number font-mono">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="build-name">{site.name}</span>
              <span className="build-org">{site.org}</span>
              <span className="build-stack font-mono">
                {site.chips.join(" / ")}
              </span>
              <span className="build-state">
                {site.live && (
                  <span className="live-status">
                    <i />
                    live
                  </span>
                )}
                <ChevronDown size={18} className="build-chevron" />
              </span>
            </AccordionTrigger>
            <AccordionContent className="build-content">
              <div className="build-content-inner">
                <Image
                  src={site.image}
                  alt={site.alt}
                  width={1440}
                  height={900}
                  sizes="(max-width: 767px) 88vw, 1040px"
                  className="build-screenshot"
                />
                <div className="build-note">
                  <p>{site.challenge}</p>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    View website <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
