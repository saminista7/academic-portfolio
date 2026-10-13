# Academic portfolio

My personal academic site: publications, research statement, applied work and CV.

Live at <https://ahnaf-samin.vercel.app>

## Stack

Next.js 15 (App Router), React 19, TypeScript. Plain CSS with custom properties, no Tailwind
and no component library. Every route prerenders static, so it deploys anywhere and needs no
server at request time.

## Running it

```bash
npm install
npm run dev        # http://localhost:3002
npm run typecheck
npm run build
```

Port 3002 rather than 3000 because 3001 is taken by another project of mine.

## Where the content lives

All the facts sit in `content/` as typed modules. No component hardcodes a claim, so updating
a publication is a one line edit in one file.

| File | Holds |
| --- | --- |
| `content/profile.ts` | Name, links, degree, research statement, objective |
| `content/publications.ts` | Papers and datasets: authors, venue, DOI, metrics, BibTeX |
| `content/experience.ts` | Roles, and the smaller projects that support them |
| `content/skills.ts` | Skills, plus the education and awards timeline |

## Publication metadata

Author lists, titles and dates were taken from Crossref rather than retyped from my CV. If a
paper is ever revised, recheck it the same way:

```bash
curl -s "https://api.crossref.org/works/10.1038/s41598-026-70577-4"
```

Two things that check caught the first time round, both worth knowing about:

* The Frontiers paper is titled "PruDensNet: a parameter efficient depthwise separable CNN for
  MRI-based brain tumor classification". An earlier draft of the site had a different title.
* Its evaluation is not patient-wise. The dataset has no patient identifiers and the paper says
  so in its limitations, so the site describes the pipeline as leakage aware and states that
  limit rather than overclaiming.

## Things worth knowing before editing

* Figures on the site are the published figures. If you change one, change it in the paper first.
* `siteUrl` in `content/profile.ts` drives canonical URLs, the sitemap and the JSON-LD. A stale
  value there quietly points search engines at a domain that does not exist.
* The favicon is `app/icon.svg`. The apple touch icon and the 1200x630 share card are generated
  from the same palette, so keep them in step if the accent colour changes.
* Theme follows the operating system by default. The toggle writes an explicit choice to
  localStorage, and a small inline script in `app/layout.tsx` applies it before first paint so
  the wrong palette never flashes.
* All motion sits behind `prefers-reduced-motion`, and there is a print stylesheet, because
  people do print these.

## Deploying

Connected to Vercel and to this repo, so pushing to `main` redeploys. Manual deploy:

```bash
vercel --prod
```

## Still to do

* No citation counts. They would need a live Scholar scrape and a stale number is worse than a
  link to the live profile.
