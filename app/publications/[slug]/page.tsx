import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publications, publicationBySlug } from "@/content/publications";
import { profile } from "@/content/profile";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import BibtexButton from "@/components/BibtexButton";
import ExtLink from "@/components/ExtLink";

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pub = publicationBySlug(slug);
  if (!pub) return { title: "Not found" };

  return {
    title: pub.title,
    description: pub.summary,
    alternates: { canonical: `/publications/${pub.slug}` },
    openGraph: { title: pub.title, description: pub.summary, type: "article" },
    // Google Scholar reads these. Without them the page competes with the
    // publisher’s copy instead of pointing at it.
    other: {
      citation_title: pub.title,
      citation_author: profile.name,
      citation_publication_date: String(pub.year),
      citation_journal_title: pub.venue,
      citation_doi: pub.doi,
      citation_public_url: pub.url,
    },
  };
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = publicationBySlug(slug);
  if (!pub) notFound();

  const others = publications.filter((p) => p.slug !== pub.slug && p.detail);

  return (
    <article className="paper">
      <div className="page">
        <nav className="paper__back" aria-label="Breadcrumb">
          <Link href="/#publications">Publications</Link>
        </nav>

        <header className="paper__head">
          <p className="paper__venue">
            <span className="paper__venue-name">{pub.venue}</span>
            <span className="paper__venue-note">{pub.venueNote}</span>
            <span className="paper__date">{pub.date}</span>
          </p>
          <h1 className="paper__title">{pub.title}</h1>
          <p className="paper__authors">
            {pub.authors.map((a, i) => (
              <span key={i}>
                {i > 0 && ", "}
                <span className={i === pub.selfIndex ? "pub__self" : undefined}>{a}</span>
              </span>
            ))}
          </p>

          <ul className="metric-row metric-row--wide">
            {pub.metrics.map((m) => (
              <li key={m.label} className="metric-tile">
                <span className="metric-tile__value">{m.value}</span>
                <span className="metric-tile__label">{m.label}</span>
              </li>
            ))}
          </ul>

          <div className="paper__actions">
            <ExtLink className="btn btn--primary" href={pub.url}>
              Read at {pub.venue}
            </ExtLink>
            {pub.extraLinks?.map((l) => (
              <ExtLink key={l.url} className="btn" href={l.url}>
                {l.label}
              </ExtLink>
            ))}
            <BibtexButton bibtex={pub.bibtex} title={pub.title} />
          </div>

          <p className="paper__doi">
            DOI <ExtLink href={pub.url}>{pub.doi}</ExtLink>
          </p>
        </header>

        <section className="paper__section" aria-labelledby="paper-summary">
          <h2 id="paper-summary" className="paper__h2">
            Summary
          </h2>
          <p className="paper__lede measure">{pub.summary}</p>
          <p className="paper__contribution">
            <span className="paper__contribution-label">My contribution</span>
            {pub.contribution}
          </p>
        </section>

        {pub.diagram && (
          <section className="paper__section" aria-labelledby="paper-method">
            <h2 id="paper-method" className="paper__h2">
              The method, stage by stage
            </h2>
            <p className="paper__hint">
              Step through the pipeline. Each stage explains why it is there rather than only
              what it is.
            </p>
            <ArchitectureDiagram kind={pub.diagram} />
          </section>
        )}

        {pub.detail && (
          <section className="paper__section" aria-labelledby="paper-notes">
            <h2 id="paper-notes" className="paper__h2">
              Design decisions
            </h2>
            <div className="paper__notes">
              {pub.detail.map((d) => (
                <div className="paper__note" key={d.heading}>
                  <h3 className="paper__h3">{d.heading}</h3>
                  <p className="measure">{d.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="paper__section" aria-labelledby="paper-methods-list">
          <h2 id="paper-methods-list" className="paper__h2">
            Methods used
          </h2>
          <ul className="tag-row tag-row--large">
            {pub.methods.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </section>

        <section className="paper__section" aria-labelledby="paper-cite">
          <h2 id="paper-cite" className="paper__h2">
            Cite this
          </h2>
          <pre className="bibtex-block">
            <code>{pub.bibtex}</code>
          </pre>
          <BibtexButton bibtex={pub.bibtex} title={pub.title} />
        </section>

        {others.length > 0 && (
          <nav className="paper__more" aria-labelledby="paper-more-title">
            <h2 id="paper-more-title" className="paper__h2">
              Other work
            </h2>
            <ul>
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/publications/${o.slug}`}>
                    <span className="paper__more-venue">{o.venue}</span>
                    <span className="paper__more-title">{o.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </article>
  );
}
