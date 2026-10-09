// Canonical facts. Source of truth is backend/profile/applicant_profile.md in the
// Samin-Automailer repo plus Academic CV 6.0. Nothing here is inferred, rounded up,
// or softened. If a fact changes, it changes here and nowhere else.

export const profile = {
  name: "Ahnaf Samin",
  // The profile file is emphatic: he is a GRADUATE. Never "undergraduate",
  // never "final-year student", never "computer engineer".
  title: "AI Engineer and Researcher",
  positioning:
    "Deep learning for low-resource languages, medical imaging, and the critical infrastructure where a model’s failure actually costs something.",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka (UTC+6)",
  email: "ahnaf.samin7@gmail.com",
  orcid: "0009-0004-1047-6632",
  links: {
    orcid: "https://orcid.org/0009-0004-1047-6632",
    scholar: "https://scholar.google.com/citations?user=47pPaFUAAAAJ",
    github: "https://github.com/saminista7",
    linkedin: "https://www.linkedin.com/in/ahnafsaminbd7/",
  },
  cvFile: "/Ahnaf_Samin_Academic_CV_6.0.pdf",
  cvVersion: "6.0",
  siteUrl: "https://ahnaf-samin-academic.vercel.app",

  degree: {
    award: "B.Sc. in Computer Science and Engineering",
    institution: "Ahsanullah University of Science and Technology (AUST)",
    period: "February 2020 – April 2024",
    cgpa: "3.48 / 4.00",
    conferred: 2024,
  },
  ielts: "7.0",

  // The ask, stated the way the profile insists on: funding is the hard
  // requirement, the programme is not.
  objective: {
    cycle: "Fall 2027",
    levels: "MSc, PhD, or combined MSc+PhD",
    line: "Seeking a fully funded graduate place for Fall 2027. An MSc, a PhD, or a combined programme are all valid outcomes. Full funding is the hard requirement, the degree title is not.",
  },

  // The status strip under the hero. Kept to three facts a reader can check.
  statusStrip: [
    "CSE graduate, AUST (2024)",
    "3 peer-reviewed publications",
    "2+ years industry ML",
  ],

  researchInterests: [
    "NLP for low-resource languages, with a focus on Bengali",
    "Deep learning for medical image analysis",
    "Applied ML for time-series forecasting, anomaly detection, and critical-infrastructure security",
    "Large language models, retrieval-augmented generation, and multi-agent AI systems",
  ],
} as const;

// The research statement. Prose, not a skills list — a panel funds a direction.
export const researchStatement = {
  lead: "I work on deep learning in the three conditions that make it hard to do honestly: when the data is scarce, when the system is already deployed, and when being wrong has a cost.",
  paragraphs: [
    "Those three conditions have shaped every project I have published. Bengali has roughly 230 million speakers and almost no annotated corpora for figurative language, so for my undergraduate thesis I built the dataset before I could build the model: 2,649 emoji-aware sentences, released publicly, because the benchmark was the contribution as much as the classifier that followed it.",
    "Medical imaging taught me the opposite lesson about size. A 4-class brain-tumour MRI task does not need a large network; it needs a small one evaluated carefully. The architecture I conceived for that work reaches 96.05% accuracy with roughly 1.46 million parameters. The part I would defend first is not the accuracy but the limitations section: the source collection carries no patient identifiers, so we could not split patient-wise, and we said so rather than letting the number stand unqualified. An inflated figure on a medical task is worse than no figure.",
    "Smart-grid SCADA brought both problems together with a consequence attached. Intrusion detection on power-system telemetry is a severely imbalanced multivariate time-series problem where a false negative is a compromised substation. My first-author paper in Scientific Reports pairs mutual-information feature selection with a CNN-Transformer-BiGRU hybrid and ADASYN balancing, reaching 0.94 ROC-AUC on the MSU power-system benchmark.",
    "Between those papers I spent two years deploying machine learning across a national telecommunications network, which is where I learned what the literature does not report: that most of the difficulty is in monitoring, drift, and the question of who is accountable when the model is wrong. That question is now the one I most want to work on formally.",
  ],
  questions: [
    "How do we build and evaluate language technology for low-resource languages without importing the evaluation assumptions of English NLP wholesale?",
    "What does a genuinely leakage-free, reproducible evaluation protocol look like for medical imaging models that are small enough to deploy at the point of care?",
    "How should anomaly detection on critical infrastructure be audited, not just measured, so that an operator can act on an alert and a regulator can review the decision afterwards?",
  ],
} as const;
