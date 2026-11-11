export function EvaluationFigure({ id }: { id: string }) {
  const routing = id === "portehobe-ai";
  const steps = routing
    ? ["Question", "Router", "Specialist model", "Judge"]
    : [
        "Physics question",
        "Model response",
        "Statistical + semantic checks",
        "Error analysis",
      ];
  return (
    <figure className="evaluation-figure">
      <div
        className="evaluation-flow"
        role="img"
        aria-label={steps.join(" to ")}
      >
        {steps.map((step, index) => (
          <div key={step}>
            <span>{step}</span>
            {index < steps.length - 1 && (
              <span aria-hidden="true" className="flow-arrow">
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <figcaption>
        {routing
          ? "The Router → Specialist → Judge architecture used to evaluate mathematical reasoning."
          : "The evaluation workflow used to identify recurring errors across 14 physics chapters."}
      </figcaption>
    </figure>
  );
}
