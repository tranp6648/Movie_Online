'use client'

import { Bell, Eye, Radio } from 'lucide-react'
import SafeImage from '@/components/common/SafeImage'

export type WatchEvent = {
  id: string
  title: string
  subtitle?: string
  poster: string
  status: 'live' | 'upcoming' | 'done'
  hostName: string
  hostAvatar: string
  timeAgo?: string
  viewers?: number
}

const FALLBACK_POSTER =
  'https://res.cloudinary.com/demo/image/upload/w_1200,h_675,c_fill,gravity=center/sample.jpg'
const FALLBACK_AVATAR = 'https://i.pravatar.cc/80?img=5'

export default function WatchCard({ item }: { item: WatchEvent }) {
  const isLive = item.status === 'live'
  const isUpcoming = item.status === 'upcoming'

  return (
    <article className="overflow-hidden rounded-xl bg-[#111] p-2 transition hover:bg-[#1a1a1a] animate-fadeIn">
      {/* Poster */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <SafeImage
          src={item.poster || FALLBACK_POSTER}
          fallbackSrc={FALLBACK_POSTER}
          alt={item.title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
          className="object-cover"
        />

        {/* Badge LIVE / Đang chờ */}
        {isLive && (
          <div className="absolute left-2 top-2 rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse" />
            LIVE
          </div>
        )}
        {isUpcoming && (
          <div className="absolute left-2 top-2 rounded-md bg-gray-900/80 px-2 py-1 text-xs font-semibold text-white flex items-center gap-1 ring-1 ring-white/20">
            <Radio className="h-3 w-3" />
            Đang chờ
          </div>
        )}

        {/* Viewer count */}
        {typeof item.viewers === 'number' && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
            <Eye className="h-4 w-4" />
            {item.viewers.toLocaleString()} đang xem
          </div>
        )}

        {/* Button Nhắc */}
        {isUpcoming && (
          <button
            className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white ring-1 ring-white/20 hover:bg-black/80"
          >
            <Bell className="h-4 w-4" />
            Nhắc
          </button>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 flex items-start gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <SafeImage
            src={item.hostAvatar || FALLBACK_AVATAR}
            fallbackSrc={FALLBACK_AVATAR}
            alt={item.hostName}
            width={40}
            height={40}
            className={`h-10 w-10 rounded-full ring-2 ${isLive ? 'ring-red-500' : 'ring-transparent'}`}
          />
        </div>

        {/* Title + subtitle */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-white">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="truncate text-xs text-white/70">{item.subtitle}</p>
          )}
          <div className="mt-1 flex items-center gap-1 text-[11px] text-white/50">
            <span>{item.hostName}</span>
            {item.timeAgo && (
              <>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>{item.timeAgo}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
