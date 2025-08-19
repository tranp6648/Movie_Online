'use client'

import Image from 'next/image'
import { Film, Play } from 'lucide-react'

export type WideMovie = {
  id: string
  title: string
  subtitle?: string
  poster: string
  status?: 'done' | 'live' | 'upcoming'
  source?: string           // ví dụ: "Rố Phim"
  timeAgo?: string          // "13 ngày trước"
  href?: string
}

const statusLabel = (s?: WideMovie['status']) => {
  switch (s) {
    case 'live':
      return { text: 'Đang phát', className: 'bg-emerald-500/90' }
    case 'upcoming':
      return { text: 'Sắp chiếu', className: 'bg-amber-500/90' }
    default:
      return { text: 'Đã kết thúc', className: 'bg-rose-600/90' }
  }
}

export default function MovieCardWide({ item }: { item: WideMovie }) {
  const s = statusLabel(item.status)

  return (
    <article className="group overflow-hidden rounded-2xl bg-white/3 ring-1 ring-white/10 transition hover:ring-white/20">
      <div className="relative aspect-[16/9] w-full">
        <Image
          fill
          src={item.poster}
          alt={item.title}
          sizes="(min-width:1280px) 33vw,(min-width:1024px) 50vw,100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        <div className="absolute left-3 bottom-3">
          <span className={`inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-semibold text-white shadow ${s.className}`}>
            <Play className="h-4 w-4" />
            {s.text}
          </span>
        </div>
      </div>

      <div className="p-3">
        <div className="mb-1 flex items-center gap-2 text-white/80">
          <Film className="h-5 w-5 opacity-90" />
          <h3 className="line-clamp-2 text-[15px] font-semibold text-white">
            {item.title}
          </h3>
        </div>

        {item.subtitle && (
          <p className="line-clamp-1 text-sm text-white/60">{item.subtitle}</p>
        )}

        <div className="mt-2 flex items-center gap-3 text-xs text-white/60">
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-4 w-4 rounded-full bg-white/10 ring-1 ring-white/15" />
            {item.source ?? 'Rố Phim'}
          </span>
          {item.timeAgo && (
            <>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>{item.timeAgo}</span>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
