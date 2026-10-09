import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /**
   * Suppress the screen-reader "opens in a new tab" hint. Only for links whose
   * visible text already says where it goes and would otherwise read twice.
   */
  silent?: boolean;
};

/**
 * Every link that leaves this site opens in a new tab, so a reader who clicks a
 * DOI mid-page does not lose their place in the portfolio.
 *
 * `rel="noopener noreferrer"` is not optional with target="_blank": without
 * noopener the opened page gets a handle on this one via window.opener.
 *
 * Internal navigation deliberately does NOT use this component. A new tab for
 * every section link would leave a reader with ten tabs of the same site.
 *
 * mailto: and tel: are passed through untouched, because a target on those
 * leaves an orphaned blank tab behind in most browsers once the mail client
 * takes over.
 */
export default function ExtLink({ href, children, silent, ...rest }: Props) {
  const handoff = /^(mailto:|tel:)/i.test(href);

  if (handoff) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      {!silent && <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  );
}
