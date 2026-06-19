import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bot,
  Braces,
  CircleCheck,
  FileJson,
  Workflow,
  Zap
} from "lucide-react";
import { CopyButton } from "@/components/site/copy-button";
import { LibraryAssetCard } from "@/components/library/library-asset-card";
import {
  categoryLabel,
  getAllAssets,
  getAssetBySlug,
  getRelatedAssets,
  toJsonAsset,
  toSummary,
  type LibraryAsset
} from "@/lib/library";

export function generateStaticParams() {
  return getAllAssets().map((asset) => ({ slug: asset.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const asset = getAssetBySlug(slug);
  if (!asset) return { title: "Not found — PromptDir" };
  return {
    title: `${asset.title} — PromptDir`,
    description: asset.summary
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border-soft pt-8">
      <h2 className="text-xs font-black uppercase tracking-wide text-muted">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function fullPrompt(asset: LibraryAsset) {
  return asset.systemPrompt
    ? `System: ${asset.systemPrompt}\n\n${asset.promptTemplate}`
    : asset.promptTemplate;
}

export default async function AssetPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const asset = getAssetBySlug(slug);
  if (!asset) notFound();

  const json = JSON.stringify(toJsonAsset(asset), null, 2);
  const related = getRelatedAssets(asset);
  const isAgent = asset.type === "agent";
  const typeLabel = asset.type.charAt(0).toUpperCase() + asset.type.slice(1);

  return (
    <article className="mx-auto w-full max-w-3xl">
      <Link
        href="/library"
        className="focus-ring inline-flex items-center gap-2 rounded-md text-sm font-black text-muted transition hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Library
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-black uppercase text-accent">
          {typeLabel}
        </span>
        <Link
          href={`/library?category=${asset.category}`}
          className="focus-ring rounded-full border border-border-soft bg-panel px-2.5 py-1 text-xs font-black uppercase text-muted transition hover:text-foreground"
        >
          {categoryLabel(asset.category)}
        </Link>
        <span className="rounded-full border border-border-soft bg-panel px-2.5 py-1 text-xs font-black uppercase text-muted">
          {asset.difficulty}
        </span>
        <span className="rounded-full border border-border-soft bg-panel px-2.5 py-1 text-xs font-black uppercase text-muted">
          {asset.estimatedTimeMinutes} min
        </span>
      </div>

      <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-foreground">
        {asset.title}
      </h1>
      <p className="mt-3 text-lg font-bold text-muted">{asset.promise}</p>
      <p className="mt-3 font-mono text-xs font-black text-accent">{asset.id}</p>

      <div className="mt-10 space-y-8">
        <Section title="Creator use case">
          <p className="text-base font-semibold leading-7 text-foreground">{asset.useCase}</p>
        </Section>

        <Section title="When to use it">
          <ul className="space-y-2">
            {asset.whenToUse.map((item) => (
              <li key={item} className="flex gap-2 text-base font-semibold text-foreground">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Inputs required">
          <div className="overflow-hidden rounded-xl border border-border-soft">
            {asset.inputs.map((input) => (
              <div
                key={input.name}
                className="grid grid-cols-1 gap-1 border-b border-border-soft p-3 last:border-0 sm:grid-cols-[10rem_1fr]"
              >
                <div className="flex items-center gap-2">
                  <code className="text-sm font-black text-foreground">{input.name}</code>
                  {input.required ? (
                    <span className="rounded-full bg-accent/10 px-1.5 py-0.5 text-[0.6rem] font-black uppercase text-accent">
                      required
                    </span>
                  ) : null}
                </div>
                <p className="text-sm font-semibold text-muted">{input.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {isAgent ? (
          <Section title="Agent role and goals">
            <div className="space-y-4">
              {asset.role ? (
                <p className="text-base font-semibold leading-7 text-foreground">{asset.role}</p>
              ) : null}
              {asset.goals ? (
                <ul className="space-y-2">
                  {asset.goals.map((goal) => (
                    <li key={goal} className="flex gap-2 text-sm font-semibold text-foreground">
                      <Bot className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                      {goal}
                    </li>
                  ))}
                </ul>
              ) : null}
              {asset.workflowSteps ? (
                <ol className="space-y-2">
                  {asset.workflowSteps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm font-semibold text-foreground">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[0.65rem] font-black text-accent">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          </Section>
        ) : null}

        <Section title="The prompt">
          <div className="overflow-hidden rounded-xl border border-border-soft bg-zinc-950">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
              <span className="font-mono text-xs font-black text-zinc-400">prompt</span>
              <CopyButton value={fullPrompt(asset)} label="Copy prompt" />
            </div>
            <pre className="max-h-[28rem] overflow-auto p-4 font-mono text-xs leading-6 text-zinc-200">
              <code>{fullPrompt(asset)}</code>
            </pre>
          </div>
        </Section>

        <Section title="Output format">
          <div className="overflow-hidden rounded-xl border border-border-soft">
            {asset.outputFields.map((field) => (
              <div
                key={field.field}
                className="grid grid-cols-1 gap-1 border-b border-border-soft p-3 last:border-0 sm:grid-cols-[10rem_1fr]"
              >
                <div className="flex flex-col gap-1">
                  <code className="text-sm font-black text-foreground">{field.field}</code>
                  <code className="text-[0.7rem] font-bold text-accent">{field.type}</code>
                </div>
                <p className="text-sm font-semibold text-muted">{field.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Example output">
          <pre className="overflow-auto rounded-xl border border-border-soft bg-panel-soft p-4 text-sm font-semibold leading-6 text-foreground">
            <code className="whitespace-pre-wrap">{asset.exampleOutput}</code>
          </pre>
        </Section>

        <Section title="JSON version">
          <div className="overflow-hidden rounded-xl border border-border-soft bg-zinc-950">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
              <span className="flex items-center gap-2 font-mono text-xs font-black text-zinc-400">
                <Braces className="size-3.5 text-accent" aria-hidden="true" />
                {asset.id}
              </span>
              <CopyButton value={json} label="Copy JSON" />
            </div>
            <pre className="max-h-[30rem] overflow-auto p-4 font-mono text-xs leading-6 text-zinc-200">
              <code>{json}</code>
            </pre>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={`/json/${asset.id}.json`}
              className="focus-ring inline-flex items-center gap-2 rounded-lg border border-border-soft bg-panel px-3 py-1.5 text-xs font-black text-foreground shadow-soft transition hover:bg-panel-soft"
            >
              <FileJson className="size-3.5 text-accent" aria-hidden="true" />
              Raw .json
            </a>
            <a
              href={`/api/prompts/${asset.id}`}
              className="focus-ring inline-flex items-center gap-2 rounded-lg border border-border-soft bg-panel px-3 py-1.5 text-xs font-black text-foreground shadow-soft transition hover:bg-panel-soft"
            >
              <Braces className="size-3.5 text-accent" aria-hidden="true" />
              API endpoint
            </a>
          </div>
        </Section>

        <Section title="Automation use">
          <div className="glass-panel p-4">
            <p className="flex gap-2 text-sm font-semibold text-foreground">
              <Zap className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              {asset.automationNotes}
            </p>
            {asset.n8n ? (
              <div className="mt-4 grid gap-2 border-t border-border-soft pt-4 text-xs font-bold text-muted sm:grid-cols-3">
                <div>
                  <p className="uppercase text-muted/70">Trigger</p>
                  <p className="mt-1 text-foreground">{asset.n8n.trigger}</p>
                </div>
                <div>
                  <p className="uppercase text-muted/70">Nodes</p>
                  <p className="mt-1 text-foreground">{asset.n8n.nodes.join(", ")}</p>
                </div>
                <div>
                  <p className="uppercase text-muted/70">Output</p>
                  <p className="mt-1 text-foreground">{asset.n8n.outputs.join(", ")}</p>
                </div>
              </div>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border-soft pt-4">
              {asset.compatibleWith.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-border-soft bg-panel-soft px-2 py-0.5 text-[0.65rem] font-black uppercase text-muted"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Section>

        {related.length > 0 ? (
          <Section title="Related assets">
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <LibraryAssetCard key={item.id} asset={toSummary(item)} />
              ))}
            </div>
          </Section>
        ) : null}
      </div>

      <div className="glass-panel mt-12 p-6">
        <div className="flex items-center gap-2 text-sm font-black text-accent">
          <Workflow className="size-4" aria-hidden="true" />
          Automate this asset
        </div>
        <h3 className="mt-3 text-xl font-black text-foreground">
          Want this prompt as infrastructure?
        </h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-muted">
          Copy the JSON, point your LLM, MCP server, or n8n workflow at the endpoint, and keep
          execution on your own stack. Join the list for the full pack and weekly additions.
        </p>
        <Link
          href="/access"
          className="focus-ring mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-black text-white shadow-glow transition hover:brightness-105"
        >
          Get the JSON pack
        </Link>
      </div>
    </article>
  );
}
