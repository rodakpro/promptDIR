"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { AssetSummary, AssetType, CategoryId } from "@/lib/library";
import { AssetCard } from "./asset-card";

type TypeFilter = "all" | AssetType;
type CategoryFilter = "all" | CategoryId;

interface CategoryOption {
  id: CategoryId;
  label: string;
}

const typeOptions: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "All types" },
  { id: "prompt", label: "Prompts" },
  { id: "checklist", label: "Checklists" },
  { id: "agent", label: "Agents" },
  { id: "workflow", label: "Workflows" }
];

function chipClass(active: boolean) {
  return [
    "focus-ring rounded-full border px-3 py-1.5 text-xs font-black uppercase transition",
    active
      ? "border-[#ff5a14] bg-[#fff2ed] text-[#ff5a14]"
      : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-800"
  ].join(" ");
}

export function LibraryBrowser({
  items,
  categories,
  initialCategory = "all"
}: {
  items: AssetSummary[];
  categories: CategoryOption[];
  initialCategory?: CategoryFilter;
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<TypeFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (type !== "all" && item.type !== type) return false;
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      const haystack = `${item.title} ${item.promise} ${item.tags.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [items, query, type, category]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
            aria-hidden="true"
          />
          <label className="sr-only" htmlFor="library-search">
            Search the library
          </label>
          <input
            id="library-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search prompts, agents, tags…"
            className="focus-ring h-11 w-full rounded-md border border-zinc-200 bg-white pl-9 pr-3 text-sm font-bold text-zinc-950 shadow-sm placeholder:text-zinc-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {typeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setType(option.id)}
              className={chipClass(type === option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={chipClass(category === "all")}
          >
            All categories
          </button>
          {categories.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setCategory(option.id)}
              className={chipClass(category === option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm font-black uppercase text-zinc-500">
        {filtered.length} {filtered.length === 1 ? "asset" : "assets"}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <AssetCard key={item.id} asset={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-zinc-300 bg-white p-10 text-center text-sm font-bold text-zinc-500">
          No assets match those filters yet.
        </div>
      )}
    </div>
  );
}
