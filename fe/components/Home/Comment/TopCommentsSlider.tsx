"use client";

import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useState } from "react";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  MessageCircle,
  BadgeCheck,
  Star,
} from "lucide-react";

export type TopComment = {
  id: string;
  user: { name: string; avatar: string; badge?: "female" | "infinity" | "star" };
  text: string;
  cover: string;
  stats: { views: number; likes: number; comments: number };
};

interface Props {
  items: TopComment[];
  intervalMs?: number;
  perView?: number;  // mặc định 5
  spacing?: number;  // mặc định 16
}

// --- helper: đọc perView an toàn từ options.slides ---
function resolvePerView(slides: unknown, fallback: number): number {
  if (typeof slides === "number") return slides; // Keen cho phép slides = number (perView)
  if (slides && typeof slides === "object" && "perView" in (slides as any)) {
    const pv = (slides as { perView?: number }).perView;
    if (typeof pv === "number") return pv;
  }
  return fallback;
}

const TopCommentsSlider: React.FC<Props> = ({
  items,
  intervalMs = 4000,
  perView = 5,
  spacing = 16,
}) => {
  const [idx, setIdx] = useState(0);
  const [currentPV, setCurrentPV] = useState(perView);

  // Autoplay plugin
  const Autoplay = (delay = 4000): KeenSliderPlugin => (slider) => {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;
    const clearNextTimeout = () => clearTimeout(timeout);
    const nextTimeout = () => {
      clearTimeout(timeout);
      if (!mouseOver) timeout = setTimeout(() => slider.next(), delay);
    };
    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });
    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  };

  const shouldLoop = items.length > perView;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: shouldLoop,
      renderMode: "performance",
      initial: 0,
      slides: { perView, spacing },
      breakpoints: {
        "(max-width: 1024px)": { slides: { perView: Math.min(3, items.length), spacing } },
        "(max-width: 640px)": { slides: { perView: 1, spacing: 12 } },
      },
      slideChanged(s) {
        setIdx(s.track.details.rel);
      },
      created(s) {
        setCurrentPV(resolvePerView(s.options.slides, perView));
      },
      updated(s) {
        setCurrentPV(resolvePerView(s.options.slides, perView));
      },
    },
    [Autoplay(intervalMs)]
  );

  if (!items?.length) return null;

  const pages = Math.max(1, Math.ceil(items.length / currentPV));
  const activePage = Math.floor(idx / currentPV);

  return (
    <div className="relative">
      {/* Prev/Next */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-1 hover:bg-black/60"
        aria-label="Prev"
        type="button"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-1 hover:bg-black/60"
        aria-label="Next"
        type="button"
      >
        <ChevronRight size={18} />
      </button>

      {/* Track */}
      <div ref={sliderRef} className="keen-slider pr-6">
        {items.map((c, i) => (
          <div key={`slide-${c.id}-${i}`} className="keen-slider__slide">
            <article
              className="relative rounded-xl overflow-hidden"
              style={{ height: "13vh", minHeight: 120 }}
            >
              {/* Background cover */}
              <Image src={c.cover} alt="bg" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Nội dung */}
              <div className="relative z-10 p-3 text-white">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                    <Image src={c.user.avatar} alt={c.user.name} fill />
                  </div>

                  {/* Nội dung chính */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <p className="truncate text-sm font-medium">{c.user.name}</p>
                      {c.user.badge === "female" && <Star size={14} className="opacity-80" />}
                      {c.user.badge === "infinity" && <BadgeCheck size={14} className="opacity-80" />}
                    </div>
                    <p className="line-clamp-2 text-sm text-gray-100">{c.text}</p>

                    {/* Stats */}
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-200">
                      <span className="inline-flex items-center gap-1">
                        <Eye size={14} /> {c.stats.views}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Heart size={14} /> {c.stats.likes}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle size={14} /> {c.stats.comments}
                      </span>
                    </div>
                  </div>

                  {/* Cover nhỏ */}
                  <div className="relative h-16 w-12 overflow-hidden rounded-md">
                    <Image src={c.cover} alt="cover" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* Dots theo trang (5 item = 1 dot; tự động theo currentPV) */}
      <div className="mt-3 flex justify-center gap-2">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={`page-dot-${i}`}
            onClick={() => instanceRef.current?.moveToIdx(i * currentPV)}
            className={`h-1.5 rounded-full transition-all ${
              i === activePage ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to page ${i + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default TopCommentsSlider;
