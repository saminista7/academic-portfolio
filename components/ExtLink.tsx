import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /** Drop the "opens in a new tab" hint when the link text already says so. */
  silent?: boolean;
};

/**
 * Outbound links open in a new tab so clicking a DOI does not lose your place.
 *
 * `rel="noopener"` matters: without it the opened page can reach back through
 * window.opener. Internal links use next/link instead, since a new tab per
 * section would pile up fast. mailto: and tel: skip the target, which otherwise
 * leaves an empty tab behind once the mail client opens.
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
