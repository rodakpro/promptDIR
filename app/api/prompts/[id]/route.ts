import { jsonResponse } from "@/lib/api-response";
import { getAllAssets, getAssetById, toJsonAsset } from "@/lib/library";

export function generateStaticParams() {
  return getAllAssets().map((asset) => ({ id: asset.id }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const asset = getAssetById(id);
  if (!asset) {
    return jsonResponse({ error: "not_found", id }, 404);
  }
  return jsonResponse(toJsonAsset(asset));
}
