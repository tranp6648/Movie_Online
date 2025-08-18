import Image from "next/image";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useMemo } from "react";

export type AnimeItem = {
  id: string | number;
  title: string;
  subtitle?: string; // e.g., English name
  episodesLabel?: string; // e.g., "PĐ. 6"
  poster: string; // image url
  href?: string;
};

export type AnimeGridProps = {
  heading?: string;
  items: AnimeItem[];
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void; // if omitted, <a href> links will be used
  getPageHref?: (page: number) => string; // optional page link builder
  className?: string;
};

export default function AnimeGrid({
  heading = "Phim Anime",
  items,
  page,
  pageCount,
  onPageChange,
  getPageHref,
  className = "",
}: AnimeGridProps) {
  const canPrev = page > 1;
  const canNext = page < pageCount;

  const pages = useMemo(() => {
    // simple windowed pagination 1 ... current-1, current, current+1 ... last
    const out: number[] = [];
    const window = 1;
    for (let p = 1; p <= pageCount; p++) {
      if (p === 1 || p === pageCount || Math.abs(p - page) <= window) out.push(p);
    }
    return out;
  }, [page, pageCount]);

  const go = (p: number) => () => onPageChange?.(p);

  return (
    <section className={`w-full ${className}`} aria-labelledby="anime-heading">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 id="anime-heading" className="text-white text-2xl sm:text-3xl font-semibold">{heading}</h2>
          <button className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10">
            <Filter className="h-4 w-4" />
            Bộ lọc
          </button>
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-6 gap-y-8">
          {items.map((it) => (
            <li key={it.id} className="group">
              <a href={it.href ?? `#`} className="block">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)] group-hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.55)] transition-shadow">
                  {/* Poster */}
                  <Image
                    src={it.poster}
                    alt={it.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-center transform will-change-transform group-hover:scale-[1.02] transition-transform duration-200"
                  />

                  {/* Episodes badge */}
                  {it.episodesLabel && (
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-md bg-black/60 text-white text-[10px] font-semibold px-2 py-1 ring-1 ring-white/10">
                      {it.episodesLabel}
                    </span>
                  )}
                </div>

                {/* Title & subtitle */}
                <div className="mt-3 space-y-1">
                  <h3 className="text-white font-semibold leading-snug line-clamp-1">{it.title}</h3>
                  {it.subtitle && (
                    <p className="text-white/60 text-sm leading-snug line-clamp-1">{it.subtitle}</p>
                  )}
                </div>
              </a>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {/* Prev */}
          {onPageChange ? (
            <button
              aria-label="Trang trước"
              onClick={canPrev ? go(page - 1) : undefined}
              disabled={!canPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-white disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : (
            <a
              aria-disabled={!canPrev}
              href={canPrev ? getPageHref?.(page - 1) ?? `?page=${page - 1}` : undefined}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-white aria-disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </a>
          )}

          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-3 h-10 text-white/80">
            <span className="hidden sm:inline">Trang</span>
            {/* number input/selector style */}
            <span className="inline-flex items-center gap-1 rounded-md bg-black/40 px-2 h-7 text-white">
              {page}
            </span>
            <span className="opacity-60">/</span>
            <span>{pageCount}</span>
          </div>

          {/* Next */}
          {onPageChange ? (
            <button
              aria-label="Trang sau"
              onClick={canNext ? go(page + 1) : undefined}
              disabled={!canNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-white disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : (
            <a
              aria-disabled={!canNext}
              href={canNext ? getPageHref?.(page + 1) ?? `?page=${page + 1}` : undefined}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-white aria-disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}