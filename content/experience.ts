// Roles, written up as research capability rather than as a job history.
// The figures are exact.

export interface Experience {
  slug: string;
  role: string;
  org: string;
  orgNote: string;
  period: string;
  /** The one sentence worth reading if nothing else is. */
  headline: string;
  metrics: { value: string; label: string }[];
  bullets: string[];
  /** Why this matters for research. Said once, no hedging. */
  whyItMatters: string;
  tags: string[];
}

export const experience: Experience[] = [
  {
    slug: "huawei-powerstar",
    role: "System Engineer, Analytics & AI Automation",
    org: "Huawei Technologies Bangladesh",
    orgNote: "Deployment partner to Robi Axiata",
    period: "July 2024 – April 2026",
    headline:
      "Led the PowerStar 2.0 energy-optimisation deployment across Robi Axiata’s nationwide network, from pilot through permanent rollout, achieving 7.79% network-wide power savings.",
    metrics: [
      { value: "7.79%", label: "network-wide power saving" },
      { value: "National", label: "deployment scope" },
      { value: "4×", label: "Galloping Horse Award" },
    ],
    bullets: [
      "Took the PowerStar 2.0 rollout from pilot to permanent production as project leader, with the saving measured across the live network rather than estimated from a trial.",
      "Applied machine learning to KPI forecasting and anomaly detection over telecom time series at national scale.",
      "Built Python and SQL ETL pipelines integrating LTE and GSM datasets into a single analysable stream.",
      "Recognised with four Galloping Horse Awards (2024–2026), including as PowerStar 2.0 Project Leader and as SEC Rising Star.",
    ],
    whyItMatters:
      "Almost every graduate applicant has coursework and perhaps a paper. Very few have deployed a machine learning system across a national network and then measured what it actually saved. The quiet question behind any application is whether the applicant finishes things that work; this is my answer to it, and it is also where I learned that most of the real difficulty lives in monitoring, drift, and accountability rather than in the model.",
    tags: ["Time series", "Anomaly detection", "Production ML", "Data engineering"],
  },
  {
    slug: "dready-raise-me",
    role: "AI Engineer, sole developer and technical project lead",
    org: "D-Ready",
    orgNote: "United Kingdom, remote",
    period: "April 2026 – present",
    headline:
      "Sole developer of RAISE-Me, a production four-agent LLM platform taken from concept to a working product, with responsible-AI governance implemented against ISO/IEC 42001 and the EU AI Act.",
    metrics: [
      { value: "4", label: "coordinated agents" },
      { value: "3", label: "model providers orchestrated" },
      { value: "ISO 42001", label: "governance implemented" },
    ],
    bullets: [
      "Designed and built four cooperating agents: Evaluate-Me (CV parsing and skills-gap analysis), Train-Me (a personalised tutor with rubric-based assessment), Jobify-Me (orchestration and agent handoffs), and Place-Me (employer matching).",
      "Multi-agent orchestration across OpenAI, Anthropic and Gemini models, with retrieval-augmented generation over vector databases and real-time voice tutoring.",
      "Implemented a responsible-AI regime aligned to ISO/IEC 42001 and the EU AI Act: explainability, bias detection, human-in-the-loop oversight, and audit trails.",
      "Built the evaluation harnesses the system is judged by, rather than relying on vendor benchmarks.",
    ],
    whyItMatters:
      "The governance work is the part I would raise in a funding conversation. AI auditing, safety and compliance is where a great deal of European and UK research money currently sits, and the distinction between having read a compliance framework and having implemented one is not small. I have shipped the audit trails, the bias checks and the human-in-the-loop boundaries, in a system with real users.",
    tags: ["LLM systems", "RAG", "Agentic AI", "AI governance", "Evaluation"],
  },
];

/** Smaller projects. They back up a claim rather than leading. */
export interface Artefact {
  title: string;
  note: string;
  summary: string;
  url?: string;
}

export const artefacts: Artefact[] = [
  {
    title: "Real-Time Bangla Sign Language Translation",
    note: "Ranked 1st of 20 projects, A+",
    summary:
      "Deep learning over holistic body and hand keypoints for sentence-level Bangla sign translation. A second low-resource Bangla project, and a multimodal one, relevant to sign language, accessibility, gesture recognition and multimodal low-resource language technology.",
  },
  {
    title: "ASR Evaluation System",
    note: "Open source",
    summary:
      "WER and CER scoring, text normalisation, and reusable evaluation modules for comparing pretrained Bangla and English speech-recognition models. Evidence that I build evaluation infrastructure and not only models, which is the habit that pairs with the leakage-aware and benchmark-construction work above.",
    url: "https://github.com/saminista7/asr-evaluation-system",
  },
  {
    title: "Autonomous Trading Agentic AI (MVP)",
    note: "Open source",
    summary:
      "A modular agentic workflow with tool invocation, explicit state handling, guardrails and rule-constrained decisions over structured market data. Built to study where an agent should be prevented from acting, not to trade.",
    url: "https://github.com/saminista7/autonomous_trading_agentic_ai_mvp",
  },
];
