"use client";

import React from "react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ================== Types ================== */
export type Top10TagVariant = "gray" | "green" | "blue";

export type Top10Item = {
  id: string | number;
  poster: string;
  title: string;
  subtitle?: string;
  rank: number; // 1..10
  meta?: { age?: string; season?: string; ep?: string };
  tags?: { text: string; variant?: Top10TagVariant }[];
};

export interface Top10TodaySliderProps {
  items: Top10Item[];
  title?: string;
}

/* ================== Component ================== */
// ...rest

const Top10TodaySlider: React.FC<Top10TodaySliderProps> = ({
  items,
  title = "Top 10 phim bộ hôm nay",
}) => {
  const [current, setCurrent] = React.useState(0);
  const [progress, setProgress] = React.useState(0); // 0..1

  const [sliderRef, instRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: false, // KHÔNG loop
      renderMode: "performance",
      slides: { perView: 1.15, spacing: 16 },
      breakpoints: {
        "(min-width: 480px)": { slides: { perView: 2.1, spacing: 16 } },
        "(min-width: 768px)": { slides: { perView: 3.1, spacing: 18 } },
        "(min-width: 1024px)": { slides: { perView: 4.1, spacing: 20 } },
        "(min-width: 1280px)": { slides: { perView: 5.1, spacing: 22 } },
        "(min-width: 1536px)": { slides: { perView: 6, spacing: 24 } },
      },
      created(s) {
        setCurrent(s.track.details.rel);
        setProgress(s.track.details.progress);
      },
      updated(s) {
        setCurrent(s.track.details.rel);
        setProgress(s.track.details.progress);
      },
      slideChanged(s) {
        setCurrent(s.track.details.rel);
        setProgress(s.track.details.progress);
      },
    },
    []
  );

  if (!items?.length) return null;

  // Mốc rìa chỉ để làm mờ nút, KHÔNG ẩn


  // === NEW: handler “wrap” không cần loop ===
 const handleNext = () => {
  const s = instRef.current;
  if (!s) return;
  const d = s.track.details;
  if (!d) return;

  const last = d.maxIdx ?? 0;
  const next = d.rel + 1;

  if (next > last) {
    s.moveToIdx(0);        // về item đầu khi đã ở cuối
  } else {
    s.moveToIdx(next);     // hoặc s.next();
  }
};

  
const handlePrev = () => {
  const s = instRef.current;
  if (!s) return;
  const d = s.track.details;
  if (!d) return;

  const last = d.maxIdx ?? 0;
  const prev = d.rel - 1;

  if (prev < 0) {
    s.moveToIdx(last);     // về item cuối khi đang ở đầu
  } else {
    s.moveToIdx(prev);     // hoặc s.prev();
  }
};

  return (
    <section className="relative p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>

      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {items.map((it, i) => (
            <div
              key={`top10-${it.id}-${i}`}
              className="keen-slider__slide transition-opacity duration-300"
            >
              <PosterCard item={it} />
            </div>
          ))}
        </div>

        {/* Mũi tên: luôn hiển thị, chỉ làm mờ ở rìa */}
        <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Prev"
            className={`pointer-events-auto h-10 w-10 flex items-center justify-center text-white hover:opacity-90 focus:outline-none 
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
            className={`pointer-events-auto h-10 w-10 flex items-center justify-center text-white hover:opacity-90 focus:outline-none 
            }`}
          >
            <ChevronRight className="h-6 w-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
          </button>
        </div>
      </div>
    </section>
  );
};


export default Top10TodaySlider;

/* ================== Subcomponents ================== */
const PosterCard: React.FC<{ item: Top10Item }> = ({ item }) => {
  return (
    <div className="group">
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/5">
        <Image
          src={item.poster}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Chips đáy poster */}
        {item.tags?.length ? (
          <div className="absolute bottom-2 left-2 flex gap-2">
            {item.tags.map((tg, idx) => (
              <Tag key={`tg-${item.id}-${idx}`} text={tg.text} variant={tg.variant} />
            ))}
          </div>
        ) : null}
      </div>

      {/* Info + Rank */}
      <div className="mt-3 flex gap-4">
        <div className="w-10 text-5xl leading-none font-extrabold text-amber-400 tracking-tight drop-shadow">
          {item.rank}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold">{item.title}</h3>
          {item.subtitle && (
            <p className="truncate text-sm text-gray-400">{item.subtitle}</p>
          )}
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400">
            {item.meta?.age && <span>T{item.meta.age}</span>}
            {item.meta?.season && <span>Phần {item.meta.season}</span>}
            {item.meta?.ep && <span>Tập {item.meta.ep}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

const Tag: React.FC<{ text: string; variant?: Top10TagVariant }> = ({
  text,
  variant = "gray",
}) => {
  const base =
    "text-[10px] font-semibold px-2 py-0.5 rounded-md shadow backdrop-blur border";
  const cls =
    variant === "green"
      ? "bg-emerald-500 text-black border-emerald-400/50"
      : variant === "blue"
      ? "bg-blue-500 text-white border-blue-400/50"
      : "bg-white/15 text-white border-white/20";
  return <span className={`${base} ${cls}`}>{text}</span>;
};
