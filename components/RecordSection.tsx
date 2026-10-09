import Reveal from "./Reveal";
import { skillGroups, timeline } from "@/content/skills";

const kindLabel: Record<string, string> = {
  education: "Education",
  award: "Award",
  role: "Position",
  test: "Qualification",
};

export default function RecordSection() {
  return (
    <section className="section" id="record" aria-labelledby="record-title">
      <div className="page">
        <p className="eyebrow">Record and capabilities</p>
        <Reveal>
          <h2 id="record-title" className="section-title measure">
            Education, recognition, and what I can actually do.
          </h2>
        </Reveal>

        <div className="record-grid">
          <Reveal className="record-col">
            <h3 className="record-col__title">Timeline</h3>
            <ol className="timeline">
              {timeline.map((entry, i) => (
                <li key={i} className="timeline__item" data-kind={entry.kind}>
                  <div className="timeline__marker" aria-hidden="true" />
                  <p className="timeline__period">
                    {entry.period}
                    <span className="timeline__kind">{kindLabel[entry.kind]}</span>
                  </p>
                  <h4 className="timeline__title">{entry.title}</h4>
                  <p className="timeline__org">{entry.org}</p>
                  <p className="timeline__detail">{entry.detail}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="record-col" delay={80}>
            <h3 className="record-col__title">Technical skills</h3>
            {/* No proficiency bars. A bar invents a precision that does not exist,
                and the caveats below are worth more to a reader than a graphic. */}
            <p className="skills__preface">
              Each line states how far the experience actually goes. Where a line could be read
              as more than it is, the caveat is written out rather than left to an interview.
            </p>
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <div className="skill-group" key={group.heading}>
                  <h4 className="skill-group__heading">{group.heading}</h4>
                  <dl className="skill-list">
                    {group.items.map((item) => (
                      <div className="skill-list__row" key={item.name}>
                        <dt>{item.name}</dt>
                        <dd>{item.level}</dd>
                      </div>
                    ))}
                  </dl>
                  {group.caveat && <p className="skill-group__caveat">{group.caveat}</p>}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
