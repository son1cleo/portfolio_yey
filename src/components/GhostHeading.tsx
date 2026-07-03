type GhostHeadingProps = {
  text: string;
  as?: "h2" | "h3";
  className?: string;
};

export function GhostHeading({ text, as = "h2", className = "" }: GhostHeadingProps) {
  const Tag = as;

  return (
    <div className={`ghost-heading ${className}`}>
      <Tag className="ghost-heading-main">{text}</Tag>
      <span className="ghost-heading-echo" aria-hidden="true">
        {text}
      </span>
    </div>
  );
}
