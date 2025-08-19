// fe/components/SeriesCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Show } from "@/lib/types";

export default function SeriesCard({ item }: { item: Show }) {
  const href = item.href ?? `/movie/${item.id}`;

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl ring-1 ring-white/10 transition hover:ring-white/20">
        <Image
          src={item.poster}
          alt={item.title}
          fill
          sizes="(min-width:1280px) 240px, (min-width:1024px) 200px, 40vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={false}
        />

        {/* Fade đáy để badge nổi rõ */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />

        {/* Badge PD./TM. */}
        <div className="absolute left-2 bottom-2 z-10 flex gap-2 text-[11px] font-semibold">
          {typeof item.pd === "number" && (
            <span className="rounded-md bg-white/90 px-2 py-0.5 text-black shadow">
              PD. {item.pd}
            </span>
          )}
          {typeof item.tm === "number" && (
            <span className="rounded-md bg-emerald-500 px-2 py-0.5 text-black shadow">
              TM. {item.tm}
            </span>
          )}
        </div>
      </div>

      {/* Title + subtitle */}
      <div className="mt-2">
        <div className="line-clamp-1 text-[15px] font-semibold tracking-tight text-white">
          {item.title}
        </div>
        {item.subtitle && (
          <div className="line-clamp-1 text-sm text-white/60">
            {item.subtitle}
          </div>
        )}
      </div>
    </Link>
  );
}
