import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { publications } from "@/content/publications";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";
import "./components.css";

// next/font self-hosts these at build time, so there is no runtime call to
// Google and the page still works behind a university proxy.
const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-face",
  weight: ["400", "500"],
});

const description =
  "Ahnaf Samin, AI engineer and researcher. Peer-reviewed work in low-resource Bengali NLP, medical imaging, and machine learning for critical infrastructure, published in Scientific Reports, Frontiers in Medicine and at IEEE ICCIT.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} | ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name, url: profile.links.orcid }],
  keywords: [
    "Ahnaf Samin",
    "low-resource NLP",
    "Bengali NLP",
    "medical image analysis",
    "SCADA intrusion detection",
    "anomaly detection",
    "retrieval-augmented generation",
    "responsible AI governance",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: `${profile.name} | ${profile.title}`,
    description,
    url: profile.siteUrl,
    siteName: `${profile.name} | academic portfolio`,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.title}`,
    description,
  },
  robots: { index: true, follow: true },
};

/**
 * JSON-LD so a search for my name ties this site to ORCID and Scholar. One
 * Person with sameAs links, plus one entry per publication carrying its DOI.
 */
function structuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: `mailto:${profile.email}`,
    url: profile.siteUrl,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "ORCID",
      value: profile.orcid,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.degree.institution,
    },
    knowsAbout: profile.researchInterests,
    sameAs: [
      profile.links.orcid,
      profile.links.scholar,
      profile.links.github,
      profile.links.linkedin,
    ],
  };

  const works = publications.map((p) => ({
    "@context": "https://schema.org",
    "@type": p.kind === "dataset" ? "Dataset" : "ScholarlyArticle",
    name: p.title,
    headline: p.title,
    author: { "@type": "Person", name: profile.name },
    datePublished: String(p.year),
    identifier: `https://doi.org/${p.doi}`,
    url: p.url,
    isPartOf: { "@type": "Periodical", name: p.venue },
    abstract: p.summary,
  }));

  return [person, ...works];
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      {/* Do not add a <head> element here. Declaring one stops Next injecting
          its own metadata and empties <title> on every page, with no error.
          Scripts sit at the top of <body>, which still runs before paint. */}
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
