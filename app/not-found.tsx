import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto flex w-full max-w-xl flex-col items-center px-5 py-24 text-center sm:py-32">
        <span className="flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Compass className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-muted">404</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-foreground">Page not found</h1>
        <p className="mt-3 text-base font-semibold leading-7 text-muted">
          That link does not exist or has moved. Try the library or head back home.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:brightness-105"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back home
          </Link>
          <Link
            href="/categories"
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border-soft bg-panel px-5 text-sm font-black text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-border"
          >
            Browse categories
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
