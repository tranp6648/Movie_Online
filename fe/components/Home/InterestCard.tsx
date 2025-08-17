import Link from 'next/link'
import { cn } from '@/lib/utils'


type InterestCardProps = {
  title: string
  href: string
  from: string  // ví dụ 'from-indigo-600'
  to: string    // ví dụ 'to-blue-400'
  muted?: boolean // dùng cho thẻ “+4 chủ đề” (màu xám)
}

export default function InterestCard({
  title,
  href,
  from,
  to,
  muted,
}: InterestCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative h-36 overflow-hidden rounded-2xl p-6 ring-1 ring-white/10 transition',
        'hover:-translate-y-0.5 hover:ring-white/20',
        muted ? 'bg-neutral-800/60' : `bg-gradient-to-br ${from} ${to}`
      )}
    >
      {/* Pattern sóng trang trí */}
      <svg
        className="pointer-events-none absolute -right-8 -top-8 h-56 w-56 opacity-30"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        {[...Array(9)].map((_, i) => (
          <circle
            key={i}
            cx="100" cy="100" r={20 + i * 10}
            stroke="white" strokeOpacity="0.35" strokeWidth="1"
          />
        ))}
      </svg>

      <div className="relative flex h-full flex-col justify-between">
        <h3 className="text-2xl font-bold leading-tight text-white drop-shadow">
          {title}
        </h3>

        <span className="inline-flex items-center gap-1 text-sm font-semibold text-white/90">
          Xem chủ đề <span aria-hidden>›</span>
        </span>
      </div>
    </Link>
  )
}
