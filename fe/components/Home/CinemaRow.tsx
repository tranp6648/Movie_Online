"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

/* ================== Types ================== */
export type CinemaItem = {
  id: string | number;
  backdrop: string; // wide image
  poster: string; // portrait poster (2/3)
  title: string;
  subtitle?: string; // localized / English title
  meta?: {
    age?: string; // T18, T13, P, etc
    year?: string | number;
    duration?: string; // 1h 35m
    quality?: string; // CAM, HD, 4K, etc
  };
  tag?: string; // e.g. "P.Đề"
};

export interface CinemaRowProps {
  items: CinemaItem[];
  title?: string;
  href?: string; // optional "Xem tất cả" link
  onCardClick?: (item: CinemaItem) => void;
}

/* ================== Component ================== */
const CinemaRow: React.FC<CinemaRowProps> = ({
  items,
  title = "Mãn Nhãn với Phim Chiếu Rạp",
  href,
  onCardClick,
}) => {
  const [current, setCurrent] = React.useState(0);

  const [sliderRef, instRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: false, // KHÔNG loop: ta tự wrap ở handlers
      renderMode: "performance",
      slides: { perView: 1.05, spacing: 16 },
      breakpoints: {
        "(min-width: 480px)": { slides: { perView: 1.2, spacing: 16 } },
        "(min-width: 640px)": { slides: { perView: 1.5, spacing: 16 } },
        "(min-width: 768px)": { slides: { perView: 2.05, spacing: 18 } },
        "(min-width: 1024px)": { slides: { perView: 2.5, spacing: 20 } },
        "(min-width: 1280px)": { slides: { perView: 3.05, spacing: 22 } },
        "(min-width: 1536px)": { slides: { perView: 4.05, spacing: 24 } },
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

  // === Handlers: wrap thủ công (không bật loop) ===
  const handleNext = () => {
    const s = instRef.current;
    if (!s) return;
    const d = s.track.details;
    if (!d) return;

    const last = d.maxIdx ?? 0;
    const next = d.rel + 1;
    if (next > last) s.moveToIdx(0); // về đầu khi đã ở cuối
    else s.moveToIdx(next);
  };

  const handlePrev = () => {
    const s = instRef.current;
    if (!s) return;
    const d = s.track.details;
    if (!d) return;

    const last = d.maxIdx ?? 0;
    const prev = d.rel - 1;
    if (prev < 0) s.moveToIdx(last); // về cuối khi đang ở đầu
    else s.moveToIdx(prev);
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
          <a
            href={href}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-sm text-white/80 hover:text-white hover:border-white/20"
          >
            Xem tất cả
            <ChevronRight className="h-4 w-4" />
          </a>
        ) : null}
      </div>

      {/* Slider */}
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {items.map((it) => (
            <div key={`cinema-${it.id}`} className="keen-slider__slide">
              <BannerCard item={it} onClick={onCardClick} />
            </div>
          ))}
        </div>

        {/* Arrows: luôn hiển thị, mờ ở rìa */}
        <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Prev"
            className={`pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white transition hover:bg-white/10 ${
              atStart ? "opacity-50" : "opacity-100"
            }`}
          >
            <ChevronLeft className="h-6 w-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <button
            onClick={handleNext}
            type="button"
            aria-label="Next"
            className={`pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white transition hover:bg-white/10 ${
              atEnd ? "opacity-50" : "opacity-100"
            }`}
          >
            <ChevronRight className="h-6 w-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CinemaRow;

/* ================== Subcomponents ================== */
const BannerCard: React.FC<{ item: CinemaItem; onClick?: (i: CinemaItem) => void }> = ({
  item,
  onClick,
}) => {
  return (
    <div className="group cursor-pointer" onClick={() => onClick?.(item)}>
      {/* Wide banner */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
        {/* 16:7 ratio to match the mock */}
        <div className="relative aspect-[16/7] w-full">
          <Image
            src={item.backdrop}
            alt={item.title}
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {/* subtle gradient for readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />

          {/* ONLY the tag (P.Đề) overlays inside banner */}
          {item.tag ? (
            <div className="pointer-events-none absolute bottom-3 left-4 z-10">
              <Chip>{item.tag}</Chip>
            </div>
          ) : null}
        </div>
      </div>

      {/* Info block OUTSIDE: poster next to title (normal) */}
      <div className="mt-4 flex items-start gap-3 px-1">
        {/* Poster thumb */}
        <div className="relative h-20 w-14 md:h-24 md:w-16 overflow-hidden rounded-xl ring-2 ring-black/40 shadow-xl shrink-0">
          <Image
            src={item.poster}
            alt={`${item.title} poster`}
            fill
            className="object-cover"
          />
        </div>

        {/* Texts */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-white">{item.title}</h3>
          {item.subtitle && (
            <p className="truncate text-sm text-white/60">{item.subtitle}</p>
          )}
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60">
            {item.meta?.age && <span className="font-semibold">{item.meta.age}</span>}
            {item.meta?.year && <Dot>{String(item.meta.year)}</Dot>}
            {item.meta?.duration && <Dot>{item.meta.duration}</Dot>}
            {item.meta?.quality && <Dot>{item.meta.quality}</Dot>}
          </div>
        </div>
      </div>
    </div>
  );
};


const Chip: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white shadow backdrop-blur">
    {children}
  </span>
);

const Dot: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="relative pl-3">
    <span className="absolute left-1 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-white/30" />
    {children}
  </span>
);

