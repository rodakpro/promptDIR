import Link from "next/link";
import {
  ArrowRight,
  Braces,
  CircleDot,
  FileJson,
  PackageCheck,
  ShieldCheck,
  Workflow
} from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { SectionLabel } from "@/components/site/section-label";
import { EmailCapture } from "@/components/site/email-capture";
import { AssetCard } from "@/components/site/asset-card";
import {
  getAssetBySlug,
  getCategoryCounts,
  toJsonAsset,
  toSummary,
  TOTAL_ASSETS,
  type LibraryAsset
} from "@/lib/library";

const featuredSlugs = [
  "audience-pain-finder",
  "content-strategist-agent",
  "digital-product-validator",
  "newsletter-to-linkedin",
  "linkedin-post-generator",
  "n8n-workflow-planner"
];

const privacyRules = [
  "No uploaded code, files, emails, or customer data.",
  "No stored prompts, transcripts, or private chats.",
  "No server-side model runs, token billing, or hidden inference.",
  "Only versioned assets, collections, hashed keys, and aggregate rate limits."
];

export default function Home() {
  const featured = featuredSlugs
    .map((slug) => getAssetBySlug(slug))
    .filter((asset): asset is LibraryAsset => Boolean(asset));
  const categoryCounts = getCategoryCounts();
  const sample = getAssetBySlug("digital-product-validator");
  const json = sample ? JSON.stringify(toJsonAsset(sample), null, 2) : "{}";

  return (
    <SiteShell>
      <section className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10 lg:py-24">
        <div>
          <SectionLabel>Prompt + agent + checklist + workflow JSON library</SectionLabel>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-none text-foreground sm:text-6xl sm:leading-[0.96]">
            PromptDir turns creator workflows into importable AI assets.
          </h1>
          <p className="mt-5 max-w-xl text-base font-bold leading-7 text-muted sm:text-lg sm:leading-8">
            A privacy-first directory for creator-solopreneurs: browse human-readable prompts,
            download versioned JSON, and wire the same assets into your own LLM, CLI, MCP server,
            or n8n workflow.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/library"
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-black text-white shadow-[0_10px_24px_rgba(255,90,20,0.22)] transition hover:-translate-y-0.5 hover:bg-accent/90"
            >
              Browse the library
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/json"
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border-soft bg-panel px-5 text-sm font-black text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-border"
            >
              <FileJson className="size-4" aria-hidden="true" />
              View JSON contract
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-2 text-[0.68rem] font-black uppercase text-muted">
            {["Execution stays on your stack", "Stable versioned IDs", "Built for ChatGPT, Claude, MCP, n8n"].map(
              (item) => (
                <span key={item} className="rounded-full border border-border-soft bg-panel px-3 py-1 shadow-sm">
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        <article className="min-w-0 overflow-hidden rounded-md border border-border-soft bg-panel shadow-[0_18px_50px_rgba(24,24,27,0.08)]">
          <div className="flex items-center justify-between border-b border-border-soft bg-panel-soft px-5 py-3">
            <div className="flex items-center gap-2 text-sm font-black text-muted">
              <Braces className="size-4 text-accent" aria-hidden="true" />
              {sample ? sample.id : "asset.json"}
            </div>
            <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-black text-accent">
              v1.0.0
            </span>
          </div>
          <pre className="max-h-[28rem] overflow-auto bg-zinc-950 p-5 font-mono text-xs leading-6 text-zinc-200">
            <code>{json}</code>
          </pre>
        </article>
      </section>

      <section className="border-y border-border-soft bg-panel/70">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel>Starter library</SectionLabel>
              <h2 className="mt-5 max-w-md text-3xl font-black leading-tight sm:text-4xl">
                {TOTAL_ASSETS} assets, each a page for humans and a contract for machines.
              </h2>
            </div>
            <Link
              href="/library"
              className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md border border-border-soft bg-panel px-4 text-sm font-black text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-border"
            >
              Open library
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((asset) => (
              <AssetCard key={asset.id} asset={toSummary(asset)} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:py-20">
        <div>
          <SectionLabel>Creator jobs</SectionLabel>
          <h2 className="mt-5 max-w-md text-3xl font-black leading-tight sm:text-4xl">
            Organized around the work a solo creator repeats every week.
          </h2>
          <p className="mt-4 max-w-md text-base font-semibold leading-7 text-muted">
            PromptDir categories follow the business workflow: research the audience, publish
            consistently, validate offers, and automate repeatable operations.
          </p>
          <Link
            href="/categories"
            className="focus-ring mt-6 inline-flex min-h-10 items-center gap-2 rounded-md border border-border-soft bg-panel px-4 text-sm font-black text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-border"
          >
            All categories
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {categoryCounts.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="focus-ring rounded-md border border-border-soft bg-panel p-5 shadow-[0_12px_30px_rgba(24,24,27,0.05)] transition hover:-translate-y-0.5 hover:border-border"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-black text-foreground">
                  <CircleDot className="size-4 text-accent" aria-hidden="true" />
                  {category.label}
                </div>
                <span className="text-[0.64rem] font-black uppercase text-muted">
                  {category.count}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-muted">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border-soft bg-panel/70">
        <div className="mx-auto grid w-full max-w-5xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <div>
            <SectionLabel>Privacy-first</SectionLabel>
            <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
              The strongest product claim is what PromptDir never touches.
            </h2>
            <p className="mt-4 text-base font-semibold leading-7 text-muted">
              PromptDir distributes prompt and agent definitions. It never receives the private
              business context that users feed to their own tools.
            </p>
            <Link
              href="/privacy"
              className="focus-ring mt-6 inline-flex min-h-10 items-center gap-2 rounded-md border border-border-soft bg-panel px-4 text-sm font-black text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-border"
            >
              How privacy works
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {privacyRules.map((rule) => (
              <article key={rule} className="rounded-md border border-border-soft bg-panel p-5 shadow-sm">
                <ShieldCheck className="size-5 text-accent" aria-hidden="true" />
                <p className="mt-4 text-sm font-bold leading-6 text-foreground">{rule}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionLabel>Launch pack</SectionLabel>
            <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
              Run your creator business like a one-person company.
            </h2>
            <p className="mt-4 max-w-md text-base font-semibold leading-7 text-muted">
              Free assets stay public. Join the list for the JSON pack, n8n structures, and weekly
              additions — then upgrade later for keys, private collections, and custom JSON.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/access"
                className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-black text-white shadow-[0_10px_24px_rgba(255,90,20,0.22)] transition hover:-translate-y-0.5 hover:bg-accent/90"
              >
                <PackageCheck className="size-4" aria-hidden="true" />
                Get free access
              </Link>
              <Link
                href="/workflows"
                className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border-soft bg-panel px-5 text-sm font-black text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-border"
              >
                <Workflow className="size-4" aria-hidden="true" />
                See workflows
              </Link>
            </div>
          </div>
          <div className="rounded-md border border-border-soft bg-panel p-6 shadow-[0_12px_30px_rgba(24,24,27,0.05)]">
            <h3 className="text-xl font-black text-foreground">Get the free JSON pack</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted">
              The first PromptDir asset pack, plus weekly drops.
            </p>
            <div className="mt-5">
              <EmailCapture id="home-email" buttonLabel="Join the list" />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
