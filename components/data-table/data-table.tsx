"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState
} from "@tanstack/react-table";
import { ArrowUpDown, Search } from "lucide-react";

/**
 * Generic, reusable table built on TanStack Table v8.
 * Sortable headers + global search out of the box.
 */
export function DataTable<TData, TValue>({
  columns,
  data
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <div className="space-y-3">
      <div className="relative max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search…"
          className="focus-ring h-10 w-full rounded-lg border border-border-soft bg-panel pl-9 pr-3 text-sm"
        />
      </div>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id} className="border-b border-border-soft text-left">
                {group.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 font-semibold text-muted">
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        className="focus-ring inline-flex items-center gap-1.5"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() ? (
                          <ArrowUpDown className="size-3.5 opacity-60" />
                        ) : null}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-border-soft last:border-0 hover:bg-panel-soft"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-muted">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
