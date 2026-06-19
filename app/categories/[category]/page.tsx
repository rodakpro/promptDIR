import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { PageHero } from "@/components/site/page-hero";
import { AssetCard } from "@/components/site/asset-card";
import {
  categories,
  categoryMap,
  getAssetsByCategory,
  toSummary,
  type CategoryId
} from "@/lib/library";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }));
}

function isCategoryId(value: string): value is CategoryId {
  return categories.some((c) => c.id === value);
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isCategoryId(category)) return { title: "Not found — PromptDir" };
  const meta = categoryMap[category];
  return {
    title: `${meta.label} — PromptDir`,
    description: meta.description
  };
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isCategoryId(category)) notFound();

  const meta = categoryMap[category];
  const assets = getAssetsByCategory(category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${meta.label} — PromptDir`,
    description: meta.description,
    url: `${SITE_URL}/categories/${category}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: assets.length,
      itemListElement: assets.map((asset, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: asset.title,
        description: asset.promise
      }))
    }
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero label="Category" title={meta.label} intro={meta.description} />
      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8">
        <Link
          href="/categories"
          className="focus-ring inline-flex items-center gap-2 rounded-md text-sm font-black text-muted transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All categories
        </Link>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <AssetCard key={asset.id} asset={toSummary(asset)} />
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
