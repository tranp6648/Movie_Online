'use client'

import { Settings, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import MovieCardWide from '@/components/general/MovieCardWide'
import { premieres } from '@/data/generalViewData'

export default function GeneralViewPage() {
  return (
    <main className="relative">
      {/* Hero rạp phim */}
      <section
        className="relative overflow-hidden"
        aria-label="cinema-hero"
      >
        <div className="mx-auto max-w-[1400px] px-4 pt-[var(--app-header-h,96px)] pb-10">
          <div className="flex justify-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-base font-semibold text-white shadow-lg ring-1 ring-white/10 hover:bg-white/10">
              <Settings className="h-5 w-5" />
              Quản lý
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-white/6 px-6 py-3 text-base font-semibold text-white shadow-lg ring-1 ring-white/15 hover:bg-white/12">
              <Plus className="h-5 w-5" />
              Tạo mới
            </button>
          </div>
        </div>

        {/* nền ghế rạp – gradient + blur nhẹ */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(1000px 400px at 50% -100px, rgba(255,255,255,0.08), rgba(0,0,0,0) 50%), radial-gradient(800px 300px at 20% -60px, rgba(255,255,255,0.05), transparent 60%), radial-gradient(800px 300px at 80% -60px, rgba(255,255,255,0.05), transparent 60%)',
            filter: 'blur(0.3px)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[url(/cinema-seats.png)] bg-cover bg-center opacity-[0.08]" />
      </section>

      {/* Công chiếu */}
      <section className="mx-auto max-w-[1400px] px-4 pb-20">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Công Chiếu
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {premieres.map((m) => (
            <MovieCardWide key={m.id} item={m} />
          ))}
        </div>
      </section>
    </main>
  )
}
