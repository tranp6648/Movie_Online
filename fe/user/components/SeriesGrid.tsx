// fe/components/SeriesGrid.tsx
"use client";

import Link from "next/link";
import SeriesCard from "./SeriesCard";
import type { Show } from "@/lib/types";

type GridProps = {
  items: Show[];
  page: number;
  perPage?: number; // mặc định 32
  basePath: string; // ví dụ "/phim-bo"
};

export default function SeriesGrid({
  items,
  page,
  perPage = 32,
  basePath,
}: GridProps) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  const slice = items.slice(start, start + perPage);

  return (
    <>
      {/* Grid: 2 -> 3 -> 4 -> 6 -> 8 cột tùy viewport */}
      <div className="grid gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {slice.map((it) => (
          <SeriesCard key={it.id} item={it} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <PagerButton
          disabled={current <= 1}
          href={`${basePath}?page=${current - 1}`}
          label="‹"
        />
        <div className="rounded-lg bg-white/5 px-4 py-2 text-sm text-white/80 ring-1 ring-white/10">
          Trang <span className="font-semibold text-white">{current}</span>{" "}
          / {totalPages}
        </div>
        <PagerButton
          disabled={current >= totalPages}
          href={`${basePath}?page=${current + 1}`}
          label="›"
        />
      </div>
    </>
  );
}

function PagerButton({
  disabled,
  href,
  label,
}: {
  disabled?: boolean;
  href: string;
  label: string;
}) {
  if (disabled) {
    return (
      <span className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/40 ring-1 ring-white/10">
        {label}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="grid h-10 w-10 place-items-center rounded-full bg-white text-black ring-1 ring-black/10 hover:opacity-90"
    >
      {label}
    </Link>
  );
}
