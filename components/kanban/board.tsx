"use client";

import * as React from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { columns } from "@/lib/data";
import type { Idea, IdeaStatus } from "@/lib/types";
import { fetchIdeas, queryKeys, updateIdeaStatus } from "@/lib/api";
import { KanbanColumn } from "./column";
import { KanbanCard } from "./card";

export function KanbanBoard() {
  const queryClient = useQueryClient();
  const { data: ideas = [], isLoading } = useQuery({
    queryKey: queryKeys.ideas,
    queryFn: fetchIdeas
  });
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: IdeaStatus }) =>
      updateIdeaStatus(id, status),
    // Optimistic update — the card moves instantly, rolls back on error.
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.ideas });
      const previous = queryClient.getQueryData<Idea[]>(queryKeys.ideas);
      queryClient.setQueryData<Idea[]>(queryKeys.ideas, (old = []) =>
        old.map((i) => (i.id === id ? { ...i, status } : i))
      );
      return { previous };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(queryKeys.ideas, ctx.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.ideas })
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const activeIdea = ideas.find((i) => i.id === activeId) ?? null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeIdeaData = ideas.find((i) => i.id === active.id);
    if (!activeIdeaData) return;

    // `over` is either a column (droppable) or another card (sortable).
    const overIdea = ideas.find((i) => i.id === over.id);
    const targetStatus = (overIdea?.status ?? (over.id as IdeaStatus)) as IdeaStatus;

    if (targetStatus && targetStatus !== activeIdeaData.status) {
      mutation.mutate({ id: activeIdeaData.id, status: targetStatus });
    }
  }

  if (isLoading) {
    return <p className="text-sm text-muted">Loading board…</p>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            column={column}
            ideas={ideas.filter((i) => i.status === column.status)}
          />
        ))}
      </div>

      <DragOverlay>{activeIdea ? <KanbanCard idea={activeIdea} overlay /> : null}</DragOverlay>
    </DndContext>
  );
}
