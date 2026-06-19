export interface NavLink {
  label: string;
  href: string;
}

/** Primary navigation — every item is a real route with its own page. */
export const siteNav: NavLink[] = [
  { label: "Library", href: "/library" },
  { label: "Categories", href: "/categories" },
  { label: "JSON", href: "/json" },
  { label: "Privacy", href: "/privacy" },
  { label: "Workflows", href: "/workflows" },
  { label: "Access", href: "/access" }
];

export const SITE_NAME = "PromptDir";
export const SITE_PARENT = "CreatorLab.pro";
export const SITE_TAGLINE =
  "A privacy-first prompt, checklist, workflow, and agent JSON library for creator-solopreneurs.";
