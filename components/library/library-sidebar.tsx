"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavCount {
  id: string;
  label: string;
  count: number;
  icon: string;
}

function resolveIcon(name: string): Icons.LucideIcon {
  return (Icons[name as keyof typeof Icons] ?? Icons.Circle) as Icons.LucideIcon;
}

function NavRow({
  href,
  icon,
  label,
  count,
  active,
  muted = false
}: {
  href: string;
  icon: string;
  label: string;
  count?: number;
  active: boolean;
  muted?: boolean;
}) {
  const Icon = resolveIcon(icon);
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition",
        active
          ? "bg-accent/10 text-accent"
          : muted
            ? "text-muted/60 hover:bg-panel-soft hover:text-foreground"
            : "text-muted hover:bg-panel-soft hover:text-foreground"
      )}
    >
      <Icon className={cn("size-4 shrink-0", active && "text-accent")} aria-hidden="true" />
      <span className="flex-1 truncate">{label}</span>
      {typeof count === "number" ? (
        <span className="shrink-0 text-xs font-bold text-muted">{count}</span>
      ) : null}
    </Link>
  );
}

function SectionLabel({ icon, children }: { icon: string; children: React.ReactNode }) {
  const Icon = resolveIcon(icon);
  return (
    <div className="flex items-center gap-2 px-3 pb-2 pt-1">
      <Icon className="size-3.5 text-foreground" aria-hidden="true" />
      <span className="text-xs font-black uppercase tracking-[0.12em] text-foreground">
        {children}
      </span>
    </div>
  );
}

export function LibrarySidebar({
  types,
  categories
}: {
  types: NavCount[];
  categories: NavCount[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const onLibrary = pathname === "/library";
  const activeType = onLibrary ? searchParams.get("type") : null;
  const activeCategory = onLibrary ? searchParams.get("category") : null;
  const browseActive = onLibrary && !activeType && !activeCategory;

  return (
    <div className="flex h-full flex-col">
      <Link href="/" className="focus-ring flex items-center gap-2.5 rounded-lg px-2 py-1">
        <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-white">
          <Icons.Library className="size-4" aria-hidden="true" />
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-sm font-black tracking-tight text-foreground">PromptDir</span>
          <span className="text-[0.6rem] font-black uppercase tracking-wide text-muted">
            by CreatorLab.pro
          </span>
        </span>
      </Link>

      <Link
        href="/"
        className="focus-ring mt-5 flex items-center gap-3 rounded-xl border border-border-soft bg-panel-soft/60 px-3 py-2.5 transition hover:border-accent/40"
      >
        <span className="flex size-8 items-center justify-center rounded-lg border border-border-soft bg-panel">
          <Icons.Lightbulb className="size-4 text-accent" aria-hidden="true" />
        </span>
        <span className="text-sm font-black text-foreground">What is PromptDir?</span>
      </Link>

      <nav className="mt-5 flex-1 space-y-5 overflow-y-auto pb-4">
        <div className="space-y-0.5">
          <NavRow href="/library" icon="LayoutGrid" label="Browse all" active={browseActive} />
          {types.map((type) => (
            <NavRow
              key={type.id}
              href={`/library?type=${type.id}`}
              icon={type.icon}
              label={type.label}
              count={type.count}
              active={activeType === type.id}
            />
          ))}
        </div>

        <div>
          <SectionLabel icon="LayoutDashboard">Categories</SectionLabel>
          <div className="space-y-0.5">
            {categories.map((category) => (
              <NavRow
                key={category.id}
                href={`/library?category=${category.id}`}
                icon={category.icon}
                label={category.label}
                count={category.count}
                active={activeCategory === category.id}
              />
            ))}
          </div>
        </div>

        <div>
          <SectionLabel icon="Braces">For builders</SectionLabel>
          <div className="space-y-0.5">
            <NavRow href="/json" icon="KeyRound" label="API for agents" active={pathname === "/json"} />
            <NavRow href="/privacy" icon="ShieldCheck" label="Privacy" active={pathname === "/privacy"} />
            <NavRow href="/workflows" icon="Workflow" label="Workflow graph" active={pathname === "/workflows"} />
          </div>
        </div>
      </nav>

      <Link
        href="/access"
        className="focus-ring mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-sm font-black text-white shadow-glow transition hover:brightness-105"
      >
        <Icons.PackageCheck className="size-4" aria-hidden="true" />
        Get free access
      </Link>
    </div>
  );
}
