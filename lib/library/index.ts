import type { AssetType, CategoryId, JsonAsset, LibraryAsset } from "./types";
import { contentAssets } from "./assets-content";
import { researchAssets } from "./assets-research";
import { offerAssets } from "./assets-offers";
import { automationAssets } from "./assets-automation";
import { agentAssets } from "./assets-agents";
import { categories, categoryLabel, categoryMap } from "./categories";

export type { LibraryAsset, JsonAsset, CategoryId } from "./types";
export type { AssetType, Difficulty } from "./types";
export type { CategoryMeta } from "./categories";
export { categories, categoryLabel, categoryMap };

/** Every asset, in a stable order. */
export const assets: LibraryAsset[] = [
  ...contentAssets,
  ...researchAssets,
  ...offerAssets,
  ...automationAssets,
  ...agentAssets
];

const bySlug = new Map(assets.map((a) => [a.slug, a]));
const byId = new Map(assets.map((a) => [a.id, a]));

export function getAllAssets(): LibraryAsset[] {
  return assets;
}

export function getAssetBySlug(slug: string): LibraryAsset | undefined {
  return bySlug.get(slug);
}

export function getAssetById(id: string): LibraryAsset | undefined {
  return byId.get(id);
}

export function getAssetsByCategory(category: CategoryId): LibraryAsset[] {
  return assets.filter((a) => a.category === category);
}

export interface CategoryCount {
  id: CategoryId;
  label: string;
  description: string;
  icon: string;
  count: number;
}

export function getCategoryCounts(): CategoryCount[] {
  return categories.map((category) => ({
    id: category.id,
    label: category.label,
    description: category.description,
    icon: category.icon,
    count: assets.filter((a) => a.category === category.id).length
  }));
}

export interface TypeCount {
  id: AssetType;
  label: string;
  count: number;
}

const typeLabels: Record<AssetType, string> = {
  prompt: "Prompts",
  checklist: "Checklists",
  agent: "Agents",
  workflow: "Workflows"
};

export function getTypeCounts(): TypeCount[] {
  const order: AssetType[] = ["prompt", "checklist", "agent", "workflow"];
  return order.map((id) => ({
    id,
    label: typeLabels[id],
    count: assets.filter((a) => a.type === id).length
  }));
}

/** Filter the library by an optional type, category, and free-text query. */
export function filterAssets(opts: {
  type?: string;
  category?: string;
  query?: string;
}): LibraryAsset[] {
  const q = opts.query?.trim().toLowerCase();
  return assets.filter((asset) => {
    if (opts.type && asset.type !== opts.type) return false;
    if (opts.category && asset.category !== opts.category) return false;
    if (q) {
      const haystack = `${asset.title} ${asset.promise} ${asset.summary} ${asset.tags.join(" ")}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

/** Resolve related ids to assets that actually exist in the library. */
export function getRelatedAssets(asset: LibraryAsset): LibraryAsset[] {
  return (asset.related ?? [])
    .map((id) => byId.get(id))
    .filter((a): a is LibraryAsset => Boolean(a));
}

/** Convert a typed asset into the public JSON contract. */
export function toJsonAsset(asset: LibraryAsset): JsonAsset {
  const inputs: JsonAsset["inputs"] = {};
  for (const input of asset.inputs) {
    inputs[input.name] = {
      type: input.type,
      required: input.required,
      description: input.description
    };
  }

  const outputSchema: JsonAsset["output_schema"] = {};
  for (const field of asset.outputFields) {
    outputSchema[field.field] = field.type;
  }

  const json: JsonAsset = {
    id: asset.id,
    slug: asset.slug,
    type: asset.type,
    title: asset.title,
    summary: asset.summary,
    category: asset.category,
    tags: asset.tags,
    difficulty: asset.difficulty,
    best_for: asset.bestFor,
    inputs,
    output_schema: outputSchema,
    compatible_with: asset.compatibleWith,
    automation_notes: asset.automationNotes,
    version: asset.version,
    license: asset.license,
    updated_at: asset.updatedAt
  };

  if (asset.notFor) json.not_for = asset.notFor;
  if (asset.systemPrompt) json.system_prompt = asset.systemPrompt;
  if (asset.type === "agent") {
    if (asset.role) json.role = asset.role;
    if (asset.goals) json.goals = asset.goals;
    if (asset.workflowSteps) json.workflow = asset.workflowSteps;
    if (asset.toolsNeeded) json.tools_needed = asset.toolsNeeded;
    if (asset.handoffs) json.handoff_prompts = asset.handoffs;
  } else {
    json.prompt_template = asset.promptTemplate;
  }
  if (asset.n8n) json.n8n = asset.n8n;

  return json;
}

/** Lean shape for cards and the client-side browser (no heavy prompt bodies). */
export type AssetSummary = Pick<
  LibraryAsset,
  "id" | "slug" | "title" | "promise" | "type" | "category" | "tags" | "difficulty"
>;

export function toSummary(asset: LibraryAsset): AssetSummary {
  return {
    id: asset.id,
    slug: asset.slug,
    title: asset.title,
    promise: asset.promise,
    type: asset.type,
    category: asset.category,
    tags: asset.tags,
    difficulty: asset.difficulty
  };
}

export const TOTAL_ASSETS = assets.length;
