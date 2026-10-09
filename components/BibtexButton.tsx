"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Copy BibTeX to the clipboard, with a textarea fallback for the browsers and
 * insecure-origin cases where the async Clipboard API is unavailable. Falling
 * back matters more than usual here: the whole point of the button is that a
 * reader can cite the paper without retyping it.
 */
export default function BibtexButton({ bibtex, title }: { bibtex: string; title: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function flash(next: "copied" | "failed") {
    setState(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  }

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(bibtex);
        flash("copied");
        return;
      }
      throw new Error("no clipboard api");
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = bibtex;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        flash(ok ? "copied" : "failed");
      } catch {
        flash("failed");
      }
    }
  }

  return (
    <button type="button" className="bibtex-button" onClick={copy} data-state={state}>
      <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
        {state === "copied" ? (
          <path
            d="M4 10.5l4 4 8-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="7" y="3" width="10" height="12" rx="1.5" />
            <path d="M13 17H4.5A1.5 1.5 0 0 1 3 15.5V6" />
          </g>
        )}
      </svg>
      {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "BibTeX"}
      <span className="visually-hidden">
        {state === "copied" ? `: BibTeX for ${title} copied` : ` for ${title}`}
      </span>
    </button>
  );
}
