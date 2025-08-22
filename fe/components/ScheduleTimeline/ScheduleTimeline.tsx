"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CalendarDays} from "lucide-react";
import Link from "next/link";
export type Day = {
  date: string;
  label: string;
};

export type Show = {
  id: number | string;
  title: string;
  episode?: string;
  poster: string;
  startMin: number;
  durationMin?: number;
  href?: string;
};

export type ScheduleTimelineProps = {
  days: Day[];
  itemsByDay: Record<string, Show[]>;
  heading?: string;
  startHour?: number;
  endHour?: number;
  className?: string;
  showRuler?: boolean;
};

/* Utils */
const fmtTime = (m: number) => {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
};

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const widthPct = (durationMin: number | undefined, startHour: number, endHour: number) => {
  const total = (endHour - startHour) * 60;
  const dur = Math.max(durationMin ?? 60, 30);
  return (dur / total) * 100;
};

/* Component */
export default function ScheduleTimeline({
  days,
  itemsByDay,
  heading = "Lịch chiếu",
  startHour = 8,
  endHour = 23,
  className = "",
  showRuler = true,
}: ScheduleTimelineProps) {
  const [active, setActive] = useState(days[0]?.date);
  const items = useMemo(() => itemsByDay[active ?? ""] ?? [], [active, itemsByDay]);
  const listRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = days.findIndex((d) => d.date === active);

  useEffect(() => {
    const el = document.getElementById(`day-btn-${active}`);
    el?.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
  }, [active]);

  const moveDay = (delta: number) => {
    const i = clamp(activeIndex + delta, 0, days.length - 1);
    setActive(days[i]?.date);
  };

  return (
    <section className={`w-full ${className}`} aria-labelledby="schedule-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex items-center gap-2 text-white text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6 text-white/80" />
          <h2 id="schedule-heading">{heading}</h2>
        </div>

        {/* Day selector */}
        <div className="relative mb-4 sm:mb-6">
          <button
            onClick={() => moveDay(-1)}
            disabled={activeIndex <= 0}
            aria-label="Ngày trước"
            className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/80 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <ul className="mx-12 overflow-x-auto flex gap-2 no-scrollbar snap-x snap-mandatory" role="tablist" aria-label="Chọn ngày">
            {days.map((d) => {
              const is = d.date === active;
              return (
                <li key={d.date} className="snap-center">
                  <button
                    id={`day-btn-${d.date}`}
                    role="tab"
                    aria-selected={is}
                    onClick={() => setActive(d.date)}
                    className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-400/70 ${
                      is ? "bg-yellow-500 text-black" : "bg-white/10 text-white/80 hover:text-white"
                    }`}
                  >
                    <div className="text-center leading-none">
                      {new Date(d.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}
                    </div>
                    <div className="text-[10px] sm:text-xs opacity-90">{d.label}</div>
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => moveDay(1)}
            disabled={activeIndex >= days.length - 1}
            aria-label="Ngày sau"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/80 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Timeline */}
        <div className="relative pl-0 sm:pl-16">
          <div ref={listRef} className="relative mt-4 sm:mt-6 h-auto">
            {/* Items list: vertical on mobile, horizontal on desktop */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:overflow-x-auto no-scrollbar">
              {items.map((it) => {
                const w = widthPct(it.durationMin, startHour, endHour);
                return (
                  <Link
                    key={it.id}
                    href={it.href ?? "#"}
                    className="w-full sm:w-auto h-auto sm:h-28 rounded-lg bg-white/10 text-white p-3 flex flex-col overflow-hidden hover:bg-white/20 transition sm:min-w-[260px] md:min-w-[300px]"
                  >
                    <div className="text-[11px] sm:text-xs text-white/70 font-medium mb-1">
                      {fmtTime(it.startMin)}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-24 sm:w-12 sm:h-16 rounded bg-black/30 flex-shrink-0 overflow-hidden">
                        <Image src={it.poster} alt={it.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate">{it.title}</div>
                        {it.episode && <div className="text-xs text-white/70 truncate">{it.episode}</div>}
                      </div>
                    </div>
                    <div className="hidden sm:block mt-2">
                      <div className="h-1.5 bg-white/15 rounded">
                        <div className="h-1.5 rounded bg-white/60" style={{ width: `${w}%` }} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Hint only on desktop since mobile is vertical */}
          <p className="hidden sm:block mt-3 text-[11px] text-white/60">Vuốt ngang để xem thêm</p>
        </div>
      </div>
    </section>
  );
}
