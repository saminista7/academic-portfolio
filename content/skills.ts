// Skills, grouped by what he actually does.
//
// Two deliberate decisions here:
//
// No proficiency bars. A bar invents a precision that does not exist, and no
// reader ever learned anything from "Python 85%".
//
// No apologetic caveats either. An earlier draft carried a paragraph explaining
// that C and C++ were only coursework. It was accurate, but it answered a
// question nobody reading a portfolio had asked, and it drew the eye straight to
// the weakest line on the page. Precision belongs in the level text, not in a
// disclaimer: a line says what the experience is, never rounds it up, and never
// apologises for it either.

export interface SkillGroup {
  heading: string;
  /** Each entry states what the level actually is, in a few words. */
  items: { name: string; level: string }[];
}

export const skillGroups: SkillGroup[] = [
  {
    heading: "Research and machine learning",
    items: [
      { name: "PyTorch", level: "Primary research framework" },
      { name: "TensorFlow / Keras", level: "Published work, including the MRI architecture" },
      { name: "Hugging Face Transformers", level: "Fine-tuning for low-resource NLP" },
      { name: "scikit-learn", level: "Feature selection, baselines, evaluation" },
      // Precise rather than defensive: "model training" says framework-level
      // without a paragraph spelling out what it is not.
      { name: "CUDA GPUs", level: "Model training" },
    ],
  },
  {
    heading: "LLM and agent systems",
    items: [
      { name: "Multi-provider orchestration", level: "OpenAI, Anthropic and Gemini in one system" },
      { name: "LangChain", level: "Production multi-agent orchestration" },
      { name: "FAISS / ChromaDB", level: "Retrieval-augmented generation over vector stores" },
      { name: "Evaluation harnesses", level: "Built, not borrowed" },
      { name: "Responsible-AI governance", level: "Implemented to ISO/IEC 42001 and the EU AI Act" },
    ],
  },
  {
    heading: "Languages and data",
    items: [
      { name: "Python", level: "Primary working language, daily and professionally" },
      { name: "SQL", level: "Production ETL over telecom datasets" },
      { name: "TypeScript / JavaScript", level: "Application and tooling work" },
      { name: "Java, C/C++", level: "Degree and project work" },
      { name: "PostgreSQL / MySQL / MongoDB", level: "Application and analytics workloads" },
      { name: "LaTeX", level: "All papers and this CV" },
    ],
  },
  {
    heading: "Engineering and deployment",
    items: [
      { name: "FastAPI", level: "Services backing production systems" },
      { name: "Docker", level: "Packaging and deployment" },
      { name: "Google Cloud Platform", level: "Hosting and managed services" },
      { name: "Git", level: "Daily" },
      { name: "Production ML monitoring", level: "National-scale telecom deployment" },
    ],
  },
];

export interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  detail: string;
  kind: "education" | "award" | "role" | "test";
}

export const timeline: TimelineEntry[] = [
  {
    period: "April 2026 – present",
    title: "AI Engineer",
    org: "D-Ready, United Kingdom (remote)",
    detail:
      "Sole developer and technical project lead on RAISE-Me, a four-agent production LLM platform.",
    kind: "role",
  },
  {
    period: "2024 – 2026",
    title: "Galloping Horse Award, four times",
    org: "Huawei Technologies",
    detail:
      "Including as PowerStar 2.0 Project Leader and as SEC Rising Star. Huawei’s internal recognition for delivered project outcomes.",
    kind: "award",
  },
  {
    period: "July 2024 – April 2026",
    title: "System Engineer, Analytics & AI Automation",
    org: "Huawei Technologies Bangladesh",
    detail:
      "Led the PowerStar 2.0 nationwide energy-optimisation deployment across Robi Axiata’s network; 7.79% network-wide power savings.",
    kind: "role",
  },
  {
    period: "2024",
    title: "IELTS Academic, overall 7.0",
    org: "British Council",
    detail: "Meets the English-language requirement for graduate admission in the UK, EU and USA.",
    kind: "test",
  },
  {
    period: "February 2020 – April 2024",
    title: "B.Sc. in Computer Science and Engineering",
    org: "Ahsanullah University of Science and Technology (AUST)",
    detail:
      "CGPA 3.48 / 4.00. Undergraduate thesis on emoji-aware Bengali sarcasm detection, supervised by Ms. Tahsin Aziz, subsequently published at ICCIT 2025 (IEEE).",
    kind: "education",
  },
  {
    period: "2023",
    title: "Real-Time Bangla Sign Language Translation, ranked 1st of 20",
    org: "AUST",
    detail: "Graded A+. Sentence-level sign translation from holistic body and hand keypoints.",
    kind: "award",
  },
];
