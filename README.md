# Academic portfolio — Ahnaf Samin

The academic counterpart to the commercial portfolio. Built for two audiences that ask different
questions than a recruiter does:

- **professors** reading a cold email, who want to know whether the record is real and whether this
  person can originate research rather than execute tasks;
- **scholarship panels** (Erasmus Mundus, DAAD, Fulbright and similar), who are funding a
  direction for several years rather than hiring for a role.

So the site leads with verifiable publications and a research statement, and treats industry work
as evidence of research capability rather than as employment history.

## Run it

```bash
npm install
npm run dev        # http://localhost:3002  (3001 belongs to the Automailer frontend)
npm run typecheck  # tsc --noEmit
npm run build
```

Next.js 15 (App Router) + React 19 + TypeScript. Plain CSS with design tokens, no Tailwind, no UI
library. Everything prerenders static, so it deploys to Vercel with no configuration and would
also survive a static export.

## Where the content lives

All facts sit in typed modules under `content/`, and no component hardcodes a claim. Updating a
publication is a one-line edit in one file.

| File | Holds |
| --- | --- |
| `content/profile.ts` | Identity, links, degree, objective, research statement, the three forward-looking questions |
| `content/publications.ts` | Every paper and dataset: authors, venue, DOI, metrics, BibTeX, per-paper method notes |
| `content/experience.ts` | Huawei and D-Ready, plus the supporting artefacts |
| `content/skills.ts` | Skills with their real level, plus the education and awards timeline |

The upstream source of truth is `backend/profile/applicant_profile.md` in the **Samin-Automailer**
repo. That file is git-ignored there and is the same file every cold-email prompt reads, so the
website and the emails cannot drift apart. When a fact changes, change it there first, then mirror
it into `content/`.

## Rules this site is built on

These are not stylistic preferences. Each one is load-bearing for how a panel reads the page.

1. **Every figure is the published figure.** 0.94 ROC-AUC, 96.05%, 97.82%, 1.46M parameters,
   7.79% power saving, 2,649 sentences. Nothing is rounded up, and every record links out to its
   DOI so it can be checked at source. A dead DOI on an academic site is worse than no site.
2. **Status is "graduate", never "undergraduate".** He holds a B.Sc. conferred in 2024. The words
   "undergraduate student", "final-year", "pursuing a bachelor's" and "computer engineer" are all
   factually wrong and must never appear.
3. **The PruDensNet contribution is stated as it actually was.** He conceived the architecture and
   led the research; he is second by byline. "I co-authored" is true of the byline and false about
   the work, and understating it answers the wrong question.
4. **Skills are precise, but not apologetic.** Each line says what the experience is and never
   rounds it up. It also never apologises: an earlier draft explained at length that C/C++ was
   only coursework, which answered a question no reader had asked and pointed at the weakest
   line on the page. Precision lives in the level text now, not in a disclaimer. No proficiency
   bars either, because a bar invents precision that does not exist.
5. **No em dash in rendered prose.** It is the clearest single tell of machine-written text, and a
   research statement is the applicant's own voice. Code comments may use them; anything a reader
   sees may not. Check with `grep -o '—'` against the served HTML, not against the source.
6. **CGPA appears once, in the record and on the CV page. Never as a hero statistic.**

## Accessibility and robustness

Semantic landmarks with `aria-labelledby` per section, a working skip link, visible focus rings,
AA contrast in both palettes, and keyboard operation for the filters, the BibTeX buttons and the
diagram stepper (including arrow keys between stages). All motion sits behind
`prefers-reduced-motion`, and `Reveal` cannot leave content hidden even if its observer never
fires. There is a print stylesheet, because a panel member may well print this.

The theme has three states: explicit light, explicit dark, and no choice (follows the system). A
tiny inline script in `app/layout.tsx` applies a stored choice before first paint so the wrong
palette never flashes.

## Discoverability

`app/layout.tsx` emits JSON-LD: one `Person` whose `sameAs` points at ORCID, Google Scholar,
GitHub and LinkedIn, plus one `ScholarlyArticle` or `Dataset` per publication carrying its DOI.
Each `/publications/[slug]` page also emits Google Scholar's `citation_*` meta tags, so the page
points at the publisher's copy rather than competing with it. `app/sitemap.ts` and `app/robots.ts`
are generated from the content modules.

## Provenance of the publication records

Author lists, titles, dates and metrics in `content/publications.ts` were verified on
10 October 2026 against **Crossref** (`api.crossref.org/works/<doi>`) and each publisher's own
page, not transcribed from the CV. Crossref is the authoritative record for DOI metadata and is
the fastest way to re-check this if a paper is ever revised:

```bash
curl -s "https://api.crossref.org/works/10.1038/s41598-026-70577-4" | python -m json.tool
```

Two things that check caught, both worth remembering:

- The Frontiers paper's real title is *"PruDensNet: a parameter efficient depthwise separable CNN
  for MRI-based brain tumor classification"*. An earlier draft of this site carried a plausible
  but invented title.
- That paper's evaluation is **not** patient-wise. The source collection carries no patient
  identifiers, and the paper says so in its limitations. The site now describes the pipeline as
  leakage-aware *and states the limit*, which is both accurate and a stronger thing to show a
  panel than a claim that would not survive their reading the paper.

## Known gaps

- **No citation counts.** Deliberate: they would need a live Scholar scrape, and a stale number is
  worse than a link to the live profile.
- **Open Graph image** is not generated yet, so link previews show text only.
- **`profile.siteUrl`** must match the real deployed domain before launch. Canonical URLs, the
  sitemap and the JSON-LD all derive from it.
