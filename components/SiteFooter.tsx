import { profile } from "@/content/profile";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page site-footer__inner">
        <p className="site-footer__name">{profile.name}</p>
        <ul className="site-footer__links">
          <li>
            <a href={profile.links.orcid}>ORCID</a>
          </li>
          <li>
            <a href={profile.links.scholar}>Google Scholar</a>
          </li>
          <li>
            <a href={profile.links.github}>GitHub</a>
          </li>
          <li>
            <a href={profile.links.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`}>Email</a>
          </li>
        </ul>
        <p className="site-footer__note">
          Academic CV {profile.cvVersion}. Every figure on this site is reported at the value
          published in the corresponding paper.
        </p>
      </div>
    </footer>
  );
}
