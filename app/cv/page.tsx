import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { publications } from "@/content/publications";
import { experience, artefacts } from "@/content/experience";
import { skillGroups } from "@/content/skills";

export const metadata: Metadata = {
  title: "Academic CV",
  description: `Academic curriculum vitae of ${profile.name}: publications, research, and applied machine learning work.`,
  alternates: { canonical: "/cv" },
};

/**
 * Both forms of the CV on one page: the PDF for anyone who wants the document,
 * and a full HTML version for the reader who will not open an attachment. The
 * HTML version is not a teaser — it carries the same facts, so nothing is gated
 * behind a download.
 */
export default function CvPage() {
  return (
    <div className="cv-page">
      <div className="page">
        <header className="cv-head">
          <p className="eyebrow">Curriculum vitae</p>
          <h1 className="cv-head__title">{profile.name}</h1>
          <p className="cv-head__role">{profile.title}</p>
          <p className="cv-head__meta">
            {profile.location} · <a href={`mailto:${profile.email}`}>{profile.email}</a> ·{" "}
            <a href={profile.links.orcid}>ORCID {profile.orcid}</a>
          </p>
          <div className="cv-head__actions">
            <a className="btn btn--primary" href={profile.cvFile} download>
              Download PDF (version {profile.cvVersion})
            </a>
            <a className="btn" href={profile.cvFile} target="_blank" rel="noreferrer">
              Open in a new tab
            </a>
          </div>
        </header>

        <section className="cv-section" aria-labelledby="cv-education">
          <h2 id="cv-education" className="cv-section__title">
            Education
          </h2>
          <div className="cv-entry">
            <p className="cv-entry__period">{profile.degree.period}</p>
            <div>
              <h3 className="cv-entry__title">{profile.degree.award}</h3>
              <p className="cv-entry__org">{profile.degree.institution}</p>
              <p className="cv-entry__detail">
                CGPA {profile.degree.cgpa}. Undergraduate thesis on emoji-aware Bengali sarcasm
                detection, supervised by Ms. Tahsin Aziz, subsequently published at ICCIT 2025
                (IEEE).
              </p>
            </div>
          </div>
          <div className="cv-entry">
            <p className="cv-entry__period">2024</p>
            <div>
              <h3 className="cv-entry__title">IELTS Academic, overall {profile.ielts}</h3>
              <p className="cv-entry__org">British Council</p>
            </div>
          </div>
        </section>

        <section className="cv-section" aria-labelledby="cv-publications">
          <h2 id="cv-publications" className="cv-section__title">
            Publications and datasets
          </h2>
          <ol className="cv-pubs">
            {publications.map((p) => (
              <li key={p.slug}>
                <p className="cv-pubs__authors">
                  {p.authors.map((a, i) => (
                    <span key={i}>
                      {i > 0 && ", "}
                      <span className={i === p.selfIndex ? "pub__self" : undefined}>{a}</span>
                    </span>
                  ))}{" "}
                  ({p.year}).
                </p>
                <p className="cv-pubs__title">{p.title}</p>
                <p className="cv-pubs__venue">
                  <em>{p.venue}</em>, {p.venueNote}. <a href={p.url}>doi:{p.doi}</a>
                </p>
                <p className="cv-pubs__role">{p.contribution}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="cv-section" aria-labelledby="cv-experience">
          <h2 id="cv-experience" className="cv-section__title">
            Professional experience
          </h2>
          {experience.map((role) => (
            <div className="cv-entry" key={role.slug}>
              <p className="cv-entry__period">{role.period}</p>
              <div>
                <h3 className="cv-entry__title">{role.role}</h3>
                <p className="cv-entry__org">
                  {role.org}, {role.orgNote}
                </p>
                <ul className="cv-entry__bullets">
                  {role.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        <section className="cv-section" aria-labelledby="cv-projects">
          <h2 id="cv-projects" className="cv-section__title">
            Selected projects
          </h2>
          <ul className="cv-projects">
            {artefacts.map((a) => (
              <li key={a.title}>
                <h3 className="cv-entry__title">
                  {a.url ? <a href={a.url}>{a.title}</a> : a.title}
                  <span className="cv-projects__note">{a.note}</span>
                </h3>
                <p className="cv-entry__detail">{a.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-section" aria-labelledby="cv-skills">
          <h2 id="cv-skills" className="cv-section__title">
            Technical skills
          </h2>
          {skillGroups.map((g) => (
            <div className="cv-skills" key={g.heading}>
              <p className="cv-skills__heading">{g.heading}</p>
              <p className="cv-skills__items">
                {g.items.map((i) => i.name).join(" · ")}
              </p>
              {g.caveat && <p className="cv-skills__caveat">{g.caveat}</p>}
            </div>
          ))}
        </section>

        <section className="cv-section" aria-labelledby="cv-objective">
          <h2 id="cv-objective" className="cv-section__title">
            Objective
          </h2>
          <p className="measure">{profile.objective.line}</p>
        </section>

        <section className="cv-section cv-section--embed" aria-labelledby="cv-pdf">
          <h2 id="cv-pdf" className="cv-section__title">
            The PDF
          </h2>
          <object
            className="cv-embed"
            data={profile.cvFile}
            type="application/pdf"
            aria-label={`Academic CV of ${profile.name}, version ${profile.cvVersion}`}
          >
            {/* Mobile browsers routinely refuse to embed a PDF, so the fallback is
                a real link rather than a blank frame. */}
            <p className="cv-embed__fallback">
              Your browser will not display the PDF inline.{" "}
              <a href={profile.cvFile} download>
                Download it instead
              </a>
              .
            </p>
          </object>
        </section>
      </div>
    </div>
  );
}
