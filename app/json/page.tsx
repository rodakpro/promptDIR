import type { Metadata } from "next";
import { Braces, Code2, DatabaseZap, FileJson, KeyRound, Terminal } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { PageHero } from "@/components/site/page-hero";
import { CopyButton } from "@/components/site/copy-button";
import { getAssetBySlug, toJsonAsset } from "@/lib/library";

export const metadata: Metadata = {
  title: "JSON & API — PromptDir",
  description:
    "PromptDir is a distribution layer, not an inference API. It returns versioned JSON definitions your own tools consume."
};

const endpoints: { icon: typeof Code2; method: string; path: string; note: string }[] = [
  { icon: DatabaseZap, method: "GET", path: "/api/prompts", note: "List every asset as JSON." },
  { icon: Braces, method: "GET", path: "/api/prompts/:id", note: "A single asset by id." },
  { icon: Code2, method: "GET", path: "/api/categories", note: "Categories with counts." },
  { icon: Code2, method: "GET", path: "/api/categories/:category", note: "Assets in one category." },
  { icon: FileJson, method: "GET", path: "/json/:id.json", note: "Raw JSON file for an asset." },
  { icon: KeyRound, method: "GET", path: "/api/collections/:slug", note: "Pro: your curated library link." }
];

const consume = [
  {
    label: "ChatGPT / Claude",
    body: "Paste the asset URL or JSON as context, then ask the model to run the prompt with your inputs. Nothing you type touches PromptDir."
  },
  {
    label: "MCP server",
    body: "Point a resource at /api/prompts and resolve assets (and agent handoffs) by id at request time."
  },
  {
    label: "n8n / Make / Zapier",
    body: "Use an HTTP Request node to fetch the JSON, map the inputs, and pipe prompt_template into your model node."
  }
];

export default function JsonPage() {
  const sample = getAssetBySlug("digital-product-validator");
  const json = sample ? JSON.stringify(toJsonAsset(sample), null, 2) : "{}";

  return (
    <SiteShell>
      <PageHero
        label="Distribution layer"
        title="PromptDir serves definitions. Your tools do the work."
        intro="The API is not an inference API. It returns versioned JSON definitions that another LLM, CLI, MCP server, automation tool, or app can consume as context. No model runs on our side."
      />

      <div className="mx-auto grid w-full max-w-5xl gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <h2 className="text-xs font-black uppercase tracking-wide text-muted">Endpoints</h2>
          <div className="mt-4 grid gap-2">
            {endpoints.map((endpoint) => {
              const Icon = endpoint.icon;
              return (
                <div
                  key={endpoint.path}
                  className="flex min-w-0 items-center gap-3 rounded-md border border-border-soft bg-panel p-3 shadow-sm"
                >
                  <Icon className="size-5 shrink-0 text-accent" aria-hidden="true" />
                  <div className="min-w-0">
                    <code className="block truncate text-sm font-black text-foreground">
                      <span className="text-accent">{endpoint.method}</span> {endpoint.path}
                    </code>
                    <p className="text-xs font-semibold text-muted">{endpoint.note}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="mt-8 text-xs font-black uppercase tracking-wide text-muted">
            How tools consume it
          </h2>
          <div className="mt-4 grid gap-2">
            {consume.map((item) => (
              <div key={item.label} className="rounded-md border border-border-soft bg-panel p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-black text-foreground">
                  <Terminal className="size-4 text-accent" aria-hidden="true" />
                  {item.label}
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <article className="min-w-0 overflow-hidden rounded-md border border-border-soft bg-panel shadow-[0_18px_50px_rgba(24,24,27,0.08)]">
          <div className="flex items-center justify-between border-b border-border-soft bg-panel-soft px-5 py-3">
            <div className="flex items-center gap-2 text-sm font-black text-muted">
              <Braces className="size-4 text-accent" aria-hidden="true" />
              The JSON contract
            </div>
            <CopyButton value={json} label="Copy" />
          </div>
          <pre className="max-h-[40rem] overflow-auto bg-zinc-950 p-5 font-mono text-xs leading-6 text-zinc-200">
            <code>{json}</code>
          </pre>
        </article>
      </div>
    </SiteShell>
  );
}
