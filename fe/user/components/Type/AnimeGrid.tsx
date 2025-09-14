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
  baseHref?: string; 
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

  const pageHref = (p: number) => `${baseHref}?page=${p}`;

  return (
    <section className={`w-full ${className}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Heading + Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold">
            {heading}
          </h2>
          <button className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs sm:text-sm px-3 py-2 rounded-md bg-white/5 border border-white/10">
            <Filter className="h-4 w-4" />
            Bộ lọc
          </button>
        </div>

        {/* Grid responsive */}
        <ul
          className="
            grid grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            lg:grid-cols-5 
            xl:grid-cols-6 
            gap-x-3 gap-y-5 sm:gap-x-5 sm:gap-y-7
          "
        >
          {items.map((it) => (
            <li key={it.id} className="group">
              <Link href={it.href ?? "#"} className="block">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg sm:rounded-xl bg-white/5 ring-1 ring-white/10 shadow-md group-hover:shadow-lg transition">
                  <Image
                    src={it.poster}
                    alt={it.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-200"
                  />
                  {it.episodesLabel && (
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-md bg-black/60 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 ring-1 ring-white/10">
                      {it.episodesLabel}
                    </span>
                  )}
                </div>
                <div className="mt-2 sm:mt-3 space-y-0.5 sm:space-y-1">
                  <h3 className="text-white font-semibold leading-snug text-sm sm:text-base line-clamp-1">
                    {it.title}
                  </h3>
                  {it.subtitle && (
                    <p className="text-white/60 text-xs sm:text-sm leading-snug line-clamp-1">
                      {it.subtitle}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
          {/* Prev */}
          <Link
            href={canPrev ? pageHref(page - 1) : "#"}
            className={`inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/5 text-white/80 hover:text-white ${
              !canPrev && "opacity-40 pointer-events-none"
            }`}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>

          <div className="inline-flex items-center gap-1 sm:gap-2 rounded-full bg-white/5 px-2 sm:px-3 h-9 sm:h-10 text-white/80 text-xs sm:text-sm">
            <span className="hidden sm:inline">Trang</span>
            <span className="bg-black/40 px-2 h-7 flex items-center rounded-md text-white text-xs sm:text-sm">
              {page}
            </span>
            <span className="opacity-60">/</span>
            <span>{pageCount}</span>
          </div>

          {/* Next */}
          <Link
            href={canNext ? pageHref(page + 1) : "#"}
            className={`inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/5 text-white/80 hover:text-white ${
              !canNext && "opacity-40 pointer-events-none"
            }`}
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
