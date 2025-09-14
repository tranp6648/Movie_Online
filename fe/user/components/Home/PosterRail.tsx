"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Info, Link } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

/* ================== Types ================== */
export type PosterItem = {
  id: string | number;
  poster: string; // portrait 2/3
  title: string;
  subtitle?: string;
  tag?: string; // e.g. "P.Đ. 7"
  meta?: { age?: string; year?: string | number; duration?: string };
  sponsored?: boolean; // render a sponsored tile style
  sponsorImage?: string; // optional logo for sponsored card
};

export interface PosterRailProps {
  items: PosterItem[];
  title?: string;
  href?: string; // optional "Xem tất cả" link
  onCardClick?: (item: PosterItem) => void;
}

/* ================== Component ================== */
const PosterRail: React.FC<PosterRailProps> = ({
  items,
  title = "Phim Nhật Mới Oanh Tạc Chốn Này",
  href,
  onCardClick,
}) => {
  const [current, setCurrent] = React.useState(0);

  const [sliderRef, instRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: false, // không loop, tự wrap ở handler
      renderMode: "performance",
      slides: { perView: 2.1, spacing: 16 },
      breakpoints: {
        "(min-width: 480px)": { slides: { perView: 3.1, spacing: 16 } },
        "(min-width: 640px)": { slides: { perView: 4.1, spacing: 18 } },
        "(min-width: 768px)": { slides: { perView: 5.1, spacing: 18 } },
        "(min-width: 1024px)": { slides: { perView: 6.1, spacing: 20 } },
        "(min-width: 1280px)": { slides: { perView: 7.1, spacing: 22 } },
      },
      created(s) {
        setCurrent(s.track.details.rel);
      },
      updated(s) {
        setCurrent(s.track.details.rel);
      },
      slideChanged(s) {
        setCurrent(s.track.details.rel);
      },
    },
    []
  );

  if (!items?.length) return null;

  // === Handlers: wrap thủ công ===
  const handleNext = () => {
    const s = instRef.current;
    if (!s) return;
    const d = s.track.details;
    if (!d) return;
    const last = d.maxIdx ?? 0;
    const next = d.rel + 1;
    if (next > last) s.moveToIdx(0); else s.moveToIdx(next);
  };
  const handlePrev = () => {
    const s = instRef.current;
    if (!s) return;
    const d = s.track.details;
    if (!d) return;
    const last = d.maxIdx ?? 0;
    const prev = d.rel - 1;
    if (prev < 0) s.moveToIdx(last); else s.moveToIdx(prev);
  };

  const lastIdx = instRef.current?.track?.details?.maxIdx ?? 0;
  const atStart = current <= 0;
  const atEnd = current >= lastIdx;

  return (
    <section className="relative w-full p-4 md:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
        {href ? (
          <Link
            href={href}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-sm text-white/80 hover:text-white hover:border-white/20"
          >
            Xem tất cả
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>

      {/* Slider */}
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {items.map((it) => (
            <div key={`poster-${it.id}`} className="keen-slider__slide">
              <PosterCard item={it} onClick={onCardClick} />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
          <button
            onClick={handlePrev}
            aria-label="Prev"
            className={`pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white transition hover:bg-white/10 ${atStart ? "opacity-50" : "opacity-100"}`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <button
            onClick={handleNext}
            aria-label="Next"
            className={`pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white transition hover:bg-white/10 ${atEnd ? "opacity-50" : "opacity-100"}`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PosterRail;

/* ================== Subcomponents ================== */
const PosterCard: React.FC<{ item: PosterItem; onClick?: (i: PosterItem) => void }> = ({
  item,
  onClick,
}) => {
  const isSponsored = item.sponsored;

  return (
    <div className="group cursor-pointer" onClick={() => onClick?.(item)}>
      {/* Poster */}
      <div className={`relative aspect-[2/3] w-full overflow-hidden rounded-2xl ring-1 ${isSponsored ? "bg-white/5 ring-white/10" : "bg-white/5 ring-white/10"}`}>
        {isSponsored ? (
          <div className="absolute inset-0 grid place-items-center">
            {item.sponsorImage ? (
              <Image src={item.sponsorImage} alt="Sponsored" fill className="object-contain p-6" />
            ) : (
              <span className="text-sm text-white/70">Sponsored</span>
            )}
          </div>
        ) : (
          <Image src={item.poster} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        )}

        {!isSponsored && item.tag ? (
          <div className="absolute left-2 top-2">
            <Pill className="bg-black/60 text-white border-white/20">{item.tag}</Pill>
          </div>
        ) : null}
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        {isSponsored ? (
          <div className="flex items-center gap-1 text-[11px] text-white/50">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/30" />
            Được tài trợ
          </div>
        ) : (
          <>
            <h3 className="truncate text-sm font-semibold text-white">{item.title}</h3>
            {item.subtitle && (
              <p className="truncate text-xs text-white/60">{item.subtitle}</p>
            )}
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/60">
              {item.meta?.age && <span className="font-semibold">{item.meta.age}</span>}
              {item.meta?.year && <Dot>{String(item.meta.year)}</Dot>}
              {item.meta?.duration && <Dot>{item.meta.duration}</Dot>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Pill: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold shadow backdrop-blur ${className ?? "bg-white/15 text-white border-white/20"}`}>
    {children}
  </span>
);

const Dot: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="relative pl-3">
    <span className="absolute left-1 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-white/30" />
    {children}
  </span>
);

/* ================== Example Usage (remove in prod) ==================
import PosterRail from "./PosterRail";

const items: PosterItem[] = [
  { id: 1, poster: "/images/closet.jpg", title: "Tủ Quần Áo Lọ Lem", subtitle: "Cinderella Closet", tag: "P.Đ. 7", meta: { age: "T15" } },
  { id: 2, poster: "/images/great-chase.jpg", title: "Hành Trình Truy Vết", subtitle: "The Great Chase", tag: "P.Đ. 5", meta: { age: "T16" } },
  { id: 3, poster: "/images/kidnapping-day.jpg", title: "Lương Tâm Kẻ Bắt Cóc", subtitle: "The Kidnapping Day", tag: "P.Đ. 5", meta: { age: "T16" } },
  { id: 4, poster: "/images/sponsor.png", title: "Sponsored", sponsored: true, sponsorImage: "/images/sponsor.png" },
  // ...
];

export default function Page() {
  return (
    <main className="bg-neutral-900 min-h-screen text-white">
      <div className="mx-auto max-w-7xl">
        <PosterRail items={items} />
      </div>
    </main>
  );
}
==================================================== */
