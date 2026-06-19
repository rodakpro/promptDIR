import type { CategoryId } from "./types";

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  description: string;
  /** lucide-react icon name. */
  icon: string;
}

/** The eight jobs a solo creator-business repeats, in workflow order. */
export const categories: CategoryMeta[] = [
  {
    id: "audience_research",
    label: "Audience Research",
    description: "Find pains, objections, language, and buying signals.",
    icon: "Search"
  },
  {
    id: "content_strategy",
    label: "Content Strategy",
    description: "Plan pillars, campaigns, topics, and publishing priorities.",
    icon: "Compass"
  },
  {
    id: "content_production",
    label: "Content Production",
    description: "Draft posts, newsletters, scripts, hooks, and outlines.",
    icon: "PenLine"
  },
  {
    id: "repurposing",
    label: "Repurposing",
    description: "Convert one asset into platform-native follow-up content.",
    icon: "Repeat2"
  },
  {
    id: "offer_creation",
    label: "Offer Creation",
    description: "Validate, package, price, and position creator products.",
    icon: "PackageCheck"
  },
  {
    id: "sales_growth",
    label: "Sales & Growth",
    description: "Build launches, lead magnets, pitches, and conversion assets.",
    icon: "TrendingUp"
  },
  {
    id: "automation",
    label: "Automation",
    description: "Map repeatable creator work into n8n, Make, Zapier, or APIs.",
    icon: "Workflow"
  },
  {
    id: "business_management",
    label: "Business Management",
    description: "Run reviews, decision logs, experiments, and operating rhythms.",
    icon: "LayoutDashboard"
  }
];

export const categoryMap: Record<CategoryId, CategoryMeta> = categories.reduce(
  (acc, category) => {
    acc[category.id] = category;
    return acc;
  },
  {} as Record<CategoryId, CategoryMeta>
);

export function categoryLabel(id: CategoryId): string {
  return categoryMap[id]?.label ?? id;
}
