export const evaluationWork = [
  {
    id: "portehobe-ai",
    problem: "Mathematical tutoring needs reliable reasoning across different question types. PorteHobe explores routing questions between specialist models and evaluating their answers.",
    contribution: "Co-built a Router → Specialist → Judge architecture and led GSM8K evaluation. The system used Qwen 2.5, Mathstral, Gemma3, and the Gemini API.",
    method: "Benchmarked mathematical reasoning against Mathstral and Gemini, then refined model routing and prompts using the evaluation results.",
    outcome: "A 15% improvement in reasoning accuracy over the baseline, as reported in my project evaluation.",
    tools: "GSM8K, LangGraph, FastAPI, React, TypeScript",
  },
  {
    id: "physics-chatbot",
    problem: "A physics chatbot can produce plausible answers while repeatedly missing particular concepts. The evaluation focused on identifying those systematic weaknesses.",
    contribution: "Evaluated more than 6,000 question-answer pairs across 14 physics chapters.",
    method: "Used statistical and semantic evaluation to examine model responses, identify recurring weaknesses, and guide targeted refinements.",
    outcome: "The evaluation informed targeted refinements that improved overall chatbot accuracy.",
    tools: "spaCy, statistical analysis, semantic evaluation, question-level benchmarking",
  },
];
