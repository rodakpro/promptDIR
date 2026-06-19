import type { MetadataRoute } from "next";
import { categories } from "@/lib/library";
import { SITE_URL } from "@/lib/site";

/**
 * Public, indexable pages only. The library itself is behind the email gate
 * (it 302-redirects), so asset pages are intentionally excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = ["", "/categories", "/json", "/privacy", "/workflows", "/access"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7
    })
  );

  const categoryPages = categories.map((category) => ({
    url: `${SITE_URL}/categories/${category.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6
  }));

  return [...staticPages, ...categoryPages];
}
