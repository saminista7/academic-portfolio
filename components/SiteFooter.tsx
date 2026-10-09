import { profile } from "@/content/profile";
import ExtLink from "./ExtLink";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page site-footer__inner">
        <p className="site-footer__name">{profile.name}</p>
        <ul className="site-footer__links">
          <li>
            <ExtLink href={profile.links.orcid}>ORCID</ExtLink>
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
          <li>
            <ExtLink href={`mailto:${profile.email}`}>Email</ExtLink>
          </li>
        </ul>
        <p className="site-footer__note">Academic CV {profile.cvVersion}</p>
      </div>
    </footer>
  );
}
