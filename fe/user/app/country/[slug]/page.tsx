"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import MovieListGrid from "@/components/Movie/MovieListGrid";
import MoviePageHeader from "@/components/Movie/MoviePageHeader";
import { CountryMovies } from "@/data/CountryMovies";

const PAGE_SIZE = 40;

// Map slug -> tên hiển thị
const countryNames: Record<string, string> = {
  uk: "Phim Anh",
  us: "Phim Mỹ",
  kr: "Phim Hàn Quốc",
  jp: "Phim Nhật Bản",
  cn: "Phim Trung Quốc",
};

export default function CountryPage() {
  const { slug } = useParams() as { slug: string };
  const [page, setPage] = useState(1);

  // lọc phim theo slug
  const movies = CountryMovies.filter((m) => m.country === slug);
  const totalPages = Math.max(1, Math.ceil(movies.length / PAGE_SIZE));

  // phân trang
  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return movies.slice(start, start + PAGE_SIZE);
  }, [page, movies]);

  // ⚡ map từ Movie -> MovieCard (MovieListGrid yêu cầu)
  const movieCards = pageItems.map((m) => ({
    id: m.id,
    title: m.title,
    subtitle: m.subtitle,
    poster: m.poster, // ✅ phải là poster
    href: "#",
    badges: m.badge
      ? [{ text: m.badge, color: "gray" as const }]
      : [], // ✅ chỉ 1 badge
  }));

  return (
    <main className="min-h-screen bg-[#0F111A] text-white px-4 py-16">
      <div className="mx-auto max-w-[1400px]">

        <MovieListGrid
          heading={countryNames[slug]}
          items={movieCards}
          page={page}
          pageCount={totalPages}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
}
