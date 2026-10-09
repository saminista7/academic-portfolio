import Link from "next/link";
import type { Publication } from "@/content/publications";
import { profile } from "@/content/profile";
import BibtexButton from "./BibtexButton";
import ExtLink from "./ExtLink";

const kindLabel: Record<Publication["kind"], string> = {
  journal: "Journal article",
  conference: "Conference paper",
  dataset: "Dataset",
};

export default function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <article className="pub" data-kind={pub.kind}>
      <header className="pub__head">
        <span className="pub__kind">{kindLabel[pub.kind]}</span>
        <span className="pub__year">{pub.year}</span>
      </header>

      <h3 className="pub__title">
        <ExtLink href={pub.url}>{pub.title}</ExtLink>
      </h3>

      {/* His name is emphasised rather than bolded alone: a panel scanning
          twenty applications needs to see author position without reading. */}
      <p className="pub__authors">
        {pub.authors.map((author, i) => (
          <span key={i}>
            {i > 0 && ", "}
            <span className={i === pub.selfIndex ? "pub__self" : undefined}>{author}</span>
          </span>
        ))}
      </p>

      <p className="pub__venue">
        <span className="pub__venue-name">{pub.venue}</span>
        <span className="pub__venue-note">{pub.venueNote}</span>
        <span className="pub__date">{pub.date}</span>
      </p>

      <p className="pub__contribution">{pub.contribution}</p>

      <ul className="pub__metrics">
        {pub.metrics.map((m) => (
          <li key={m.label}>
            <span className="pub__metric-value">{m.value}</span>
            <span className="pub__metric-label">{m.label}</span>
          </li>
        ))}
      </ul>

      <ul className="pub__topics">
        {pub.topics.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <footer className="pub__foot">
        <ExtLink className="pub__doi" href={pub.url}>
          <span className="visually-hidden">DOI: </span>
          {pub.doi}
        </ExtLink>
        <div className="pub__actions">
          {pub.detail && (
            <Link className="btn btn--small" href={`/publications/${pub.slug}`}>
              How it works
            </Link>
          )}
          {pub.extraLinks?.map((l) => (
            <ExtLink key={l.url} className="btn btn--small btn--quiet" href={l.url}>
              {l.label}
            </ExtLink>
          ))}
          <BibtexButton bibtex={pub.bibtex} title={pub.title} />
        </div>
      </footer>

      <p className="visually-hidden">
        Authored by {profile.name}, ORCID {profile.orcid}.
      </p>
    </article>
  );
}
