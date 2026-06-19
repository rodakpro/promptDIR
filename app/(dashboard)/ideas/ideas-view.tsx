"use client";

import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { fetchIdeas, queryKeys } from "@/lib/api";
import { cn } from "@/lib/utils";
import { KanbanBoard } from "@/components/kanban/board";
import { DataTable } from "@/components/data-table/data-table";
import { ideaColumns } from "./columns";

const tabs = [
  { id: "board", label: "Board" },
  { id: "list", label: "List" }
] as const;

export function IdeasView() {
  // View persists in the URL (?view=list) — shareable + survives reload.
  const [view, setView] = useQueryState("view", { defaultValue: "board" });
  const { data: ideas = [] } = useQuery({ queryKey: queryKeys.ideas, queryFn: fetchIdeas });

  return (
    <div className="space-y-6">
      <div className="flex gap-6 border-b border-border-soft">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setView(tab.id)}
            className={cn(
              "focus-ring -mb-px border-b-2 pb-2 text-sm font-semibold transition",
              view === tab.id
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {view === "list" ? (
        <DataTable columns={ideaColumns} data={ideas} />
      ) : (
        <KanbanBoard />
      )}
    </div>
  );
}
