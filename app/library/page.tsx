import type { Metadata } from "next";
import { Suspense } from "react";
import { LibrarySearch } from "@/components/library/library-search";
import { LibraryAssetCard } from "@/components/library/library-asset-card";
import {
  categoryMap,
  filterAssets,
  toSummary,
  type AssetType,
  type CategoryId
} from "@/lib/library";

export const metadata: Metadata = {
  title: "Library — PromptDir",
  description:
    "Browse the full PromptDir library of prompts, checklists, agents, and workflows for creator-solopreneurs."
};

const typeHeadings: Record<AssetType, { title: string; intro: string }> = {
  prompt: { title: "Prompts", intro: "Single reusable instructions for creator-business tasks." },
  checklist: { title: "Checklists", intro: "Decision and quality-control assets before you ship." },
  agent: { title: "Agents", intro: "Role-based workers with goals, a workflow, and handoffs." },
  workflow: { title: "Workflows", intro: "Multi-step chains for repurposing, research, and ops." }
};

function isCategoryId(value?: string): value is CategoryId {
  return Boolean(value) && value! in categoryMap;
}

function isAssetType(value?: string): value is AssetType {
  return value === "prompt" || value === "checklist" || value === "agent" || value === "workflow";
}

export default async function LibraryPage({
  searchParams
}: {
  searchParams: Promise<{ type?: string; category?: string; q?: string }>;
}) {
  const { type, category, q } = await searchParams;

  const heading = isCategoryId(category)
    ? { title: categoryMap[category].label, intro: categoryMap[category].description }
    : isAssetType(type)
      ? typeHeadings[type]
      : { title: "All assets", intro: "Published resources for running a creator business with AI." };

  const results = filterAssets({ type, category, query: q }).map(toSummary);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-muted">PromptDir library</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-foreground">{heading.title}</h1>
          <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-muted">{heading.intro}</p>
        </div>
        <Suspense fallback={null}>
          <LibrarySearch />
        </Suspense>
      </div>

      <div className="flex items-center justify-between border-b border-border-soft pb-3">
        <p className="text-sm font-black text-foreground">
          {results.length} {results.length === 1 ? "asset" : "assets"}
        </p>
        {q ? <p className="text-xs font-semibold text-muted">Matching “{q}”</p> : null}
      </div>

      {results.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((asset) => (
            <LibraryAssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-10 text-center text-sm font-bold text-muted">
          No assets match those filters yet.
        </div>
      )}
    </div>
  );
}
