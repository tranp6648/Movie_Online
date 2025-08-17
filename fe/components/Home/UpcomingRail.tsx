"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

/* ================== Types ================== */
export type UpcomingItem = {
    id: string | number;
    backdrop: string; // 16:9 landscape
    title: string; // vi
    subtitle?: string; // en
    tag?: string; // default: "Sắp chiếu"
};

export interface UpcomingRailProps {
    items: UpcomingItem[];
    title?: string;
    href?: string;
    onCardClick?: (item: UpcomingItem) => void;
}

/* ================== Component ================== */
const UpcomingRail: React.FC<UpcomingRailProps> = ({
    items,
    title = "Phim Sắp Tới Trên Rổ",
    href,
    onCardClick,
}) => {
    const [current, setCurrent] = React.useState(0);

    const [sliderRef, instRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: false, // tự wrap
            renderMode: "performance",
            slides: { perView: 1.15, spacing: 16 },
            breakpoints: {
                "(min-width: 480px)": { slides: { perView: 1.6, spacing: 16 } },
                "(min-width: 640px)": { slides: { perView: 2.1, spacing: 16 } },
                "(min-width: 768px)": { slides: { perView: 2.6, spacing: 18 } },
                "(min-width: 1024px)": { slides: { perView: 3.6, spacing: 20 } },
                "(min-width: 1280px)": { slides: { perView: 4.6, spacing: 22 } },
                "(min-width: 1536px)": { slides: { perView: 5.1, spacing: 24 } },
            },
            created(s) { setCurrent(s.track.details.rel); },
            updated(s) { setCurrent(s.track.details.rel); },
            slideChanged(s) { setCurrent(s.track.details.rel); },
        },
        []
    );

    if (!items?.length) return null;

    // === wrap không cần loop ===
    const handleNext = () => {
        const s = instRef.current; if (!s) return;
        const d = s.track.details; if (!d) return;
        const last = d.maxIdx ?? 0; const next = d.rel + 1;
        if (next > last) s.moveToIdx(0); else s.moveToIdx(next);
    };
    const handlePrev = () => {
        const s = instRef.current; if (!s) return;
        const d = s.track.details; if (!d) return;
        const last = d.maxIdx ?? 0; const prev = d.rel - 1;
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
                        <div key={`upcoming-${it.id}`} className="keen-slider__slide">
                            <UpcomingCard item={it} onClick={onCardClick} />
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

export default UpcomingRail;

/* ================== Subcomponents ================== */
const UpcomingCard: React.FC<{ item: UpcomingItem; onClick?: (i: UpcomingItem) => void }> = ({
    item,
    onClick,
}) => {
    return (
        <div className="group cursor-pointer" onClick={() => onClick?.(item)}>
            {/* Thumbnail */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                <Image
                    src={item.backdrop}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Tag "Sắp chiếu" */}
                <div className="absolute left-3 top-3">
                    <Badge>{item.tag ?? "Sắp chiếu"}</Badge>
                </div>
            </div>

            {/* Info */}
            <div className="mt-3 px-0.5">
                <h3 className="truncate text-base font-semibold text-white">{item.title}</h3>
                {item.subtitle && (
                    <p className="truncate text-sm text-white/60">{item.subtitle}</p>
                )}
            </div>
        </div>
    );
};

const Badge: React.FC<React.PropsWithChildren> = ({ children }) => (
    <span className="inline-flex items-center rounded-md border border-white/20 bg-white px-2 py-0.5 text-[10px] font-semibold text-black shadow">
        {children}
    </span>
);