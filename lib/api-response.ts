/**
 * Shared JSON response for the public distribution API.
 *
 * The API is read-only and stateless: it returns versioned definitions and
 * never accepts user content. CORS is open so any LLM, MCP server, or
 * automation tool can fetch assets directly.
 */
export function jsonResponse(data: unknown, status = 200): Response {
  return Response.json(data, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
