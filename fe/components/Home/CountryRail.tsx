// fe/components/Home/CountryRail.tsx
'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import CountryCard from './CountryCard'
import type { Show } from '@/lib/types'

type Group = {
  title: string
  viewAllHref: string
  items: Show[]
  accentTitle?: string
}

type Props =
  | {
      // CHẾ ĐỘ CŨ: 1 nhóm (dùng cho 3 section liên tục)
      title: string
      viewAllHref?: string
      items: Show[]
      accentTitle?: string
      groups?: never
      initialIndex?: never
    }
  | {
      // CHẾ ĐỘ MỚI: nhiều nhóm dạng tab (không dùng ở trang Home hiện tại)
      groups: Group[]
      initialIndex?: number
      title?: string
      viewAllHref?: string
      items?: never
      accentTitle?: never
    }

// Type-guard an toàn
function hasGroups(p: Props): p is { groups: Group[]; initialIndex?: number } {
  return "groups" in p && Array.isArray(p.groups)
}


export default function CountryRail(props: Props) {
  const isTabbed = hasGroups(props)

  // Thu hẹp kiểu & biến dùng xuyên suốt
  const groups: Group[] = isTabbed ? props.groups : []
  const [idx, setIdx] = useState(isTabbed ? props.initialIndex ?? 0 : 0)
  const active = isTabbed ? groups[idx] : undefined

  const title = isTabbed ? (active?.title ?? '') : props.title
  const viewAllHref = isTabbed ? (active?.viewAllHref ?? '#') : (props.viewAllHref ?? '#')
  const items: Show[] = isTabbed ? (active?.items ?? []) : props.items
  const accentTitle =
    isTabbed ? (active?.accentTitle ?? 'from-white to-white/70')
             : (props.accentTitle ?? 'from-white to-white/70')

  const scroller = useRef<HTMLDivElement>(null)
  const titles = useMemo(() => (isTabbed ? groups.map(g => g.title) : []), [isTabbed, groups])

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current
    if (!el) return
    const step = Math.round(el.clientWidth * 0.92)
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="relative mt-10 rounded-3xl border border-white/5 bg-[#171A1F]/60 p-5 lg:p-7">
      <div className="grid gap-6 sm:grid-cols-[220px_1fr] md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Cột trái: tiêu đề / tabs + link */}
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent p-3 sm:p-4 lg:p-5">
          {isTabbed ? (
            <div className="space-y-3">
              {titles.map((t, i) => {
                const activeTab = i === idx
                return (
                  <button
                    key={t}
                    onClick={() => setIdx(i)}
                    className={[
                      'block w-full rounded-xl px-2 py-1.5 text-left transition',
                      activeTab ? 'bg-white/[0.04]' : 'hover:bg-white/[0.03]',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'bg-clip-text text-[28px] sm:text-[32px] xl:text-[36px] font-extrabold leading-tight',
                        activeTab ? `bg-gradient-to-b ${accentTitle} text-transparent` : 'text-white/70',
                      ].join(' ')}
                    >
                      {t}
                    </span>
                  </button>
                )
              })}
            </div>
          ) : (
            <h2
              className={`bg-gradient-to-b ${accentTitle} bg-clip-text text-[28px] sm:text-[32px] xl:text-[36px] font-extrabold leading-tight text-transparent`}
            >
              {title}
            </h2>
          )}

          <Link
            href={viewAllHref}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pink-300 hover:text-pink-200"
          >
            Xem toàn bộ <span aria-hidden>›</span>
          </Link>
        </div>

        {/* Cột phải: scroller + nút cuộn */}
        <div className="relative">
          <div
            ref={scroller}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 pr-16"
          >
            {items.map((it) => (
  <div
    key={it.id}
    className="
      snap-start flex-[0_0_auto]
      min-w-[calc(100%-0px)]            /* mobile: 1 card */
      md:min-w-[calc((100%-20px)/2)]   /* md (≥768px): 2 card */
      xl:min-w-[calc((100%-48px)/3)]   /* xl (≥1280px): 3 card */
    "
  >
    <CountryCard item={it} />
  </div>
))}

          </div>

          <button
            onClick={() => scrollBy(-1)}
            className="absolute left-2 top-1/2 z-[1] grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full
                       bg-white text-black shadow-lg ring-1 ring-black/10 backdrop-blur hover:opacity-90"
            aria-label="Cuộn sang trái"
          >
            ‹
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="absolute right-2 top-1/2 z-[1] grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full
                       bg-white text-black shadow-lg ring-1 ring-black/10 backdrop-blur hover:opacity-90"
            aria-label="Cuộn sang phải"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
