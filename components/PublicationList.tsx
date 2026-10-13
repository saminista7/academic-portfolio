"use client";

import { useMemo, useState } from "react";
import { publications, allTopics, type PublicationKind } from "@/content/publications";
import PublicationCard from "./PublicationCard";

type KindFilter = "all" | PublicationKind;
type Sort = "year-desc" | "year-asc" | "kind";

const kindFilters: { value: KindFilter; label: string }[] = [
  { value: "all", label: "Everything" },
  { value: "journal", label: "Journal articles" },
  { value: "conference", label: "Conference papers" },
  { value: "dataset", label: "Datasets" },
];

// Journal, then conference, then dataset.
const kindRank: Record<PublicationKind, number> = { journal: 0, conference: 1, dataset: 2 };

export default function PublicationList() {
  const [kind, setKind] = useState<KindFilter>("all");
  const [topic, setTopic] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("year-desc");

  const shown = useMemo(() => {
    const filtered = publications.filter((p) => {
      if (kind !== "all" && p.kind !== kind) return false;
      if (topic !== "all" && !p.topics.includes(topic)) return false;
      return true;
    });

    // Copy first: sort() mutates, and this array is imported.
    return [...filtered].sort((a, b) => {
      if (sort === "year-asc") return a.year - b.year;
      if (sort === "kind") return kindRank[a.kind] - kindRank[b.kind] || b.year - a.year;
      return b.year - a.year;
    });
  }, [kind, topic, sort]);

  const filtering = kind !== "all" || topic !== "all";

  return (
    <>
      <div className="pub-filters">
        <fieldset className="filter-group">
          <legend className="filter-group__legend">Type</legend>
          <div className="chips" role="group">
            {kindFilters.map((f) => (
              <button
                key={f.value}
                type="button"
                className="chip"
                aria-pressed={kind === f.value}
                onClick={() => setKind(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="filter-group filter-group--selects">
          <label className="field">
            <span className="field__label">Topic</span>
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="all">All topics</option>
              {allTopics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="year-desc">Newest first</option>
              <option value="year-asc">Oldest first</option>
              <option value="kind">By type</option>
            </select>
          </label>
        </div>
      </div>

      {/* Announced politely so a screen-reader user hears the result of a filter
          click without the list stealing focus. */}
      <p className="pub-count" role="status" aria-live="polite">
        {shown.length} {shown.length === 1 ? "record" : "records"}
        {filtering ? " matching the current filters" : " in total"}
        {filtering && (
          <>
            {" · "}
            <button
              type="button"
              className="linkish"
              onClick={() => {
                setKind("all");
                setTopic("all");
              }}
            >
              Clear filters
            </button>
          </>
        )}
      </p>

      {shown.length === 0 ? (
        <p className="pub-empty">
          Nothing matches that combination. <button type="button" className="linkish" onClick={() => { setKind("all"); setTopic("all"); }}>Clear the filters</button> to see all records.
        </p>
      ) : (
        <ul className="pub-list">
          {shown.map((pub) => (
            <li key={pub.slug}>
              <PublicationCard pub={pub} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
