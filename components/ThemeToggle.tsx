"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Three states: explicit light, explicit dark, and no choice yet (follow the
 * system). Clicking always writes an explicit choice, and it reads whatever is
 * currently showing first so the first click goes the way you expect.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      return;
    }
    setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode can block storage. Not worth failing the click over.
    }
  }

  // Label it only once the theme is resolved, so the a11y name is never wrong.
  const known = theme !== null;
  const label = !known ? "Toggle colour theme" : theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true" focusable="false">
        {theme === "dark" ? (
          // Sun
          <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="10" cy="10" r="3.6" />
            <path d="M10 2v1.8M10 16.2V18M2 10h1.8M16.2 10H18M4.3 4.3l1.3 1.3M14.4 14.4l1.3 1.3M15.7 4.3l-1.3 1.3M5.6 14.4l-1.3 1.3" />
          </g>
        ) : (
          // Moon
          <path
            fill="currentColor"
            d="M12.8 2.6a7.6 7.6 0 1 0 4.6 9.9 6.1 6.1 0 0 1-4.6-9.9z"
          />
        )}
      </svg>
    </button>
  );
}
