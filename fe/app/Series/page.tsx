// fe/app/phim-bo/page.tsx
import SeriesGrid from "@/components/SeriesGrid";
import { SERIES_DATA } from "@/data/SeriesData";
import type { Show } from "@/lib/types";

export const metadata = {
  title: "Phim bộ | RoPhim",
};

type PageProps = {
  params?: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};


export default function SeriesPage({ searchParams }: PageProps) {
  const page = Number(searchParams?.page) || 1;

  return (
    <main className="mx-auto max-w-[1400px] px-4 pb-16 pt-18">
      <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Phim bộ
      </h1>

      {/* (Tuỳ chọn) filter/toolbar */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-white/70 ring-1 ring-white/10">
        <span className="text-sm">Bộ lọc</span>
      </div>

      <SeriesGrid
        items={SERIES_DATA}
        page={page}
        perPage={32}
        basePath="/Series"
      />
    </main>
  );
}
