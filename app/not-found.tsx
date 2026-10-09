import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page" style={{ paddingBlock: "7rem" }}>
      <p className="eyebrow">404</p>
      <h1 className="section-title">That page does not exist.</h1>
      <p className="lede measure">
        The link may be out of date. Everything on this site is reachable from the front page.
      </p>
      <p style={{ marginTop: "2rem" }}>
        <Link className="btn btn--primary" href="/">
          Back to the start
        </Link>
      </p>
    </div>
  );
}
