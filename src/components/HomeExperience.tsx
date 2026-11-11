import Image from "next/image";
import Link from "next/link";
import { ThingsBuilt } from "./ThingsBuilt";
import { PortfolioCard } from "./PortfolioCard";
import { edits, timeline, INSTAGRAM_URL } from "../data/content";
import { selectedWork } from "../data/selected-work";

export function HomeExperience() {
  return (
    <main id="main-content" className="home-shell">
      <section id="hero" className="portfolio-hero">
        <div className="hero-copy">
          <h1>
            Midhat
            <br />
            Ratib Khan<span className="text-[var(--neon-green)]">.</span>
          </h1>
          <p className="hero-line">
            Developer working across Data, AI and Software.
          </p>
          <div className="hero-links">
            <a className="text-link" href="#work">
              Things I’ve built <span aria-hidden="true">↓</span>
            </a>
            <Link className="text-link" href="/about">
              A little about me <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="hero-portrait">
          <Image
            src="/profile2-hero.webp"
            alt="Midhat Ratib Khan"
            width={800}
            height={1000}
            priority
            sizes="(max-width: 639px) 84vw, (max-width: 1023px) 38vw, 400px"
          />
        </div>
      </section>
      <section id="work" className="home-section">
        <div className="section-heading">
          <h2>Things I’ve built</h2>
          <p>Websites built for organizations. A record of the work.</p>
        </div>
        <ThingsBuilt />
      </section>
      <section id="experiments" className="home-section">
        <div className="section-heading">
          <h2>Experiments</h2>
          <p>Data, model evaluation, and the software around them.</p>
        </div>
        <div className="portfolio-grid">
          {selectedWork.map((project) => (
            <PortfolioCard
              key={project.id}
              title={project.title}
              description={project.summary}
              detail={project.evidence}
              href={"/projects#" + project.id}
            />
          ))}
        </div>
      </section>
      <section id="edits" className="home-section">
        <div className="section-heading">
          <h2>I also cut short-form video</h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Instagram ↗
          </a>
        </div>
        <div className="reel-grid">
          {edits.map((reel) => (
            <a
              href={reel.instagramUrl}
              key={reel.title}
              target="_blank"
              rel="noopener noreferrer"
              className="reel-tile"
            >
              <Image
                src={reel.poster}
                alt={reel.title}
                width={540}
                height={960}
                sizes="(max-width: 767px) 44vw, 250px"
              />
              <span>{reel.title}</span>
            </a>
          ))}
        </div>
        <div className="terminal-story">
          <h3>3 AM terminal</h3>
          <div className="story-beats">
            {timeline.map((beat) => (
              <div key={beat.time}>
                <p className="font-mono text-sm text-zinc-400">{beat.time}</p>
                <p className="mt-3 text-lg text-zinc-200">{beat.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
