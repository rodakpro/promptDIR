"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Column as ColumnModel, Idea } from "@/lib/types";
import { KanbanCard } from "./card";

export function KanbanColumn({ column, ideas }: { column: ColumnModel; ideas: Idea[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.status });

  return (
    <div className="flex w-72 shrink-0 flex-col">
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
          {column.label}
        </span>
        <span className="text-xs font-semibold text-muted">{ideas.length}</span>
      </div>

      <div
        ref={setNodeRef}
        className={`flex min-h-32 flex-1 flex-col gap-3 rounded-xl p-2 transition ${
          isOver ? "bg-accent/5 ring-1 ring-accent/30" : "surface-soft"
        }`}
      >
        <SortableContext
          items={ideas.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {ideas.map((idea) => (
            <KanbanCard key={idea.id} idea={idea} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
