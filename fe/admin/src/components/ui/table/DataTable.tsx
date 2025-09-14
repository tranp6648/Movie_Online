"use client";
import React from "react";

export type Column<T> = {
  key: keyof T | string;
  header: React.ReactNode;
  cell?: (row: T) => React.ReactNode;
  className?: string;
  sortable?: boolean;
};

export type SortState = { key: string; dir: "asc" | "desc" } | null;

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  sort?: SortState;
  onSortChange?: (s: SortState) => void;
  caption?: React.ReactNode;
  renderActions?: (row: T) => React.ReactNode;
  className?: string;
};

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  sort,
  onSortChange,
  caption,
  renderActions,
  className = "",
}: DataTableProps<T>) {
  const handleSort = (col: Column<T>) => {
    if (!col.sortable || !onSortChange) return;
    if (!sort || sort.key !== (col.key as string)) {
      onSortChange({ key: col.key as string, dir: "asc" });
    } else {
      onSortChange({
        key: col.key as string,
        dir: sort.dir === "asc" ? "desc" : "asc",
      });
    }
  };

  return (
    <div className={`w-full bg-[#111318] ${className}`}>
      {caption && (
        <div className="px-6 py-3 text-sm font-semibold text-gray-200 border-b border-[#151f30]">
          {caption}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-[#151821] text-gray-400">
            <tr>
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  className={`px-4 py-3 text-left font-semibold ${c.className ?? ""}`}
                >
                  <button
                    type="button"
                    onClick={() => handleSort(c)}
                    className={`inline-flex items-center gap-1 ${
                      c.sortable ? "hover:text-white" : "cursor-default"
                    }`}
                  >
                    <span>{c.header}</span>
                    {c.sortable && sort?.key === c.key && (
                      <svg
                        className={`w-3 h-3 transition-transform ${
                          sort.dir === "desc" ? "rotate-180" : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6 15l6-6 6 6H6z" />
                      </svg>
                    )}
                  </button>
                </th>
              ))}
              {renderActions && <th className="px-4 py-3 text-right">ACTIONS</th>}
            </tr>
          </thead>

          <tbody className="text-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (renderActions ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={(row.id as string) ?? idx}
                  className="border-t border-[#151f30] hover:bg-[#141823] transition-colors"
                >
                  {columns.map((c) => (
                    <td key={String(c.key)} className={`px-4 py-4 ${c.className ?? ""}`}>
                      {c.cell ? c.cell(row) : (row as any)[c.key]}
                    </td>
                  ))}
                  {renderActions && (
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">{renderActions(row)}</div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
