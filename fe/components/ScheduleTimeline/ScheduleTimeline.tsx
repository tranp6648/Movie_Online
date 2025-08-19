"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

export type Day = {
  date: string; // ISO YYYY-MM-DD
  label: string; // "Thứ Ba"
};

export type Show = {
  id: number | string;
  title: string;
  episode?: string; // "Tập 5"
  poster: string;
  startMin: number; // phút từ 00:00, ví dụ 8*60 = 480
  durationMin?: number;
};

export type ScheduleTimelineProps = {
  days: Day[];
  itemsByDay: Record<string, Show[]>;
  heading?: string;
  startHour?: number;
  endHour?: number;
  className?: string;
};

/* Utils */
const fmtTime = (m: number) => {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
};

const leftPct = (minute: number, startHour: number, endHour: number) => {
  const total = (endHour - startHour) * 60;
  return ((minute - startHour * 60) / total) * 100;
};

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
}: ScheduleTimelineProps) {
  const [active, setActive] = useState(days[0]?.date);
  const items = useMemo(() => itemsByDay[active] ?? [], [active, itemsByDay]);

  return (
    <section className={`w-full ${className}`} aria-labelledby="schedule-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex items-center gap-2 text-white text-2xl font-semibold mb-4">
          <CalendarDays className="h-6 w-6 text-white/80" />
          <h2 id="schedule-heading">{heading}</h2>
        </div>

        {/* Day selector */}
        <div className="relative mb-6">
          <button
            onClick={() => {
              const i = Math.max(days.findIndex(d => d.date === active) - 1, 0);
              setActive(days[i].date);
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/80"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <ul className="mx-12 overflow-x-auto flex gap-2 no-scrollbar">
            {days.map(d => {
              const is = d.date === active;
              return (
                <li key={d.date}>
                  <button
                    onClick={() => setActive(d.date)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${is ? "bg-yellow-500 text-black" : "bg-white/10 text-white/80 hover:text-white"
                      }`}
                  >
                    <div>{new Date(d.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}</div>
                    <div>{d.label}</div>
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => {
              const i = Math.min(days.findIndex(d => d.date === active) + 1, days.length - 1);
              setActive(days[i].date);
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/80"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Timeline */}
        <div className="relative pl-16">
          {/* Ruler */}
    

          {/* Items */}
          {/* Items */}
         <div className="relative mt-6 h-28 flex gap-4">
  {items.map(it => (
    <a
      key={it.id}
      href="#"
      className="h-full rounded-lg bg-white/10 text-white p-3 flex flex-col overflow-hidden hover:bg-white/20 transition"
      style={{
        flex: `0 0 calc(${widthPct(it.durationMin, startHour, endHour)}% - 12px)`,
        minWidth: "300px",
      }}
    >
      {/* Giờ chiếu */}
      <div className="text-xs text-white/60 font-medium mb-1">
        {fmtTime(it.startMin)}
      </div>

      {/* Nội dung */}
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-16 rounded bg-black/30 flex-shrink-0 overflow-hidden">
          <Image src={it.poster} alt={it.title} fill className="object-cover" />
        </div>
        <div className="min-w-0">
          <div className="font-medium text-sm truncate">{it.title}</div>
          {it.episode && (
            <div className="text-xs text-white/70">{it.episode}</div>
          )}
        </div>
      </div>
    </a>
  ))}
</div>

        </div>
      </div>
    </section>
  );
}
