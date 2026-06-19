import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LibrarySidebar, type NavCount } from "@/components/library/library-sidebar";
import { getCategoryCounts, getTypeCounts } from "@/lib/library";

const typeIcons: Record<string, string> = {
  prompt: "Sparkles",
  checklist: "ClipboardCheck",
  agent: "Bot",
  workflow: "Workflow"
};

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  const categories: NavCount[] = getCategoryCounts().map((c) => ({
    id: c.id,
    label: c.label,
    count: c.count,
    icon: c.icon
  }));
  const types: NavCount[] = getTypeCounts().map((t) => ({
    id: t.id,
    label: t.label,
    count: t.count,
    icon: typeIcons[t.id] ?? "Circle"
  }));

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col overflow-y-auto border-r border-border-soft bg-panel px-4 py-5 lg:flex">
        <Suspense fallback={null}>
          <LibrarySidebar types={types} categories={categories} />
        </Suspense>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border-soft bg-canvas/80 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2">
            <details className="relative lg:hidden">
              <summary className="focus-ring flex size-9 cursor-pointer list-none items-center justify-center rounded-lg border border-border-soft bg-panel text-muted [&::-webkit-details-marker]:hidden">
                <Menu className="size-4" aria-hidden="true" />
                <span className="sr-only">Open navigation</span>
              </summary>
              <div className="absolute left-0 top-full z-40 mt-2 max-h-[80vh] w-72 overflow-y-auto rounded-xl border border-border-soft bg-panel p-4 shadow-panel">
                <Suspense fallback={null}>
                  <LibrarySidebar types={types} categories={categories} />
                </Suspense>
              </div>
            </details>
            <Link
              href="/"
              className="focus-ring rounded-md text-sm font-black text-foreground lg:hidden"
            >
              PromptDir
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="focus-ring hidden min-h-9 items-center justify-center gap-2 rounded-md border border-border-soft bg-panel px-4 text-sm font-black text-foreground shadow-soft transition hover:-translate-y-0.5 hover:bg-panel-soft sm:inline-flex"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Return home
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
