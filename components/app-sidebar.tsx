"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border-soft bg-panel md:flex">
      <div className="flex items-center gap-2 px-5 py-4">
        <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-white">
          <Icons.Radar className="size-4" />
        </span>
        <span className="font-black tracking-tight">Dashboard</span>
      </div>

      <nav className="flex flex-col gap-1 px-3 py-2">
        {navItems.map((item) => {
          const Icon = (Icons[item.icon as keyof typeof Icons] ??
            Icons.Circle) as Icons.LucideIcon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition",
                active
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:bg-panel-soft hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              <span className="flex-1">{item.label}</span>
              {item.badge ? <Badge variant="count">{item.badge}</Badge> : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
