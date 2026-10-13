"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  /** Stagger inside a group, in ms. Keep it small. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
}

/**
 * Fades in once on first intersection, then stops observing. It never hides
 * again on scroll up, which would just make the page annoying to reread.
 *
 * Under reduced motion it shows immediately without observing anything. The CSS
 * neutralises the transform too, so nothing here can strand content invisible.
 */
export default function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
