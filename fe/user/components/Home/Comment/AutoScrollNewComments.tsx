"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
export type NewComments = {
    id: string;
    user: { name: string; avatar: string; tag?: string };
    text: string;
    on: string;
}
type Props = {
    items:NewComments[];
    height?:number;
    speed?:number;
}
const AutoScrollNewComments: React.FC<Props> = ({
  items,
  height = 320,
  speed = 0.6,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstListRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    const first = firstListRef.current;
    if (!el || !first || items.length === 0) return;

    let raf = 0;
    const step = () => {
      if (!paused) {
        el.scrollTop += speed;
        // Loop mượt: khi cuộn vượt chiều cao list đầu => reset về 0
        if (el.scrollTop >= first.offsetHeight) el.scrollTop = 0;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused, speed, items]);

  if (!items?.length) return null;

  return (
    <div
      ref={containerRef}
      className="mt-3 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]"
      style={{ maxHeight: height }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ẩn scrollbar cho WebKit */}
      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Danh sách gốc */}
      <div ref={firstListRef} className="space-y-3">
        {items.map((c) => (
          <CommentCard key={`c-${c.id}`} c={c} />
        ))}
      </div>

      {/* Bản nhân đôi để loop vô hạn mượt */}
      <div className="space-y-3" aria-hidden>
        {items.map((c, i) => (
          <CommentCard key={`c-clone-${c.id}-${i}`} c={c} />
        ))}
      </div>
    </div>
  );
};

/* ===== Subcomponent ===== */
const CommentCard: React.FC<{ c: NewComments }> = ({ c }) => (
  <div className="rounded-xl border border-white/5 bg-white/5 p-3">
    <div className="flex items-start gap-3">
      <div className="relative h-9 w-9 overflow-hidden rounded-full">
        <Image src={c.user.avatar} alt={c.user.name} fill />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center gap-2">
          {c.user.tag && (
            <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-300">
              {c.user.tag}
            </span>
          )}
          <span className="truncate text-sm font-medium">{c.user.name}</span>
        </div>
        <p className="truncate text-sm text-gray-300">{c.text}</p>
        <p className="mt-0.5 text-xs text-gray-400">• {c.on}</p>
      </div>
    </div>
  </div>
);

export default AutoScrollNewComments;