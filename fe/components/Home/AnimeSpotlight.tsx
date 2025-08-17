"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Heart, Info } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

/* ================== Types ================== */
export type AnimeSpotlightItem = {
  id: string | number;
  hero: string; // wide landscape image
  poster: string; // 2/3 poster thumbnail
  title: string;
  subtitle?: string;
  rating?: string | number; // "8.9"
  meta?: { age?: string; year?: string | number; season?: string | number; ep?: string | number };
  genres?: string[]; // ["Chính Kịch", "Anime", ...]
  description?: string;
};

export interface AnimeSpotlightProps {
  items: AnimeSpotlightItem[];
  title?: string;
  href?: string;
  onPlay?: (item: AnimeSpotlightItem) => void;
  onInfo?: (item: AnimeSpotlightItem) => void;
  onLike?: (item: AnimeSpotlightItem) => void;
}

/* ================== Component ================== */
const AnimeSpotlight: React.FC<AnimeSpotlightProps> = ({
  items,
  title = "Kho Tàng Anime Mới Nhất",
  href,
  onPlay,
  onInfo,
  onLike,
}) => {
  const [current, setCurrent] = React.useState(0);

  const [mainRef, main] = useKeenSlider<HTMLDivElement>(
    {
      loop: false,
      renderMode: "performance",
      dragSpeed: 0.8,
      slides: { perView: 1, spacing: 0 },
      created(s) {
        setCurrent(s.track.details.rel);
      },
      slideChanged(s) {
        setCurrent(s.track.details.rel);
        // keep thumbs in sync
        thumbs.current?.moveToIdx(s.track.details.rel);
      },
    },
    []
  );

  const [thumbsRef, thumbs] = useKeenSlider<HTMLDivElement>(
    {
      loop: false,
      renderMode: "performance",
      slides: { perView: 4.4, spacing: 12 },
      breakpoints: {
        "(min-width: 480px)": { slides: { perView: 6.4, spacing: 12 } },
        "(min-width: 640px)": { slides: { perView: 8.2, spacing: 12 } },
        "(min-width: 1024px)": { slides: { perView: 10.2, spacing: 14 } },
        "(min-width: 1280px)": { slides: { perView: 12.2, spacing: 14 } },
        "(min-width: 1536px)": { slides: { perView: 14.2, spacing: 16 } },
      },
    },
    []
  );

  if (!items?.length) return null;

  const active = items[current] ?? items[0];

  // === Manual wrap navigation (no loop) ===
  const next = () => {
    const s = main.current; if (!s) return;
    const d = s.track.details; if (!d) return;
    const last = d.maxIdx ?? 0; const nx = d.rel + 1;
    s.moveToIdx(nx > last ? 0 : nx);
  };
  const prev = () => {
    const s = main.current; if (!s) return;
    const d = s.track.details; if (!d) return;
    const last = d.maxIdx ?? 0; const pv = d.rel - 1;
    s.moveToIdx(pv < 0 ? last : pv);
  };

  return (
    <section className="relative w-full px-4 pt-6 md:px-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
        {href ? (
          <a href={href} className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-sm text-white/80 hover:text-white hover:border-white/20">
            Xem tất cả
            <ChevronRight className="h-4 w-4" />
          </a>
        ) : null}
      </div>

      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
        {/* Main slider */}
        <div ref={mainRef} className="keen-slider">
          {items.map((it) => (
            <div key={`main-${it.id}`} className="keen-slider__slide">
              <div className="relative h-[360px] sm:h-[420px] lg:h-[520px]">
                <Image src={it.hero} alt={it.title} fill priority={false} className="object-cover" />

                {/* vignette & left panel gradient */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,rgba(0,0,0,0.35)_85%)]" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute left-0 top-0 flex h-full w-full items-center">
                  <div className="px-5 sm:px-8 md:px-12 lg:pl-14 lg:pr-24 max-w-3xl">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white drop-shadow">
                      {it.title}
                    </h3>
                    {it.subtitle && (
                      <p className="mt-1 text-sm md:text-base text-white/80">{it.subtitle}</p>
                    )}

                    {/* badges row */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {it.rating && (
                        <Badge className="bg-yellow-400/90 text-black">IMDb {it.rating}</Badge>
                      )}
                      {it.meta?.age && <Badge>{it.meta.age}</Badge>}
                      {it.meta?.year && <Badge>{String(it.meta.year)}</Badge>}
                      {it.meta?.season && <Badge>Phần {String(it.meta.season)}</Badge>}
                      {it.meta?.ep && <Badge>Tập {String(it.meta.ep)}</Badge>}
                    </div>

                    {/* genres */}
                    {it.genres?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {it.genres.map((g, idx) => (
                          <Tag key={`g-${it.id}-${idx}`}>{g}</Tag>
                        ))}
                      </div>
                    ) : null}

                    {/* description */}
                    {it.description && (
                      <p className="mt-4 line-clamp-3 text-sm md:text-[15px] text-white/90">
                        {it.description}
                      </p>
                    )}

                    {/* actions */}
                    <div className="mt-5 flex items-center gap-3">
                      <button
                        onClick={() => onPlay?.(it)}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-yellow-400 to-yellow-500 text-black shadow-lg ring-1 ring-black/10 hover:brightness-105"
                        aria-label="Phát"
                      >
                        <Play className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => onLike?.(it)}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15"
                        aria-label="Yêu thích"
                      >
                        <Heart className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => onInfo?.(it)}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15"
                        aria-label="Thông tin"
                      >
                        <Info className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Arrows over hero */}
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <button
                    onClick={prev}
                    className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white ring-1 ring-white/10 hover:bg-black/40"
                    aria-label="Prev"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <button
                    onClick={next}
                    className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white ring-1 ring-white/10 hover:bg-black/40"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

{/* Thumbs — BOTTOM RIGHT overlay */}
<div className="pointer-events-none absolute bottom-0 right-0 z-10 w-full">
  <div className="pr-3 pb-3 sm:pr-4 sm:pb-4">
    <div
      ref={thumbsRef}
      className="keen-slider pointer-events-auto w-full max-w-6xl ml-auto"
    >
      {items.map((it, idx) => {
        const activeThumb = idx === current;
        return (
          <div key={`thumb-${it.id}`} className="keen-slider__slide">
            <button
              onClick={() => main.current?.moveToIdx(idx)}
              className={`relative aspect-[2/3] h-24 sm:h-28 w-auto overflow-hidden rounded-xl ring-2 transition ${
                activeThumb
                  ? "ring-yellow-400 shadow-yellow-400/30 shadow-lg"
                  : "ring-white/10"
              }`}
              aria-label={`Chọn ${it.title}`}
            >
              <Image src={it.poster} alt={`${it.title} poster`} fill className="object-cover" />
              {!activeThumb && <span className="absolute inset-0 bg-black/30" />}
            </button>
          </div>
        );
      })}
    </div>
  </div>
</div>

      </div>

    </section>
  );
};
export default AnimeSpotlight;
const Badge: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${className ?? "bg-white/10 text-white border-white/20"}`}>
    {children}
  </span>
);

const Tag: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/90 backdrop-blur">
    {children}
  </span>
);

