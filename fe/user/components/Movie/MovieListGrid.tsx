import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

/* ---------------------------------- Types --------------------------------- */
export type BadgeColor = "gray" | "green" | "blue" | "red" | "amber";
export type MovieCard = {
  id: string | number;
  title: string;
  subtitle?: string; // e.g., english title
  poster: string; // image url
  href?: string;
  badges?: { text: string; color?: BadgeColor }[]; // e.g., [{text:"P.Đê", color:"gray"}, {text:"T.Minh", color:"green"}]
};

export type MovieListGridProps = {
  heading?: string;
  showFilter?: boolean;
  items: MovieCard[];
  page: number;
  pageCount: number;
  /** Client-mode: handle pagination in the parent */
  onPageChange?: (page: number) => void;
  /** Server/link-mode: build href for a target page */
  getPageHref?: (page: number) => string;
  className?: string;
};

/* ------------------------------ Badge styling ----------------------------- */
const badgeStyles: Record<BadgeColor, string> = {
  gray: "bg-black/70 text-white ring-white/15",
  green: "bg-emerald-600/90 text-white ring-emerald-300/30",
  blue: "bg-sky-600/90 text-white ring-sky-300/30",
  red: "bg-rose-600/90 text-white ring-rose-300/30",
  amber: "bg-amber-500/90 text-black ring-black/10",
};

/* -------------------------------- Component ------------------------------- */
export default function MovieListGrid({
  heading = "Phim lẻ",
  showFilter = true,
  items,
  page,
  pageCount,
  onPageChange,
  getPageHref,
  className = "",
}: MovieListGridProps) {
  const canPrev = page > 1;
  const canNext = page < pageCount;

  const Prev = (
    <button
      aria-label="Trang trước"
      onClick={canPrev ? () => onPageChange?.(page - 1) : undefined}
      disabled={!canPrev || !onPageChange}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-white disabled:opacity-40"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );

  const Next = (
    <button
      aria-label="Trang sau"
      onClick={canNext ? () => onPageChange?.(page + 1) : undefined}
      disabled={!canNext || !onPageChange}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-white disabled:opacity-40"
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  );

  return (
    <section className={`w-full ${className}`} aria-labelledby="movie-grid-heading">
      {/* container: tighter on mobile, max on xl */}
      <div className="mx-auto w-full max-w-screen-2xl px-3 sm:px-5 lg:px-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8 flex flex-wrap items-center justify-between gap-3">
          <h2 id="movie-grid-heading" className="text-white text-lg sm:text-2xl lg:text-3xl font-semibold">
            {heading}
          </h2>

          {showFilter && (
            <button className="inline-flex items-center gap-2 text-white/85 hover:text-white text-xs sm:text-sm px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md bg-white/5 ring-1 ring-white/10">
              <Filter className="h-4 w-4" />
              <span className="hidden xs:inline">Bộ lọc</span>
            </button>
          )}
        </div>

        {/* Grid */}
        <ul
          className="
            grid gap-x-3 gap-y-6
            grid-cols-2
            sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8
            md:grid-cols-4
            lg:grid-cols-5 lg:gap-x-8
            xl:grid-cols-6
            2xl:grid-cols-8 2xl:gap-x-10 2xl:gap-y-10
          "
        >
          {items.map((m) => (
            <li key={m.id} className="group">
              <Link href={ `/detail/${m.id}`} className="block">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg sm:rounded-xl bg-white/5 ring-1 ring-white/10 shadow-[0_6px_18px_-10px_rgba(0,0,0,0.45)] group-hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.55)] transition-shadow">
                  <Image
                    src={m.poster}
                    alt={m.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, (max-width: 1536px) 16vw, 12vw"
                    className="object-cover object-center transform will-change-transform group-hover:scale-[1.02] transition-transform duration-200"
                  />

                  {/* Badges bottom center */}
                  {!!m.badges?.length && (
                    <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2">
                      {m.badges.map((b, i) => (
                        <span
                          key={i}
                          className={`rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold ring-1 ${badgeStyles[b.color ?? "gray"]}`}
                        >
                          {b.text}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Title & subtitle */}
                <div className="mt-2 sm:mt-3 space-y-0.5 sm:space-y-1">
                  <h3 className="text-white text-sm sm:text-base font-semibold leading-snug line-clamp-1">{m.title}</h3>
                  {m.subtitle && (
                    <p className="text-white/60 text-xs sm:text-sm leading-snug line-clamp-1">{m.subtitle}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 lg:mt-10">
          {/* Client-mode buttons */}
          {onPageChange ? (
            <>
              {Prev}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-2.5 sm:px-3 h-9 sm:h-10 text-white/80 text-sm">
                <span className="hidden sm:inline">Trang</span>
                <span className="inline-flex items-center gap-1 rounded-md bg-black/40 px-1.5 sm:px-2 h-7 text-white">
                  {page}
                </span>
                <span className="opacity-60">/</span>
                <span>{pageCount}</span>
              </div>
              {Next}
            </>
          ) : (
            // Link-mode
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                aria-disabled={!canPrev}
                href={canPrev ? (getPageHref?.(page - 1) ?? `?page=${page - 1}`) : "#"}
                className="inline-flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-white aria-disabled:opacity-40"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>

              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-2.5 sm:px-3 h-9 sm:h-10 text-white/80 text-sm">
                <span className="hidden sm:inline">Trang</span>
                <span className="inline-flex items-center gap-1 rounded-md bg-black/40 px-1.5 sm:px-2 h-7 text-white">
                  {page}
                </span>
                <span className="opacity-60">/</span>
                <span>{pageCount}</span>
              </div>

              <Link
                aria-disabled={!canNext}
                href={canNext ? (getPageHref?.(page + 1) ?? `?page=${page + 1}`) : "#"}
                className="inline-flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-white aria-disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
