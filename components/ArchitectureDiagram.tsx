"use client";

import { useState } from "react";

/**
 * Hand-built inline SVG. No chart library, no external asset — the diagram has to
 * survive a strict network and read correctly in both palettes, so every colour is
 * `currentColor` or a CSS token rather than a literal.
 *
 * The stepping is the point of making it interactive: a reader clicking through the
 * stages is being shown that the method can be explained, which is the thing a
 * supervisor is actually assessing.
 */

interface Stage {
  label: string;
  sub: string;
  detail: string;
}

const diagrams: Record<string, { caption: string; stages: Stage[] }> = {
  scada: {
    caption:
      "CNN-Transformer-BiGRU detection pipeline over SCADA telemetry windows. Selection happens before modelling, and balancing happens inside the training split only.",
    stages: [
      {
        label: "SCADA telemetry",
        sub: "Multivariate sensor stream",
        detail:
          "Wide, highly correlated power-system measurements, windowed into fixed-length multivariate sequences. Attack events are a small minority of windows.",
      },
      {
        label: "Mutual information",
        sub: "Feature selection",
        detail:
          "The feature space is reduced to 60 dimensions by mutual information, which ranks each feature against the attack label with no linearity assumed. That matters because false-data-injection signals are not linearly separable from ordinary load variation.",
      },
      {
        label: "ADASYN",
        sub: "Class balancing, train split only",
        detail:
          "Minority examples are synthesised preferentially where the classifier struggles most. Applied strictly inside the training fold; applying it before the split is the usual way results like this get inflated.",
      },
      {
        label: "2x 1D CNN",
        sub: "Swish, batch norm",
        detail:
          "Two convolutional blocks with Swish activations and batch normalisation extract short-range temporal structure within the window: the local signature of a transient.",
      },
      {
        label: "Transformer",
        sub: "Eight-head self-attention",
        detail:
          "A single Transformer encoder block with eight-head self-attention relates any two timesteps directly, so a long-range dependency does not have to survive a recurrence to be captured.",
      },
      {
        label: "BiGRU",
        sub: "Bidirectional sequence read",
        detail:
          "Reads the attended sequence forwards and backwards. Legitimate here because detection is performed over a completed window rather than strictly online.",
      },
      {
        label: "0.94 ROC-AUC",
        sub: "14,415 held-out samples",
        detail:
          "Measured on 14,415 held-out samples of the Mississippi State University power-system benchmark. ROC-AUC is reported rather than accuracy, because on an imbalanced detection task accuracy rewards a model that predicts normal everywhere.",
      },
    ],
  },
  prudensnet: {
    caption:
      "PruDensNet: depthwise-separable blocks with channel and spatial attention, roughly 1.46M parameters, under a leakage-aware pipeline whose limits the paper states.",
    stages: [
      {
        label: "Brain MRI",
        sub: "Four diagnostic classes",
        detail:
          "Axial slices across four classes. A single patient contributes many near-duplicate slices, which is where the evaluation trap on this task lives.",
      },
      {
        label: "Leakage-aware split",
        sub: "And its stated limit",
        detail:
          "The pipeline is built to control leakage between near-duplicate slices, and the paper states its own limit: the source collection carries no patient identifiers, so a patient-wise split is not possible and residual leakage is acknowledged rather than argued away.",
      },
      {
        label: "Depthwise conv",
        sub: "Spatial stage",
        detail:
          "Each channel is convolved spatially on its own, which is where the parameter saving comes from relative to a standard convolution.",
      },
      {
        label: "Pointwise conv",
        sub: "Channel mixing",
        detail:
          "A 1x1 convolution recombines channels. Together with the depthwise stage this factorises one standard convolution into two much cheaper ones.",
      },
      {
        label: "Attention + GELU",
        sub: "Channel and spatial",
        detail:
          "Factorisation costs cross-channel context. Lightweight channel and spatial attention, with GELU activations, buys it back selectively, reweighting the channels and regions carrying tumour signal rather than restoring capacity uniformly.",
      },
      {
        label: "96.05% / 1.46M",
        sub: "Accuracy at that size",
        detail:
          "A network this small runs on commodity hardware, which is what makes it useful where the scan is actually taken.",
      },
    ],
  },
  sarcasm: {
    caption:
      "Emoji-aware Bangla sarcasm pipeline. The emoji survives preprocessing as translated text because it carries the polarity inversion the label depends on.",
    stages: [
      {
        label: "Bangla social text",
        sub: "With emoji in place",
        detail:
          "Collected social-media text where the written words frequently read as sincere and the emoji supplies the sarcasm.",
      },
      {
        label: "AUST-Sarc",
        sub: "2,649 annotated sentences",
        detail:
          "A public corpus released under its own DOI, with the annotation protocol documented, so the result below can be checked rather than taken on trust.",
      },
      {
        label: "Emoji normalisation",
        sub: "Translated, not stripped",
        detail:
          "Standard pipelines discard emoji during cleaning, which deletes the label-bearing signal outright. Here each emoji is normalised and translated into its Bangla text equivalent, so its meaning enters the model as language.",
      },
      {
        label: "Model comparison",
        sub: "Classical, RNN, transformer",
        detail:
          "TF-IDF classifiers (Naive Bayes, Random Forest, Decision Tree, SVM), recurrent models (GRU, LSTM, BiLSTM) and three multilingual transformers (Bangla BERT, mBERT, MuRIL) were evaluated on the same corpus, K-fold rather than single-split.",
      },
      {
        label: "97.82% / 91.3%",
        sub: "mBERT vs BiLSTM baseline",
        detail:
          "mBERT with K-fold cross-validation against the strongest recurrent baseline. The gap is the evidence that emoji-aware input helps substantially. It is a high number on a small single-source dataset, and is presented as that.",
      },
    ],
  },
};

