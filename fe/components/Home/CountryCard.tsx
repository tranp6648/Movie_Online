// fe/components/Home/CountryCard.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Show } from '@/lib/types'

export default function CountryCard({ item }: { item: Show }) {
  const href = item.href ?? `/movie/${item.id}`

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-white/10 transition
                      hover:ring-white/20 hover:shadow-[0_6px_24px_rgba(0,0,0,.35)]">
        <Image
          src={item.poster}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width:1280px) 33vw, (min-width:1024px) 50vw, 100vw"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
        <div className="absolute left-3 bottom-3 z-10 flex gap-2 text-[12px] font-semibold">
          {typeof item.pd === 'number' && (
            <span className="rounded-md bg-white/90 px-2 py-1 text-black shadow">PD. {item.pd}</span>
          )}
          {typeof item.tm === 'number' && (
            <span className="rounded-md bg-emerald-500 px-2 py-1 text-black shadow">TM. {item.tm}</span>
          )}
        </div>
      </div>

      <div className="mt-2">
        <div className="line-clamp-1 text-[15px] font-semibold tracking-tight text-white">{item.title}</div>
        {item.subtitle && <div className="line-clamp-1 text-sm text-white/60">{item.subtitle}</div>}
      </div>
    </Link>
  )
}
