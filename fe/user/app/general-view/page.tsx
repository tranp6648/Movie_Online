'use client'

import { Settings, Plus } from 'lucide-react'
import MovieCardWide from '@/components/general/MovieCardWide'
import WatchCard from '@/components/general/WatchCard'
import Pager from '@/components/general/Pager'

import { premieres, watchTogether } from '@/data/generalViewData'
import { useMemo, useState } from 'react'

const PAGE_SIZE_WATCH = 20
const PAGE_SIZE_PREMIERE = 20   // 4 x 5 = 20 phim / trang

export default function GeneralViewPage() {
  const [pagePremiere, setPagePremiere] = useState(1)
  const [pageWatch, setPageWatch] = useState(1)

  const totalPremierePages = Math.max(1, Math.ceil(premieres.length / PAGE_SIZE_PREMIERE))
  const totalWatchPages = Math.max(1, Math.ceil(watchTogether.length / PAGE_SIZE_WATCH))

  const premiereItems = useMemo(() => {
    const start = (pagePremiere - 1) * PAGE_SIZE_PREMIERE
    return premieres.slice(start, start + PAGE_SIZE_PREMIERE)
  }, [pagePremiere])

  const watchItems = useMemo(() => {
    const start = (pageWatch - 1) * PAGE_SIZE_WATCH
    return watchTogether.slice(start, start + PAGE_SIZE_WATCH)
  }, [pageWatch])

  return (
    <main className="relative min-h-screen text-white bg-gradient-to-b from-[#0d0d0d] via-[#111] to-[#1a1a1a]">
      {/* Background seats */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[url(/cinema-seats.png)] bg-cover bg-center opacity-10 blur-sm" />

      {/* Hero */}
      <section className="relative overflow-hidden" aria-label="cinema-hero">
        <div className="mx-auto max-w-[1400px] px-4 pt-[var(--app-header-h,96px)] pb-10">
          <div className="flex justify-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-base font-semibold text-white shadow-lg ring-1 ring-white/10 transition hover:bg-white/10">
              <Settings className="h-5 w-5" />
              Quản lý
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-base font-semibold text-white shadow-lg ring-1 ring-white/15 transition hover:bg-white/20">
              <Plus className="h-5 w-5" />
              Tạo mới
            </button>
          </div>
        </div>
      </section>

      {/* Công chiếu */}
      <section className="mx-auto max-w-[1400px] px-4 pb-12">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Công chiếu
        </h2>

        {/* Grid 4 cột */}
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {premiereItems.map((m) => (
            <MovieCardWide key={m.id} item={m} />
          ))}
        </div>

        {/* Pager cho Công chiếu */}
        <div className="mt-8 flex justify-center">
          <Pager page={pagePremiere} totalPages={totalPremierePages} onChange={setPagePremiere} />
        </div>
      </section>

      {/* Xem chung */}
      <section className="mx-auto max-w-[1400px] px-4 pb-20">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Xem chung
          </h2>
          <div className="text-sm text-white/70">
            Mỗi trang hiển thị <b>20</b> phòng xem chung
          </div>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {watchItems.map((it) => (
            <WatchCard key={it.id} item={it} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Pager page={pageWatch} totalPages={totalWatchPages} onChange={setPageWatch} />
        </div>
      </section>
    </main>
  )
}