export default function ArchitectureDiagram({ kind }: { kind: string }) {
  const diagram = diagrams[kind];
  const [active, setActive] = useState(0);

  if (!diagram) return null;

  const { stages, caption } = diagram;
  const boxW = 150;
  const boxH = 72;
  const gap = 26;
  const width = stages.length * boxW + (stages.length - 1) * gap;
  const height = 150;

  return (
    <figure className="diagram">
      <div className="diagram__scroll">
        {/* No width/height attributes: with the global `svg { max-width: 100% }`
            they fight each other and the diagram either squashes or pushes the
            page sideways. A min-width in px keeps the true size and lets the
            wrapper scroll, which is what keeps the body from scrolling. */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={caption}
          className="diagram__svg"
          style={{ minWidth: `${width}px`, aspectRatio: `${width} / ${height}` }}
        >
          {stages.map((stage, i) => {
            const x = i * (boxW + gap);
            const isActive = i === active;
            return (
              <g key={stage.label}>
                {i > 0 && (
                  <g className="diagram__arrow">
                    <line
                      x1={x - gap + 3}
                      y1={40 + boxH / 2}
                      x2={x - 7}
                      y2={40 + boxH / 2}
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path
                      d={`M${x - 7} ${40 + boxH / 2} l-6 -3.6 v7.2 z`}
                      fill="currentColor"
                    />
                  </g>
                )}
                <g
                  className={`diagram__node ${isActive ? "is-active" : ""}`}
                  onClick={() => setActive(i)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={`Stage ${i + 1}: ${stage.label}. ${stage.sub}.`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                    if (e.key === "ArrowRight") setActive(Math.min(i + 1, stages.length - 1));
                    if (e.key === "ArrowLeft") setActive(Math.max(i - 1, 0));
                  }}
                >
                  <rect x={x} y={40} width={boxW} height={boxH} rx="3" />
                  <text x={x + boxW / 2} y={40 + 29} textAnchor="middle" className="diagram__label">
                    {stage.label}
                  </text>
                  <text x={x + boxW / 2} y={40 + 48} textAnchor="middle" className="diagram__sub">
                    {stage.sub}
                  </text>
                </g>
                <text x={x + 6} y={30} className="diagram__index">
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="diagram__detail" role="status" aria-live="polite">
        <p className="diagram__detail-head">
          <span className="diagram__detail-num">{String(active + 1).padStart(2, "0")}</span>
          {stages[active].label}
        </p>
        <p className="diagram__detail-body">{stages[active].detail}</p>
      </div>

      <div className="diagram__controls">
        <button
          type="button"
          className="btn btn--small btn--quiet"
          onClick={() => setActive((i) => Math.max(0, i - 1))}
          disabled={active === 0}
        >
          Previous stage
        </button>
        <button
          type="button"
          className="btn btn--small"
          onClick={() => setActive((i) => Math.min(stages.length - 1, i + 1))}
          disabled={active === stages.length - 1}
        >
          Next stage
        </button>
      </div>

      <figcaption className="diagram__caption">{caption}</figcaption>
    </figure>
  );
}
