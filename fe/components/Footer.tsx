'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Send,
  Gamepad2,
  X,
  Facebook,
  Music2,
  Youtube,
  Instagram,
  Github,
} from 'lucide-react'
import { useEffect, useState } from 'react'

const SOCIALS = [
  { href: '#', Icon: Send, label: 'Telegram' },
  { href: '#', Icon: Gamepad2, label: 'Game' },
  { href: '#', Icon: X, label: 'X/Twitter' },
  { href: '#', Icon: Facebook, label: 'Facebook' },
  { href: '#', Icon: Music2, label: 'TikTok/Music' },
  { href: '#', Icon: Youtube, label: 'YouTube' },
  { href: '#', Icon: Instagram, label: 'Instagram' },
  { href: '#', Icon: Github, label: 'Github' },
]

export default function Footer() {
  // Scroll-to-top button
  const [showToTop, setShowToTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowToTop(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0f1217]">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:px-8">

        {/* Logo + Social */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Image
              src="/logo.svg"
              alt="RoPhim"
              width={44}
              height={44}
              className="h-11 w-11"
              priority
            />
            <div className="leading-tight text-center md:text-left">
              <div className="text-2xl font-bold text-white">RoPhim</div>
              <div className="text-sm text-white/70">Phim hay cá rỗ</div>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {SOCIALS.map(({ href, Icon, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/80 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Links row 1 */}
        <nav className="mb-3 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-[15px] md:flex md:flex-wrap md:gap-x-8">
          <Link href="#" className="text-white hover:text-white/80">Hỏi-Đáp</Link>
          <Link href="#" className="text-white hover:text-white/80">Chính sách bảo mật</Link>
          <Link href="#" className="text-white hover:text-white/80">Điều khoản sử dụng</Link>
          <Link href="#" className="text-white hover:text-white/80">Giới thiệu</Link>
          <Link href="#" className="text-white hover:text-white/80">Liên hệ</Link>
        </nav>

        {/* Links row 2 */}
        <nav className="mb-6 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] sm:flex sm:flex-wrap sm:gap-x-10">
          <Link href="#" className="text-white/80 hover:text-white">Dongphim</Link>
          <Link href="#" className="text-white/80 hover:text-white">Ghienphim</Link>
          <Link href="#" className="text-white/80 hover:text-white">Motphim</Link>
          <Link href="#" className="text-white/80 hover:text-white">Subnhanh</Link>
        </nav>

        {/* Description */}
        <p className="max-w-5xl text-[15px] leading-7 text-white/80 text-center md:text-left">
          RoPhim – Phim hay cá rỗ – Trang xem phim online chất lượng cao miễn
          phí Vietsub, thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ,
          phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn
          Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám
          phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!
        </p>

        {/* Copyright */}
        <div className="mt-6 text-[15px] text-white/60 text-center md:text-left">
          © 2024 RoPhim
        </div>
      </div>

      {/* Scroll to top */}
      {showToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 grid h-12 w-12 place-items-center rounded-xl bg-white text-black shadow-lg ring-1 ring-black/10"
        >
          ↑
        </button>
      )}
    </footer>
  )
}
