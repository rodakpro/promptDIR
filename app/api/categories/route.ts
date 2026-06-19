import { jsonResponse } from "@/lib/api-response";
import { getCategoryCounts } from "@/lib/library";

export function GET() {
  const categories = getCategoryCounts().map((category) => ({
    id: category.id,
    label: category.label,
    description: category.description,
    count: category.count
  }));
  return jsonResponse({ count: categories.length, categories });
}
