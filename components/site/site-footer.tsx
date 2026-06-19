import Link from "next/link";
import { Library } from "lucide-react";
import { siteNav, SITE_NAME, SITE_PARENT } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-soft bg-canvas">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 font-black text-foreground">
            <Library className="size-5 text-accent" aria-hidden="true" />
            {SITE_NAME}
          </div>
          <p className="mt-2 text-sm font-semibold text-muted">
            Privacy-first prompt infrastructure by {SITE_PARENT}.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm font-black text-muted" aria-label="Footer navigation">
          {siteNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm font-semibold text-muted">
          © {new Date().getFullYear()} {SITE_PARENT}
        </p>
      </div>
    </footer>
  );
}
