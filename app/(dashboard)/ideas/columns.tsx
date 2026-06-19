"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Idea } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const ideaColumns: ColumnDef<Idea>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <span className="font-semibold">{row.original.title}</span>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant="accent">{row.original.status}</Badge>
  },
  {
    accessorKey: "tags",
    header: "Tags",
    enableSorting: false,
    cell: ({ row }) => (
      <span className="flex flex-wrap gap-1.5">
        {row.original.tags.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </span>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => <span className="text-muted">{formatDate(row.original.createdAt)}</span>
  }
];
