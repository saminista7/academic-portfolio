import Link from "next/link";
import { profile } from "@/content/profile";
import ExtLink from "./ExtLink";

const identityLinks = [
  { label: "ORCID", href: profile.links.orcid, note: profile.orcid },
  { label: "Google Scholar", href: profile.links.scholar, note: "Citations" },
  { label: "GitHub", href: profile.links.github, note: "saminista7" },
  { label: "LinkedIn", href: profile.links.linkedin, note: "Profile" },
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="page">
        <p className="hero__kicker">{profile.title}</p>
        <h1 id="hero-title" className="hero__name">
          {profile.name}
        </h1>
        <p className="hero__positioning measure">{profile.positioning}</p>

        {/* Three checkable facts, immediately. A panel reads this strip and nothing
            else before deciding whether to keep going. */}
        <ul className="hero__status">
          {profile.statusStrip.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {/* The identity links are high on the page on purpose: the first question a
            professor has about an unfamiliar applicant is whether the record is real,
            and ORCID answers it in one click. */}
        <ul className="hero__links">
          {identityLinks.map((l) => (
            <li key={l.label}>
              <ExtLink href={l.href} className="idlink">
                <span className="idlink__label">{l.label}</span>
                <span className="idlink__note">{l.note}</span>
              </ExtLink>
            </li>
          ))}
        </ul>

        <div className="hero__actions">
          <Link href="/#publications" className="btn btn--primary">
            Read the publications
          </Link>
          <Link href="/cv" className="btn">
            Academic CV
          </Link>
        </div>

        <p className="hero__objective measure">{profile.objective.line}</p>
      </div>
    </section>
  );
}
