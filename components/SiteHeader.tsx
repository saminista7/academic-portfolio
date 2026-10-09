"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { href: "/#research", label: "Research" },
  { href: "/#publications", label: "Publications" },
  { href: "/#applied", label: "Applied work" },
  { href: "/#record", label: "Record" },
  { href: "/cv", label: "CV" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A route change should never leave the mobile menu hanging open.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="page site-header__inner">
        <Link href="/" className="site-header__name">
          {profile.name}
          <span className="site-header__role">{profile.title}</span>
        </Link>

        <nav aria-label="Sections" className={`site-nav ${open ? "is-open" : ""}`}>
          <ul>
            {sections.map((s) => (
              <li key={s.href}>
                <Link href={s.href} onClick={() => setOpen(false)}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <ThemeToggle />
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">
              {open ? "Close navigation" : "Open navigation"}
            </span>
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path
                d={open ? "M5 5l10 10M15 5L5 15" : "M3 6h14M3 10h14M3 14h14"}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel. Separate node so the desktop nav keeps its own semantics. */}
      <div id="site-nav-mobile" className={`nav-panel ${open ? "is-open" : ""}`} hidden={!open}>
        <ul className="page">
          {sections.map((s) => (
            <li key={s.href}>
              <Link href={s.href} onClick={() => setOpen(false)}>
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
