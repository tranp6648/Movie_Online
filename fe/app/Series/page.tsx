// fe/app/phim-bo/page.tsx
import SeriesGrid from "@/components/SeriesGrid";
import { SERIES_DATA } from "@/data/SeriesData";

export const metadata = {
  title: "Phim bộ | RoPhim",
};

export default function SeriesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const pageParam = searchParams?.page;
  const page =
    Number(Array.isArray(pageParam) ? pageParam[0] : pageParam) || 1;

  return (
    <main>
      <h1>Phim bộ</h1>
      <SeriesGrid
        items={SERIES_DATA}
        page={page}
        perPage={32}
        basePath="/Series"
      />
    </main>
  );
}
