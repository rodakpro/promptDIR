import { jsonResponse } from "@/lib/api-response";
import { getAllAssets, getAssetById, toJsonAsset } from "@/lib/library";

export function generateStaticParams() {
  return getAllAssets().map((asset) => ({ file: `${asset.id}.json` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;
  const id = file.endsWith(".json") ? file.slice(0, -5) : file;
  const asset = getAssetById(id);
  if (!asset) {
    return jsonResponse({ error: "not_found", file }, 404);
  }
  return jsonResponse(toJsonAsset(asset));
}
