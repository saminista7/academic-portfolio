import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { publications } from "@/content/publications";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;

  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/cv`, changeFrequency: "monthly", priority: 0.8 },
    ...publications
      .filter((p) => p.detail)
      .map((p) => ({
        url: `${base}/publications/${p.slug}`,
        changeFrequency: "yearly" as const,
        priority: 0.7,
      })),
  ];
}
