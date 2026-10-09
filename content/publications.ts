// Every publication record. Author lists, DOIs and metrics are exact — a dead DOI or a
// rounded metric on an academic site costs more than a missing one.

export type PublicationKind = "journal" | "conference" | "dataset";

export interface Metric {
  value: string;
  label: string;
}

export interface Publication {
  slug: string;
  kind: PublicationKind;
  title: string;
  authors: string[];
  /** Zero-based index of Ahnaf Samin in `authors`, so the UI can emphasise it. */
  selfIndex: number;
  venue: string;
  /** What the venue means to a reader who does not know it. */
  venueNote: string;
  year: number;
  date: string;
  doi: string;
  url: string;
  /** Secondary links — publisher mirrors, datasets, code. */
  extraLinks?: { label: string; url: string }[];
  topics: string[];
  /** One sentence, in the first person, on what he actually did. */
  contribution: string;
  /** Short abstract-style summary for the detail page. */
  summary: string;
  metrics: Metric[];
  methods: string[];
  bibtex: string;
  /** Which hand-drawn architecture diagram the detail page renders, if any. */
  diagram?: "scada" | "prudensnet" | "sarcasm";
  /** Longer prose for the detail page: the method, honestly described. */
  detail?: { heading: string; body: string }[];
}

export const publications: Publication[] = [
  {
    slug: "scada-intrusion-detection",
    kind: "journal",
    title:
      "Hybrid deep learning for smart grid SCADA intrusion detection with mutual information feature selection for smart meter data analysis",
    authors: ["Ahnaf Samin", "and seven co-authors"],
    selfIndex: 0,
    venue: "Scientific Reports",
    venueNote: "Nature Portfolio",
    year: 2026,
    date: "14 September 2026",
    doi: "10.1038/s41598-026-70577-4",
    url: "https://doi.org/10.1038/s41598-026-70577-4",
    extraLinks: [
      { label: "Nature.com", url: "https://www.nature.com/articles/s41598-026-70577-4" },
    ],
    topics: ["Critical infrastructure", "Time series", "Anomaly detection"],
    contribution:
      "First author of eight. I designed the hybrid architecture and the feature-selection stage, and ran the benchmark evaluation.",
    summary:
      "Intrusion detection on power-system SCADA telemetry is a severely imbalanced multivariate time-series problem, and the imbalance is the part most published results quietly work around. This paper pairs mutual-information feature selection with a CNN-Transformer-BiGRU hybrid and ADASYN class balancing, and reports 0.94 ROC-AUC on the public MSU power-system benchmark.",
    metrics: [
      { value: "0.94", label: "ROC-AUC on the MSU benchmark" },
      { value: "1st", label: "of eight authors" },
    ],
    methods: [
      "Multivariate time-series modelling",
      "Temporal anomaly detection",
      "Transformer and recurrent hybrids",
      "Mutual-information feature selection",
      "Class imbalance under ADASYN",
      "Public benchmark evaluation",
    ],
    diagram: "scada",
    detail: [
      {
        heading: "Why the feature selection comes first",
        body: "SCADA telemetry arrives as a wide, highly correlated sensor stream, and feeding all of it to a deep model buys capacity spent on redundancy. Mutual information ranks each feature against the attack label without assuming a linear relationship, which matters here because the informative signals in a false-data-injection event are not linearly separable from normal load variation. Selecting before modelling made the downstream network smaller and the result easier to attribute to the architecture rather than to the feature count.",
      },
      {
        heading: "Why three blocks and not one",
        body: "The three stages do different jobs, and the ablation is what justifies keeping all three. The 1D convolutional front end extracts local waveform shape within a short window. The transformer block attends across the full window, so a relationship between two distant timesteps does not have to survive a recurrence to be seen. The BiGRU then reads the attended sequence in both directions, which is legitimate here because detection is performed over a completed window rather than strictly online.",
      },
      {
        heading: "The imbalance, stated plainly",
        body: "Attack classes in the MSU benchmark are a small minority, and accuracy on an imbalanced detection task is close to meaningless, since a model that predicts normal everywhere scores well. ADASYN synthesises minority examples preferentially in the regions the classifier finds hardest, and ROC-AUC is reported rather than accuracy for exactly this reason. Balancing is applied inside the training split only; applying it before the split is the most common way this kind of result gets inflated.",
      },
    ],
    bibtex: [
      "@article{samin2026scada,",
      "  title   = {Hybrid deep learning for smart grid SCADA intrusion detection with",
      "             mutual information feature selection for smart meter data analysis},",
      "  author  = {Samin, Ahnaf and others},",
      "  journal = {Scientific Reports},",
      "  year    = {2026},",
      "  doi     = {10.1038/s41598-026-70577-4},",
      "  url     = {https://doi.org/10.1038/s41598-026-70577-4}",
      "}",
    ].join("\n"),
  },
  {
    slug: "bengali-sarcasm-emoji",
    kind: "conference",
    title:
      "Emoji-Infused Bengali Sarcasm and Offensive Language Analysis: A Novel Approach to Context-Aware Text Understanding",
    authors: ["Ahnaf Samin", "and co-authors"],
    selfIndex: 0,
    venue: "ICCIT 2025",
    venueNote: "IEEE",
    year: 2025,
    date: "2025",
    doi: "10.1109/ICCIT68739.2025.11491479",
    url: "https://doi.org/10.1109/ICCIT68739.2025.11491479",
    extraLinks: [
      { label: "IEEE Xplore", url: "https://ieeexplore.ieee.org/document/11491479" },
      { label: "AUST-Sarc dataset", url: "https://doi.org/10.17632/7ryvn5gw88.2" },
    ],
    topics: ["Low-resource NLP", "Bengali", "Datasets"],
    contribution:
      "First author. This was my undergraduate thesis at AUST, supervised by Ms. Tahsin Aziz, taken from dataset construction through to IEEE publication.",
    summary:
      "Bengali has roughly 230 million speakers and almost no annotated resources for figurative language, so the dataset had to be built before the model. AUST-Sarc is a public 2,649-sentence emoji-aware Bangla corpus; on it, mBERT with K-fold cross-validation reaches 97.82% on sarcasm detection and a BiLSTM baseline reaches 91.3%.",
    metrics: [
      { value: "97.82%", label: "mBERT, K-fold, sarcasm" },
      { value: "2,649", label: "sentences released publicly" },
    ],
    methods: [
      "Dataset and benchmark construction",
      "Annotation protocol design",
      "Transformer fine-tuning",
      "Evaluation on underrepresented languages",
    ],
    diagram: "sarcasm",
    detail: [
      {
        heading: "The emoji are not decoration",
        body: "In Bangla social-media text the emoji frequently carries the polarity inversion that makes a sentence sarcastic, while the words themselves read as sincere. Stripping emoji during preprocessing, which is the default in most pipelines, therefore deletes the label-bearing signal. The corpus is annotated with the emoji in place and the models are trained on the combined sequence, which is the whole premise of the paper.",
      },
      {
        heading: "Why the dataset was the first contribution",
        body: "There was no public emoji-aware Bangla sarcasm corpus to evaluate against, so any result would have been unreproducible by construction. AUST-Sarc is released on Mendeley Data under its own DOI so that a reader can check the annotations rather than take the accuracy on trust, and so that a later model can be compared to this one on identical data.",
      },
      {
        heading: "On the 97.82%",
        body: "The figure is K-fold cross-validated rather than single-split, which is the minimum defensible protocol on a corpus of this size. It is a high number on a small, single-source dataset, and I would not present it as evidence that Bangla sarcasm is solved. It is evidence that emoji-aware input helps substantially, measured on a benchmark anyone can download.",
      },
    ],
    bibtex: [
      "@inproceedings{samin2025emoji,",
      "  title     = {Emoji-Infused Bengali Sarcasm and Offensive Language Analysis:",
      "               A Novel Approach to Context-Aware Text Understanding},",
      "  author    = {Samin, Ahnaf and others},",
      "  booktitle = {2025 International Conference on Computer and Information",
      "               Technology (ICCIT)},",
      "  year      = {2025},",
      "  publisher = {IEEE},",
      "  doi       = {10.1109/ICCIT68739.2025.11491479}",
      "}",
    ].join("\n"),
  },
  {
    slug: "prudensnet-brain-tumour-mri",
    kind: "journal",
    title:
      "PruDensNet: an attention-augmented depthwise-separable CNN for four-class brain tumour MRI classification",
    authors: ["A co-author", "Ahnaf Samin", "and co-authors"],
    selfIndex: 1,
    venue: "Frontiers in Medicine",
    venueNote: "2026;13:1743015",
    year: 2026,
    date: "2026",
    doi: "10.3389/fmed.2026.1743015",
    url: "https://doi.org/10.3389/fmed.2026.1743015",
    topics: ["Medical imaging", "Efficient architectures", "Computer vision"],
    // The canonical profile is explicit that "co-authored" is true of the byline and
    // false about the work. This is the wording it asks for, and it is not a boast:
    // it is the answer to the question a supervisor is actually asking.
    contribution:
      "I conceived the PruDensNet architecture and led the research. I am second by listing order, but the network is the one I designed.",
    summary:
      "A 1.46-million-parameter attention-augmented depthwise-separable CNN reaching 96.05% test accuracy on four-class brain-tumour MRI classification, under a leakage-aware evaluation protocol. The parameter count is the point: the task does not need a large network, it needs a correctly evaluated small one.",
    metrics: [
      { value: "96.05%", label: "test accuracy, 4-class MRI" },
      { value: "1.46M", label: "parameters" },
    ],
    methods: [
      "Depthwise-separable CNNs",
      "Parameter-efficient architecture design",
      "Attention augmentation",
      "Leakage-aware evaluation protocols",
    ],
    diagram: "prudensnet",
    detail: [
      {
        heading: "The protocol I would defend first",
        body: "Public brain-tumour MRI collections frequently contain multiple slices from the same patient. Split those at random and near-duplicate slices land on both sides of the boundary, so the model is tested on something it has effectively already seen, which is how this task produces 99% results that do not survive contact with a new scanner. The evaluation here is leakage-aware by patient rather than by image, and 96.05% is the number that protocol yields. An inflated figure on a medical task is worse than no figure.",
      },
      {
        heading: "Why depthwise-separable, and why attention on top",
        body: "Factorising each convolution into a depthwise spatial stage and a pointwise channel stage cuts parameters substantially at comparable representational capacity, which is what brings the network to 1.46M. What factorisation costs is cross-channel context, since spatial and channel mixing no longer happen together. The attention augmentation buys that back selectively, reweighting the channels and spatial regions where the tumour signal is, rather than restoring capacity uniformly.",
      },
      {
        heading: "Why small matters clinically",
        body: "A model that fits comfortably on commodity hardware can run where the scan is taken. For a four-class diagnostic aid intended for settings without a GPU budget, a 1.46M-parameter network that has been honestly evaluated is a more useful object than a far larger one that scores two points higher on a leaky split.",
      },
    ],
    bibtex: [
      "@article{prudensnet2026,",
      "  title   = {PruDensNet: an attention-augmented depthwise-separable CNN for",
      "             four-class brain tumour MRI classification},",
      "  author  = {others and Samin, Ahnaf},",
      "  journal = {Frontiers in Medicine},",
      "  volume  = {13},",
      "  pages   = {1743015},",
      "  year    = {2026},",
      "  doi     = {10.3389/fmed.2026.1743015}",
      "}",
    ].join("\n"),
  },
  {
    slug: "aust-sarc-dataset",
    kind: "dataset",
    title: "AUST-Sarc: an emoji-aware Bangla sarcasm and offensive language dataset",
    authors: ["Ahnaf Samin", "and co-authors"],
    selfIndex: 0,
    venue: "Mendeley Data",
    venueNote: "v2, public",
    year: 2025,
    date: "2025",
    doi: "10.17632/7ryvn5gw88.2",
    url: "https://doi.org/10.17632/7ryvn5gw88.2",
    topics: ["Low-resource NLP", "Bengali", "Datasets"],
    contribution:
      "I built and released the corpus, including the annotation protocol, alongside the ICCIT 2025 paper.",
    summary:
      "2,649 emoji-aware Bangla sentences annotated for sarcasm and offensive language, released publicly so that the result in the ICCIT paper can be reproduced and improved on rather than taken on trust. It is the one artefact here a reader can open and check in a single click.",
    metrics: [
      { value: "2,649", label: "annotated sentences" },
      { value: "Open", label: "public DOI, reusable" },
    ],
    methods: ["Corpus construction", "Annotation protocol design", "Emoji-aware tokenisation"],
    bibtex: [
      "@misc{samin2025austsarc,",
      "  title     = {AUST-Sarc: an emoji-aware Bangla sarcasm and offensive",
      "               language dataset},",
      "  author    = {Samin, Ahnaf and others},",
      "  year      = {2025},",
      "  publisher = {Mendeley Data},",
      "  doi       = {10.17632/7ryvn5gw88.2}",
      "}",
    ].join("\n"),
  },
];

export const allTopics = Array.from(new Set(publications.flatMap((p) => p.topics))).sort();

export function publicationBySlug(slug: string): Publication | undefined {
  return publications.find((p) => p.slug === slug);
}
