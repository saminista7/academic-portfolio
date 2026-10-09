// Every publication record.
//
// Author lists, titles, dates and metrics were verified on 10 October 2026
// against Crossref (api.crossref.org) and each publisher's own page, not copied
// from a CV. A dead DOI or a misattributed author list on an academic site costs
// more than a missing one.

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
  /**
   * What the venue MEANS to a reader who does not know it: "Nature Portfolio",
   * "IEEE". Standing only. Not a slot for version numbers or citation metadata,
   * which say nothing a resolving DOI has not already said. Omit it rather than
   * fill it.
   */
  venueNote?: string;
  year: number;
  date: string;
  doi: string;
  url: string;
  /** Secondary links: publisher mirrors, datasets, code. */
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
    authors: [
      "Ahnaf Samin",
      "Fariha Zahin",
      "Noholi Islam Duti",
      "Bappaditta Saha Chowdhury",
      "Abdullah Rakib Akand",
      "Mithila Arman",
      "Remon Das",
      "Nkosi Zuberi",
    ],
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
      "Intrusion detection on power-system SCADA telemetry is a severely imbalanced multivariate time-series problem, and the imbalance is the part most published results quietly work around. This paper reduces the feature space to 60 dimensions by mutual information, balances with ADASYN, and pairs two 1D convolutional blocks with a Transformer encoder and a BiGRU layer, reaching 0.94 ROC-AUC on 14,415 held-out samples of the Mississippi State University power-system benchmark.",
    metrics: [
      { value: "0.94", label: "ROC-AUC on the MSU benchmark" },
      { value: "14,415", label: "held-out test samples" },
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
        body: "SCADA telemetry arrives as a wide, highly correlated sensor stream, and feeding all of it to a deep model buys capacity spent on redundancy. Mutual information ranks each feature against the attack label without assuming a linear relationship, which matters here because the informative signals in a false-data-injection event are not linearly separable from ordinary load variation. Reducing to 60 features before modelling made the downstream network smaller and the result easier to attribute to the architecture rather than to the feature count.",
      },
      {
        heading: "Why three blocks and not one",
        body: "The three stages do different jobs. Two 1D convolutional blocks with Swish activations and batch normalisation extract local waveform shape within a short window. A single Transformer encoder block with eight-head self-attention relates any two timesteps directly, so a long-range dependency does not have to survive a recurrence to be seen. A bidirectional GRU layer then reads the attended sequence in both directions, which is legitimate here because detection runs over a completed window rather than strictly online.",
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
      "  author  = {Samin, Ahnaf and Zahin, Fariha and Duti, Noholi Islam and",
      "             Chowdhury, Bappaditta Saha and Akand, Abdullah Rakib and",
      "             Arman, Mithila and Das, Remon and Zuberi, Nkosi},",
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
    authors: [
      "Ahnaf Samin",
      "Md Maruf Rusafi Arnob",
      "Jaasia Anjum",
      "Md. Nurul Yousuf Khan",
      "Intishar Rahman Nafi",
      "Tahsin Aziz",
    ],
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
      "First author. This began as my undergraduate thesis at AUST, supervised by Ms. Tahsin Aziz, and I took it from dataset construction through to IEEE publication.",
    summary:
      "Bengali has roughly 230 million speakers and almost no annotated resources for figurative language, so the dataset had to be built before the model. AUST-Sarc is a public corpus of sarcastic, non-sarcastic and offensive Bengali comments with their emoji retained. Across traditional classifiers, recurrent models and three multilingual transformers, mBERT with K-fold cross-validation reached 97.82% on sarcasm detection and a BiLSTM baseline reached 91.3%.",
    metrics: [
      { value: "97.82%", label: "mBERT, K-fold, sarcasm" },
      { value: "91.3%", label: "BiLSTM baseline" },
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
        body: "In Bangla social-media text the emoji frequently carries the polarity inversion that makes a sentence sarcastic, while the words themselves read as sincere. Stripping emoji during preprocessing, which is the default in most pipelines, therefore deletes the label-bearing signal. Here the emoji are normalised and translated into their Bangla text equivalents instead, so their meaning enters the model as language rather than being discarded as noise.",
      },
      {
        heading: "Why the dataset was the first contribution",
        body: "There was no public emoji-aware Bangla sarcasm corpus to evaluate against, so any result would have been unreproducible by construction. AUST-Sarc is released on Mendeley Data under its own DOI so that a reader can check the annotations rather than take the accuracy on trust, and so that a later model can be compared to this one on identical data.",
      },
      {
        heading: "What the comparison actually covered",
        body: "The claim is not that one model works. Traditional classifiers over TF-IDF features (Naive Bayes, Random Forest, Decision Tree, SVM), recurrent architectures (GRU, LSTM, BiLSTM) and three multilingual transformers (Bangla BERT, mBERT, MuRIL) were all evaluated on the same corpus. The 97.82% is K-fold cross-validated rather than single-split, which is the minimum defensible protocol at this corpus size. It remains a high number on a small single-source dataset, and I would present it as evidence that emoji-aware input helps substantially, not that Bangla sarcasm is solved.",
      },
    ],
    bibtex: [
      "@inproceedings{samin2025emoji,",
      "  title     = {Emoji-Infused Bengali Sarcasm and Offensive Language Analysis:",
      "               A Novel Approach to Context-Aware Text Understanding},",
      "  author    = {Samin, Ahnaf and Arnob, Md Maruf Rusafi and Anjum, Jaasia and",
      "               Khan, Md. Nurul Yousuf and Nafi, Intishar Rahman and Aziz, Tahsin},",
      "  booktitle = {2025 28th International Conference on Computer and Information",
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
      "PruDensNet: a parameter efficient depthwise separable CNN for MRI-based brain tumor classification",
    authors: [
      "Mithila Arman",
      "Ahnaf Samin",
      "A. K. M. Muzahidul Islam",
      "Md Maruf Rusafi Arnob",
      "Md Jahirul Islam",
      "Ishtiak Al Mamoon",
    ],
    selfIndex: 1,
    venue: "Frontiers in Medicine",
    venueNote: "2026;13:1743015",
    year: 2026,
    date: "20 May 2026",
    doi: "10.3389/fmed.2026.1743015",
    url: "https://doi.org/10.3389/fmed.2026.1743015",
    topics: ["Medical imaging", "Efficient architectures", "Computer vision"],
    // The canonical profile is explicit that "co-authored" is true of the byline
    // and false about the work. This is the wording it asks for, and it is not a
    // boast: it answers the question a supervisor is actually asking.
    contribution:
      "I conceived the PruDensNet architecture and led the research. I am second by listing order, but the network is the one I designed.",
    summary:
      "A depthwise-separable CNN of roughly 1.46 million parameters, integrating lightweight channel and spatial attention with GELU activations, reaching 96.05% test accuracy on four-class brain-tumour MRI classification. The parameter count is the point: the task does not need a large network, it needs a small one that has been evaluated carefully and reports its own limits.",
    metrics: [
      { value: "96.05%", label: "test accuracy, 4-class MRI" },
      { value: "1.46M", label: "parameters" },
    ],
    methods: [
      "Depthwise-separable CNNs",
      "Parameter-efficient architecture design",
      "Channel and spatial attention",
      "Leakage-aware evaluation pipeline",
    ],
    diagram: "prudensnet",
    detail: [
      {
        heading: "Why depthwise-separable, and why attention on top",
        body: "Factorising each convolution into a depthwise spatial stage and a pointwise channel stage cuts parameters substantially at comparable representational capacity, which is what brings the network to roughly 1.46 million. What factorisation costs is cross-channel context, since spatial and channel mixing no longer happen together. Lightweight channel and spatial attention, with GELU activations, buys that back selectively, reweighting the channels and regions carrying tumour signal rather than restoring capacity uniformly.",
      },
      {
        heading: "What the evaluation can and cannot claim",
        body: "The pipeline is built to be leakage-aware, and the paper states its own limit rather than leaving it to a reader to find: the source collection carries no patient identifiers, so the split cannot be made patient-wise, and the possibility of subtle leakage between near-duplicate slices of the same patient is acknowledged in the limitations rather than argued away. That is why 96.05% is reported as the figure this protocol yields and not as a ceiling. An inflated number on a medical task is worse than no number, and a stated limitation is worth more than a defended one.",
      },
      {
        heading: "Why small matters clinically",
        body: "A model that fits comfortably on commodity hardware can run where the scan is taken. For a four-class diagnostic aid intended for settings without a GPU budget, a 1.46M-parameter network is a more useful object than a far larger one scoring a point or two higher, particularly when the larger one cannot be deployed at the point of care at all.",
      },
    ],
    bibtex: [
      "@article{arman2026prudensnet,",
      "  title   = {PruDensNet: a parameter efficient depthwise separable CNN for",
      "             MRI-based brain tumor classification},",
      "  author  = {Arman, Mithila and Samin, Ahnaf and Islam, A. K. M. Muzahidul and",
      "             Arnob, Md Maruf Rusafi and Islam, Md Jahirul and",
      "             Mamoon, Ishtiak Al},",
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
    title: "AUST-Sarc: Emoji-Aware Bangla Sarcasm and Offensiveness",
    authors: [
      "Ahnaf Samin",
      "Md Maruf Rusafi Arnob",
      "Raian Khan",
      "Intishar Rahman",
      "Jaasia Anjum",
    ],
    selfIndex: 0,
    venue: "Mendeley Data",
    year: 2025,
    date: "23 September 2025",
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
    methods: ["Corpus construction", "Annotation protocol design", "Emoji normalisation"],
    bibtex: [
      "@misc{samin2025austsarc,",
      "  title     = {AUST-Sarc: Emoji-Aware Bangla Sarcasm and Offensiveness},",
      "  author    = {Samin, Ahnaf and Arnob, Md Maruf Rusafi and Khan, Raian and",
      "               Rahman, Intishar and Anjum, Jaasia},",
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
