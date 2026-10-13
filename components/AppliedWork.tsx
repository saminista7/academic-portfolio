import Reveal from "./Reveal";
import ExtLink from "./ExtLink";
import { experience, artefacts } from "@/content/experience";

export default function AppliedWork() {
  return (
    <section className="section" id="applied" aria-labelledby="applied-title">
      <div className="page">
        <p className="eyebrow">Applied and deployed work</p>
        <Reveal>
          <h2 id="applied-title" className="section-title measure">
            Two systems that went into production, and what each one taught me.
          </h2>
          <p className="lede measure">
            Listed as research capability rather than as employment history. The common thread is
            that both were measured after deployment rather than estimated before it.
          </p>
        </Reveal>

        <div className="roles">
          {experience.map((role, i) => (
            <Reveal as="article" className="role" key={role.slug} delay={i * 80}>
              <header className="role__head">
                <p className="role__period">{role.period}</p>
                <h3 className="role__title">{role.role}</h3>
                <p className="role__org">
                  {role.org}
                  <span className="role__org-note">{role.orgNote}</span>
                </p>
              </header>

              <p className="role__headline">{role.headline}</p>

              <ul className="metric-row">
                {role.metrics.map((m) => (
                  <li key={m.label} className="metric-tile">
                    <span className="metric-tile__value">{m.value}</span>
                    <span className="metric-tile__label">{m.label}</span>
                  </li>
                ))}
              </ul>

              <ul className="role__bullets">
                {role.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>

              <aside className="role__why">
                <p className="role__why-label">Why this matters for research</p>
                <p>{role.whyItMatters}</p>
              </aside>

              <ul className="tag-row">
                {role.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Supporting projects. They back up the roles above rather than leading. */}
        <Reveal className="artefacts">
          <h3 className="artefacts__title">Supporting work</h3>
          <ul className="artefact-grid">
            {artefacts.map((a) => (
              <li key={a.title} className="artefact">
                <h4 className="artefact__title">
                  {a.url ? <ExtLink href={a.url}>{a.title}</ExtLink> : a.title}
                </h4>
                <p className="artefact__note">{a.note}</p>
                <p className="artefact__summary">{a.summary}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
