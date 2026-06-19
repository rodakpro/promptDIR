import { jsonResponse } from "@/lib/api-response";
import {
  categories,
  categoryMap,
  getAssetsByCategory,
  toJsonAsset,
  type CategoryId
} from "@/lib/library";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }));
}

function isCategoryId(value: string): value is CategoryId {
  return categories.some((c) => c.id === value);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  if (!isCategoryId(category)) {
    return jsonResponse({ error: "not_found", category }, 404);
  }
  const meta = categoryMap[category];
  const assets = getAssetsByCategory(category);
  return jsonResponse({
    id: meta.id,
    label: meta.label,
    description: meta.description,
    count: assets.length,
    assets: assets.map(toJsonAsset)
  });
}
