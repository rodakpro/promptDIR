import { jsonResponse } from "@/lib/api-response";
import { getAllAssets, toJsonAsset } from "@/lib/library";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");

  let assets = getAllAssets();
  if (type) assets = assets.filter((a) => a.type === type);
  if (category) assets = assets.filter((a) => a.category === category);
  if (tag) assets = assets.filter((a) => a.tags.includes(tag));

  return jsonResponse({
    count: assets.length,
    assets: assets.map(toJsonAsset)
  });
}
