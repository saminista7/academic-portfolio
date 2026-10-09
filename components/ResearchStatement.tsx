import Reveal from "./Reveal";
import { profile, researchStatement } from "@/content/profile";

export default function ResearchStatement() {
  return (
    <section className="section" id="research" aria-labelledby="research-title">
      <div className="page">
        <p className="eyebrow">Research statement</p>
        <Reveal>
          <h2 id="research-title" className="section-title measure">
            {researchStatement.lead}
          </h2>
        </Reveal>

        <div className="research-grid">
          <Reveal className="prose measure" delay={60}>
            {researchStatement.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Reveal>

          <Reveal className="research-aside" delay={120}>
            <h3 className="research-aside__title">Research interests</h3>
            <ol className="interest-list">
              {profile.researchInterests.map((interest, i) => (
                <li key={interest}>
                  <span className="interest-list__num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{interest}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {/* The three questions. This is the part that distinguishes a skilled
            applicant from a fundable one: a direction, not a capability list. */}
        <Reveal className="questions" delay={60}>
          <h3 className="questions__title">What I want to work on next</h3>
          <ol className="questions__list">
            {researchStatement.questions.map((q, i) => (
              <li key={i}>
                <span className="questions__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p>{q}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
