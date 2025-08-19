"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

export type AnimeItem = {
  id: string | number;
  title: string;
  subtitle?: string;
  episodesLabel?: string;
  poster: string;
  href?: string;
};

export type AnimeGridProps = {
  heading?: string;
  items: AnimeItem[];
  page: number;
  pageCount: number;
  baseHref?: string; // 🔥 thay vì function
  className?: string;
};

export default function AnimeGrid({
  heading = "Phim Anime",
  items,
  page,
  pageCount,
  baseHref = "",
  className = "",
}: AnimeGridProps) {
  const canPrev = page > 1;
  const canNext = page < pageCount;

  const pageHref = (p: number) =>
    `${baseHref}?page=${p}`;

  return (
    <section className={`w-full ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + Filter */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl sm:text-3xl font-semibold">
            {heading}
          </h2>
          <button className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm px-3 py-2 rounded-md bg-white/5 border border-white/10">
            <Filter className="h-4 w-4" />
            Bộ lọc
          </button>
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-6 gap-y-8">
          {items.map((it) => (
            <li key={it.id} className="group">
              <Link href={it.href ?? "#"} className="block">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 shadow-md group-hover:shadow-lg transition">
                  <Image
                    src={it.poster}
                    alt={it.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-200"
                  />
                  {it.episodesLabel && (
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-md bg-black/60 text-white text-[10px] font-semibold px-2 py-1 ring-1 ring-white/10">
                      {it.episodesLabel}
                    </span>
                  )}
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="text-white font-semibold leading-snug line-clamp-1">
                    {it.title}
                  </h3>
                  {it.subtitle && (
                    <p className="text-white/60 text-sm leading-snug line-clamp-1">
                      {it.subtitle}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {/* Prev */}
          <Link
            href={canPrev ? pageHref(page - 1) : "#"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 h-10 text-white/80">
            <span className="hidden sm:inline">Trang</span>
            <span className="bg-black/40 px-2 h-7 flex items-center rounded-md text-white">
              {page}
            </span>
            <span className="opacity-60">/</span>
            <span>{pageCount}</span>
          </div>

          {/* Next */}
          <Link
            href={canNext ? pageHref(page + 1) : "#"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 hover:text-white disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
