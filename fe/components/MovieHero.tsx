"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Heart, Share2 } from "lucide-react";

// Slider thumbnail nhỏ bên phải
function ThumbSlider({
  images,
  onSelect,
  initial = 0,
}: {
  images: string[];
  onSelect?: (i: number) => void;
  initial?: number;
}) {
  const scroller = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(initial);

  const select = (i: number) => {
    setActive(i);
    const container = scroller.current;
    const child = container?.children?.[i] as HTMLElement | undefined;
    if (container && child) child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    onSelect?.(i);
  };

  return (
    <div className="flex gap-2">
      <div
        ref={scroller}
        className="flex gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
      >
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => select(i)}
            className={`relative h-[56px] w-[92px] flex-shrink-0 overflow-hidden rounded-lg border transition ${
              i === active ? "border-yellow-400 ring-2 ring-yellow-400/70" : "border-white/20"
            }`}
            title={`Thumb ${i + 1}`}
          >
            <img src={src} alt="thumb" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MovieHero({
  bgImage,
  labelLogo,
  title,
  year,
  duration,
  rating,
  score,
  genres = [],
  description,
  thumbnails = [],
}: {
  bgImage: string;
  labelLogo?: React.ReactNode;
  title: string;
  year?: string | number;
  duration?: string;
  rating?: string;
  score?: string;
  genres?: string[];
  description?: string;
  thumbnails?: string[];
}) {
  return (
    <section className="relative h-[82vh] w-full overflow-hidden rounded-2xl bg-black text-white flex items-stretch">
      {/* Background */}
      <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-1 h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left: Info */}
        <div className="flex flex-col justify-center max-w-2xl pt-10 sm:pt-16 flex-1">
          {/* Logo/label */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-4">
            {labelLogo && <div className="mb-4 h-14 w-64 opacity-95">{labelLogo}</div>}
            <div className="text-xs uppercase tracking-widest text-yellow-300">{title}</div>
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="text-4xl font-bold sm:text-5xl">
            {title}
          </motion.h1>

          {/* Meta */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }} className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/80">
            {score && <span className="rounded bg-white/10 px-2 py-0.5 border border-yellow-400 text-yellow-300">{score}</span>}
            {rating && <span className="rounded bg-white/10 px-2 py-0.5 border border-white/20">{rating}</span>}
            {year && <span className="opacity-80">{year}</span>}
            {duration && <span className="opacity-80">{duration}</span>}
          </motion.div>

          {/* Genres */}
          {genres.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }} className="mt-2 flex flex-wrap gap-2 text-xs text-white/75">
              {genres.map((g) => (
                <span key={g} className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5">
                  {g}
                </span>
              ))}
            </motion.div>
          )}

          {/* Description */}
          {description && (
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-4 max-w-xl text-sm leading-relaxed text-white/90">
              {description}
            </motion.p>
          )}

          {/* Actions */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 flex gap-3">
            <button className="group inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-6 py-2 font-semibold text-black shadow hover:shadow-lg transition">
              <Play className="h-4 w-4 transition-transform group-hover:scale-110" />
              Xem ngay
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-2 text-white backdrop-blur hover:bg-white/15 transition">
              <Heart className="h-4 w-4" />
              Yêu thích
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-2 text-white backdrop-blur hover:bg-white/15 transition">
              <Share2 className="h-4 w-4" />
              Chia sẻ
            </button>
          </motion.div>
        </div>

        {/* Right: Thumbnails slider */}
        {thumbnails.length > 0 && (
          <div className="flex flex-col justify-end items-end flex-1 mb-6">
            <ThumbSlider images={thumbnails} />
          </div>
        )}
      </div>

      {/* Floating circular controls */}
      <div className="pointer-events-none absolute bottom-6 left-6 flex items-center gap-3">
        <button className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full bg-yellow-400 text-black shadow transition hover:scale-105">
          <Play className="h-5 w-5" />
        </button>
        <button className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur transition hover:scale-105">
          <Heart className="h-5 w-5" />
        </button>
        <button className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur transition hover:scale-105">
          <Share2 className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}