import Link from "next/link";
import { Library, LogIn, PackageCheck } from "lucide-react";
import { siteNav, SITE_NAME, SITE_PARENT } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md">
          <span className="flex size-8 items-center justify-center rounded-md bg-accent text-white">
            <Library className="size-4" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-black text-foreground">{SITE_NAME}</span>
            <span className="text-[0.64rem] font-black uppercase text-muted">by {SITE_PARENT}</span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 text-sm font-black text-muted lg:flex"
        >
          {siteNav.map((item) => (
            <Link key={item.href} className="transition hover:text-foreground" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className="focus-ring hidden min-h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-black text-muted transition hover:bg-panel-soft hover:text-foreground sm:inline-flex"
          >
            <LogIn className="size-4" aria-hidden="true" />
            Log in
          </Link>
          <Link
            href="/access"
            className="focus-ring inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-border-soft bg-panel px-4 text-sm font-black text-foreground shadow-soft transition hover:-translate-y-0.5 hover:bg-panel-soft"
          >
            <PackageCheck className="size-4" aria-hidden="true" />
            Get free access
          </Link>
        </div>
      </div>
    </header>
  );
}
