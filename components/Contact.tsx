import Reveal from "./Reveal";
import ExtLink from "./ExtLink";
import { profile } from "@/content/profile";

// Lightly split so a naive scraper walking the HTML does not pick up a usable
// string, while the rendered text and the mailto link both stay correct.
const [mailUser, mailHost] = profile.email.split("@");

export default function Contact() {
  return (
    <section className="section section--contact" id="contact" aria-labelledby="contact-title">
      <div className="page">
        <p className="eyebrow">Contact</p>
        <Reveal>
          <h2 id="contact-title" className="section-title measure">
            I am looking for a fully funded graduate place for {profile.objective.cycle}.
          </h2>
          <p className="lede measure">{profile.objective.line}</p>
        </Reveal>

        <Reveal className="contact-grid" delay={60}>
          <div className="contact-block">
            <p className="contact-block__label">Email</p>
            <ExtLink className="contact-block__value contact-email" href={`mailto:${profile.email}`}>
              {mailUser}
              <span aria-hidden="true">@</span>
              {mailHost}
            </ExtLink>
          </div>

          <div className="contact-block">
            <p className="contact-block__label">Based in</p>
            <p className="contact-block__value">{profile.location}</p>
            <p className="contact-block__note">{profile.timezone}</p>
          </div>

          <div className="contact-block">
            <p className="contact-block__label">Open to</p>
            <p className="contact-block__value">{profile.objective.levels}</p>
            <p className="contact-block__note">Funding is the requirement, not the degree title.</p>
          </div>

          <div className="contact-block">
            <p className="contact-block__label">Verify the record</p>
            <ul className="contact-block__links">
              <li>
                <ExtLink href={profile.links.orcid}>ORCID {profile.orcid}</ExtLink>
              </li>
              <li>
                <ExtLink href={profile.links.scholar}>Google Scholar</ExtLink>
              </li>
              <li>
                <ExtLink href={profile.links.github}>GitHub</ExtLink>
              </li>
              <li>
                <ExtLink href={profile.links.linkedin}>LinkedIn</ExtLink>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal className="contact-cta" delay={120}>
          <ExtLink className="btn btn--primary" href={`mailto:${profile.email}`}>
            Write to me
          </ExtLink>
          <ExtLink className="btn" href={profile.cvFile} download>
            Download the academic CV (PDF)
          </ExtLink>
        </Reveal>
      </div>
    </section>
  );
}
