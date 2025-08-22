"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Link } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

/* ================== Types ================== */
export type HKItem = {
  id: string | number;
  poster: string; // 2/3 portrait
  title: string; // vi
  subtitle?: string; // en
  tag?: string; // e.g. "P.Đề"
};

export interface HKCinemaRailProps {
  items: HKItem[];
  title?: string;
  href?: string;
  onCardClick?: (item: HKItem) => void;
}

/* ================== Component ================== */
const HKCinemaRail: React.FC<HKCinemaRailProps> = ({
  items,
  title = "Điện Ảnh Hồng Kông ở Chỗ Này Này",
  href,
  onCardClick,
}) => {
  const [current, setCurrent] = React.useState(0);

  const [sliderRef, instRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: false, // wrap thủ công
      renderMode: "performance",
      slides: { perView: 2.2, spacing: 16 },
      breakpoints: {
        "(min-width: 480px)": { slides: { perView: 3.2, spacing: 16 } },
        "(min-width: 640px)": { slides: { perView: 4.2, spacing: 18 } },
        "(min-width: 768px)": { slides: { perView: 5.2, spacing: 18 } },
        "(min-width: 1024px)": { slides: { perView: 6.2, spacing: 20 } },
        "(min-width: 1280px)": { slides: { perView: 7.2, spacing: 22 } },
      },
      created(s) { setCurrent(s.track.details.rel); },
      updated(s) { setCurrent(s.track.details.rel); },
      slideChanged(s) { setCurrent(s.track.details.rel); },
    },
    []
  );

  if (!items?.length) return null;

  // === Handlers: wrap không cần loop ===
  const handleNext = () => {
    const s = instRef.current; if (!s) return;
    const d = s.track.details; if (!d) return;
    const last = d.maxIdx ?? 0; const nx = d.rel + 1;
    s.moveToIdx(nx > last ? 0 : nx);
  };
  const handlePrev = () => {
    const s = instRef.current; if (!s) return;
    const d = s.track.details; if (!d) return;
    const last = d.maxIdx ?? 0; const pv = d.rel - 1;
    s.moveToIdx(pv < 0 ? last : pv);
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
            className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 text-white/80 hover:text-white hover:border-white/20"
            aria-label="Xem tất cả"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>

      {/* Slider */}
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {items.map((it) => (
            <div key={`hk-${it.id}`} className="keen-slider__slide">
              <HKPosterCard item={it} onClick={onCardClick} />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
          <button
            onClick={handlePrev}
            className={`pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white transition hover:bg-white/10 ${atStart ? "opacity-50" : "opacity-100"}`}
            aria-label="Prev"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <button
            onClick={handleNext}
            className={`pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white transition hover:bg-white/10 ${atEnd ? "opacity-50" : "opacity-100"}`}
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HKCinemaRail;

/* ================== Subcomponents ================== */
const HKPosterCard: React.FC<{ item: HKItem; onClick?: (i: HKItem) => void }> = ({ item, onClick }) => {
  return (
    <div className="group cursor-pointer" onClick={() => onClick?.(item)}>
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
        <Image src={item.poster} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />

        {/* Bottom-center tag */}
        {item.tag ? (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <Pill className="bg-white/90 text-black border-white/60">{item.tag}</Pill>
          </div>
        ) : null}
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <h3 className="truncate text-sm font-semibold text-white">{item.title}</h3>
        {item.subtitle && (
          <p className="truncate text-xs text-white/60">{item.subtitle}</p>
        )}
      </div>
    </div>
  );
};

const Pill: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold shadow ${className ?? "bg-white/15 text-white border-white/20"}`}>
    {children}
  </span>
);
