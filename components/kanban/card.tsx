"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Copy, User } from "lucide-react";
import type { Idea } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function KanbanCard({ idea, overlay = false }: { idea: Idea; overlay?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: idea.id,
    data: { idea }
  });

  const style = { transform: CSS.Translate.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "glass-panel cursor-grab space-y-3 p-4 active:cursor-grabbing",
        isDragging && "opacity-40",
        overlay && "rotate-2 shadow-panel"
      )}
    >
      <h3 className="font-bold leading-snug tracking-tight">{idea.title}</h3>
      <p className="line-clamp-3 text-sm text-muted">{idea.summary}</p>

      <div className="flex flex-wrap gap-1.5">
        {idea.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <User className="size-3.5" />
          {idea.author} · {formatDate(idea.createdAt)}
        </span>
        <span className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Duplicate" className="size-7">
            <Copy className="size-3.5" />
          </Button>
        </span>
      </div>
    </div>
  );
}
