export interface NavLink {
  label: string;
  href: string;
}

/** Primary navigation — every item is a real route with its own page. */
export const siteNav: NavLink[] = [
  { label: "Library", href: "/library" },
  { label: "Categories", href: "/categories" },
  { label: "Workflows", href: "/workflows" },
  { label: "JSON", href: "/json" },
  { label: "Privacy", href: "/privacy" }
];

export const SITE_NAME = "PromptDir";
export const SITE_PARENT = "CreatorLab.pro";

/** Canonical site origin. Set NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://promptdir.pro";

export const SITE_DESCRIPTION =
  "A privacy-first prompt, checklist, workflow, and agent JSON library for creator-solopreneurs.";
