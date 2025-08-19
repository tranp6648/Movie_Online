'use client'

import { Film, Play } from 'lucide-react'
import SafeImage from '@/components/common/SafeImage'

export type WideMovie = {
  id: string
  title: string
  subtitle?: string
  poster: string
  status?: 'done' | 'live' | 'upcoming'
  source?: string
  timeAgo?: string
  href?: string
}

const FALLBACK_POSTER =
  'https://res.cloudinary.com/demo/image/upload/w_1200,h_675,c_fill,gravity=center/sample.jpg'

const statusLabel = (s?: WideMovie['status']) => {
  switch (s) {
    case 'live': return { text: 'Đang phát', className: 'bg-emerald-500/90 animate-pulse' }
    case 'upcoming': return { text: 'Sắp chiếu', className: 'bg-amber-500/90' }
    default: return { text: 'Đã kết thúc', className: 'bg-rose-600/90' }
  }
}

export default function MovieCardWide({ item }: { item: WideMovie }) {
  const s = statusLabel(item.status)
  const src = item.poster || FALLBACK_POSTER

  return (
    <article className="group overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:ring-white/30 animate-fadeIn">
      <div className="relative aspect-[16/9] w-full">
        <SafeImage
          fill
          src={src}
          fallbackSrc={FALLBACK_POSTER}
          alt={item.title}
          sizes="(min-width:1536px) 25vw, (min-width:1280px) 33vw, (min-width:1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute left-3 bottom-3 z-[1]">
          <span className={`inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-semibold text-white shadow ${s.className}`}>
            <Play className="h-4 w-4" />
            {s.text}
          </span>
        </div>
      </div>

      <div className="p-3">
        <div className="mb-1 flex items-center gap-2 text-white">
          <Film className="h-5 w-5 opacity-90" />
          <h3 className="line-clamp-2 text-[15px] font-semibold text-white">{item.title}</h3>
        </div>

        {item.subtitle && <p className="line-clamp-1 text-[13px] text-white/70">{item.subtitle}</p>}

        <div className="mt-2 flex items-center gap-3 text-[12px] text-white/60">
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-4 w-4 rounded-full bg-white/10 ring-1 ring-white/15" />
            {item.source ?? 'Rố Phim'}
          </span>
          {item.timeAgo && <>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{item.timeAgo}</span>
          </>}
        </div>
      </div>
    </article>
  )
}
