'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  page: number
  totalPages: number
  onChange: (p: number) => void
}

export default function Pager({ page, totalPages, onChange }: Props) {
  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 transition hover:bg-white/20 disabled:opacity-40"
        title="Trang trước"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <span className="px-3 text-sm">
        Trang <b>{page}</b> / {totalPages}
      </span>

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 transition hover:bg-white/20 disabled:opacity-40"
        title="Trang sau"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
