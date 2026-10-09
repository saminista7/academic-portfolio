// Skills at their TRUE level. The canonical profile is emphatic about this, and it is
// also the most credible thing on the page: a reader who discovers at interview that
// the experience went less far than the website claimed is the one outcome worth more
// than a slightly stronger sentence.
//
// Deliberately no proficiency bars. A bar invents a precision that does not exist.

export interface SkillGroup {
  heading: string;
  /** Each entry states what the level actually is. */
  items: { name: string; level: string }[];
  /** An honest caveat rendered beneath the group, where one is owed. */
  caveat?: string;
}

export const skillGroups: SkillGroup[] = [
  {
    heading: "Languages",
    items: [
      { name: "Python", level: "Primary working language: daily, professionally, two years" },
      { name: "SQL", level: "Production ETL over telecom datasets" },
      { name: "TypeScript / JavaScript", level: "Application and tooling work" },
      { name: "Java", level: "Degree and project work" },
      { name: "C / C++", level: "Degree coursework at AUST" },
      { name: "LaTeX", level: "All papers and this CV" },
    ],
    caveat:
      "C and C++ are at the level of my degree coursework, structured programming and related units, rather than research or production systems work. I would not want a systems or HPC group to read more into that line than is there.",
  },
  {
    heading: "Machine learning",
    items: [
      { name: "PyTorch", level: "Primary research framework" },
      { name: "TensorFlow / Keras", level: "Published work, including the MRI architecture" },
      { name: "scikit-learn", level: "Feature selection, baselines, evaluation" },
      { name: "Hugging Face Transformers", level: "Fine-tuning for low-resource NLP" },
      { name: "CUDA GPUs", level: "Model training through frameworks, not kernel programming" },
    ],
    caveat:
      "On CUDA, precisely: I have trained deep learning models on CUDA GPUs, including the brain-tumour MRI work. That is using the hardware through a framework. I have not written CUDA kernels, and I would not claim GPU programming experience.",
  },
  {
    heading: "LLM and agent systems",
    items: [
      { name: "LangChain", level: "Production multi-agent orchestration" },
      { name: "FAISS / ChromaDB", level: "Retrieval-augmented generation over vector stores" },
      { name: "Multi-provider orchestration", level: "OpenAI, Anthropic and Gemini in one system" },
      { name: "Evaluation harnesses", level: "Built, not borrowed" },
      { name: "Responsible-AI governance", level: "Implemented to ISO/IEC 42001 and EU AI Act" },
    ],
  },
  {
    heading: "Data and infrastructure",
    items: [
      { name: "PostgreSQL / MySQL / MongoDB", level: "Application and analytics workloads" },
      { name: "FastAPI", level: "Services backing production systems" },
      { name: "Docker", level: "Packaging and deployment" },
      { name: "Google Cloud Platform", level: "Hosting and managed services" },
      { name: "Git", level: "Daily" },
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
