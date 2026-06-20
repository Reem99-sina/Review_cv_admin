"use client";

import { ReactNode, useMemo, useState } from "react";
import StableButton from "./button";

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;
};

export default function DataTable<T>({
  columns,
  data,
  itemsPerPage = 5,
}: Props<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return (
    <div className="rounded-xl bg-secondary">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-text-custom border-b border-white/10">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="p-3">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-slate-800"
                >
                  No Properties Found
                </td>
              </tr>
            ) : (
              paginatedData.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-white/10 hover:bg-white/5 transition text-text-custom"
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="p-3">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t border-white/10">
          <StableButton
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white disabled:opacity-50"
          >
            Previous
          </StableButton>

          <div className="flex gap-2">
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <StableButton
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {page}
              </StableButton>
            ))}
          </div>

          <StableButton
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white disabled:opacity-50"
          >
            Next
          </StableButton>
        </div>
      )}
    </div>
  );
}