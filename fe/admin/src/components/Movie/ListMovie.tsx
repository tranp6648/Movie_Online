"use client";

import { useMemo, useState } from "react";
import { Column, DataTable, SortState } from "@/components/ui/table/DataTable";
import Pagination from "@/components/ui/table/Pagination";
import { Movie } from "@/type/Movie/movie";


const ALL: Movie[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  title: [
    "I Dream in Another Language",
    "The Forgotten Road",
    "Whitney",
    "Red Sky at Night",
    "Into the Unknown",
    "The Unseen Journey",
    "Savage Beauty",
    "Endless Horizon",
  ][i % 8],
  rating: [7.9, 7.1, 6.3, 8.4][i % 4],
  category: ["Movie", "TV Series", "Cartoon"][i % 3],
  views: [1392, 1093, 723, 2457, 5092, 2713, 901, 8430][i % 8],
  status: i % 4 === 0 ? "Hidden" : "Visible",
  created: ["05.02.2023", "04.02.2023", "03.02.2023", "02.02.2023"][i % 4],
}));

const Star = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-yellow-400 fill-current">
    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.169L12 18.897l-7.335 3.869 1.401-8.169L.132 9.21l8.2-1.192L12 .587z" />
  </svg>
);

export default function ListMovie() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [sort, setSort] = useState<SortState>(null);

  const columns = useMemo<Column<Movie>[]>(() => [
    { key: "id", header: "ID", className: "w-16 text-gray-400", sortable: true },
    { key: "title", header: "TITLE", className: "min-w-[220px] font-medium" },
    {
      key: "rating",
      header: "RATING",
      sortable: true,
      className: "w-32",
      cell: (r) => (
        <div className="flex items-center gap-2 font-semibold">
          <Star /> <span className="text-yellow-300">{r.rating.toFixed(1)}</span>
        </div>
      ),
    },
    { key: "category", header: "CATEGORY", className: "w-32 text-gray-300" },
    { key: "views", header: "VIEWS", sortable: true, className: "w-24 text-gray-300" },
    {
      key: "status",
      header: "STATUS",
      className: "w-28",
      cell: (r) => (
        <span
          className={`px-2.5 py-1 rounded-md text-xs font-semibold
            ${r.status === "Visible"
              ? "text-sky-400 bg-sky-400/10"
              : "text-red-400 bg-red-400/10"}`}
        >
          {r.status}
        </span>
      ),
    },
    { key: "created", header: "CREATED DATE", className: "w-32 text-gray-300" },
  ], []);

  const sorted = useMemo(() => {
    if (!sort) return ALL;
    const arr = [...ALL];
    arr.sort((a: any, b: any) => {
      const va = a[sort.key], vb = b[sort.key];
      if (va < vb) return sort.dir === "asc" ? -1 : 1;
      if (va > vb) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [sort]);

  const start = (page - 1) * pageSize;
  const pageData = sorted.slice(start, start + pageSize);

  return (
    <div className="min-h-screen text-white">
      {/* Full-bleed section */}
      <section className="w-full rounded-2xl border border-[#151f30] overflow-hidden">
        <DataTable<Movie>
          columns={columns}
          data={pageData}
          sort={sort}
          onSortChange={setSort}
          caption={<div className="font-semibold">Movies</div>}
          className="border-0"
        /> <Pagination
        page={page}
        pageSize={pageSize}
        total={ALL.length}
        onChange={setPage}
      />
       
      </section>
      
    </div>
  );
}
