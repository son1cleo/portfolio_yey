import { DataBriefCaseStudy } from "../../components/DataBriefCaseStudy";
import { PortfolioCard } from "../../components/PortfolioCard";
import { ThingsBuilt } from "../../components/ThingsBuilt";
import { evaluationWork } from "../../data/evaluation-work";
import { selectedWork } from "../../data/selected-work";
import { EvaluationFigure } from "../../components/EvaluationFigure";
type ProjectItem = {
  title: string;
  summary: string;
  tag: "Project" | "Contribution";
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
};

const workItems: ProjectItem[] = [
  {
    title: "SouthForge",
    summary:
      "Built an offline-first browser IDE with local AI, in-browser execution, workspace persistence, and terminal-driven Git flows.",
    tag: "Project",
    stack: ["React", "Vite", "Monaco", "WebContainers", "WebLLM", "IndexedDB"],
    liveUrl: "https://offlineide.vercel.app/",
    repoUrl: "https://github.com/son1cleo/offlineide",
  },
  {
    title: "SchedulEase",
    summary:
      "A Flutter-based web app built for streamlined scheduling and planning workflows.",
    tag: "Project",
    stack: ["Flutter", "Dart", "Web App"],
    repoUrl: "https://github.com/son1cleo/SchedulEase",
  },
  {
    title: "IEEE Web Automation",
    summary:
      "Built and deployed a Django-based web mail automation service to improve operational flow for IEEE NSU Student Chapter.",
    tag: "Project",
    stack: ["Django", "Python", "Automation", "Web Infrastructure"],
  },
];

export default function ProjectsPage() {
  return (
    <main id="main-content" className="page-shell projects-page">
      <header className="page-intro">
        <h1>Selected projects</h1>
        <p>Analysis, model evaluation, and the software I built around them.</p>
      </header>
      <DataBriefCaseStudy />
      <section aria-label="AI evaluation work" className="case-studies">
        {evaluationWork.map((study) => {
          const project = selectedWork.find((item) => item.id === study.id)!;
          return (
            <PortfolioCard
              key={study.id}
              id={study.id}
              title={project.title}
              description={project.summary}
              headingLevel={2}
              detail={project.evidence}
            >
              <dl className="study-details">
                {[
                  { label: "Problem", text: study.problem },
                  { label: "My contribution", text: study.contribution },
                  { label: "Evaluation approach", text: study.method },
                  { label: "Outcome", text: study.outcome },
                  { label: "Tools and methods", text: study.tools },
                ].map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.text}</dd>
                  </div>
                ))}
              </dl>
              <EvaluationFigure id={study.id} />
            </PortfolioCard>
          );
        })}
      </section>
      <section className="project-section">
        <h2>Things I’ve built</h2>
        <div className="mt-8">
          <ThingsBuilt />
        </div>
      </section>
      <section className="project-section">
        <h2>More engineering work</h2>
        <div className="portfolio-grid mt-8">
          {workItems.map((item) => (
            <PortfolioCard
              key={item.title}
              title={item.title}
              description={item.summary}
              detail={item.stack.join(" · ")}
              actions={
                <div className="project-links">
                  {item.liveUrl && (
                    <a
                      className="text-link"
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live ↗
                    </a>
                  )}
                  {item.repoUrl && (
                    <a
                      className="text-link"
                      href={item.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Repo ↗
                    </a>
                  )}
                </div>
              }
            />
          ))}
        </div>
      </section>
    </main>
  );
}
