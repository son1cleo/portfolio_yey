import type { ReactNode } from "react";
import Link from "next/link";

export function PortfolioCard({
  id,
  title,
  description,
  detail,
  href,
  children,
  actions,
  headingLevel = 3,
  className = "",
}: {
  id?: string;
  title: string;
  description: string;
  detail?: string;
  href?: string;
  children?: ReactNode;
  actions?: ReactNode;
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article id={id} className={"portfolio-card " + className}>
      <Heading>{title}</Heading>
      <p className="mt-4 text-zinc-300 leading-relaxed">{description}</p>
      {children}
      <div className="card-bottom">
        {detail && <p className="text-sm text-[var(--neon-green)]">{detail}</p>}
        {actions}
        {href && (
          <Link href={href} className="text-link">
            Read the build <span aria-hidden="true">↗</span>
          </Link>
        )}
      </div>
    </article>
  );
}
