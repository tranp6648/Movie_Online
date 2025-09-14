'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Send, Gamepad2, X, Facebook, Music2,
  Youtube, Instagram, Github, ArrowUp
} from 'lucide-react'
import { useEffect, useState } from 'react'

const SOCIALS = [
  { href: '#', Icon: Send, label: 'Telegram' },
  { href: '#', Icon: Gamepad2, label: 'Game' },
  { href: '#', Icon: X, label: 'Twitter / X' },
  { href: '#', Icon: Facebook, label: 'Facebook' },
  { href: '#', Icon: Music2, label: 'TikTok' },
  { href: '#', Icon: Youtube, label: 'YouTube' },
  { href: '#', Icon: Instagram, label: 'Instagram' },
  { href: '#', Icon: Github, label: 'Github' },
]

export default function Footer() {
  const [showToTop, setShowToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer className="relative mt-20 bg-gradient-to-b from-[#0f1217] via-[#0a0d13] to-black text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,0,150,0.2),transparent_60%),radial-gradient(circle_at_bottom_left,rgba(0,200,255,0.15),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        
        {/* Logo + Newsletter */}
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="RoPhim logo" width={50} height={50} className="h-12 w-12" />
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">RoPhim</h2>
              <p className="text-sm text-white/70">Phim hay cá rỗ</p>
            </div>
          </Link>

          {/* Newsletter */}
          <div className="text-center md:text-right">
            <p className="mb-3 text-sm text-white/70">Đăng ký nhận thông báo phim mới 🎬</p>
            <form className="flex justify-center md:justify-end gap-2">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-pink-500 w-64"
              />
              <button className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-sm font-medium shadow hover:opacity-90 transition">
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        {/* Social */}
        <nav aria-label="Mạng xã hội" className="mb-12">
          <ul className="flex flex-wrap justify-center gap-4">
            {SOCIALS.map(({ href, Icon, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 backdrop-blur-md text-white/80 transition hover:scale-110 hover:text-white hover:shadow-[0_0_15px_rgba(255,0,150,0.6)]"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Links */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <nav aria-label="Chính sách">
            <h3 className="mb-3 font-semibold text-white">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#">Hỏi-Đáp</Link></li>
              <li><Link href="#">Chính sách bảo mật</Link></li>
              <li><Link href="#">Điều khoản sử dụng</Link></li>
            </ul>
          </nav>
          <nav aria-label="Thông tin">
            <h3 className="mb-3 font-semibold text-white">Thông tin</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#">Giới thiệu</Link></li>
              <li><Link href="#">Liên hệ</Link></li>
              <li><Link href="#">Tuyển dụng</Link></li>
            </ul>
          </nav>
          <nav aria-label="Đối tác">
            <h3 className="mb-3 font-semibold text-white">Đối tác</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#">Dongphim</Link></li>
              <li><Link href="#">Ghienphim</Link></li>
              <li><Link href="#">Motphim</Link></li>
              <li><Link href="#">Subnhanh</Link></li>
            </ul>
          </nav>
        </div>

        {/* Description */}
        <p className="mt-12 max-w-4xl text-center text-sm text-white/70 mx-auto leading-6">
          <strong>RoPhim</strong> – Nền tảng xem phim online chất lượng cao miễn phí. 
          Kho phim khổng lồ: phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia 
          (Việt Nam, Hàn Quốc, Trung Quốc, Nhật Bản, Mỹ, Âu…) với đa dạng thể loại.  
          Trải nghiệm phim trực tuyến chuẩn 4K – cập nhật nhanh nhất 2024.
        </p>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs text-white/50">
          © 2024 RoPhim – All rights reserved.
        </div>
      </div>

      {/* Scroll to top */}
      {showToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg animate-pulse hover:scale-110 transition"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  )
}
