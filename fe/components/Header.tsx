"use client";
import { useEffect, useState } from "react";
import { Search, User, Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openType, setOpenType] = useState(false);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (menuOpen) root.classList.add("overflow-hidden");
    else root.classList.remove("overflow-hidden");
    return () => root.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${scrolled ? "bg-[#0F111A]/95 backdrop-blur border-b border-white/10" : "bg-transparent"
        }`}
    >
      {/* TOP BAR */}
      <div className="mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
        {/* Left: menu button + logo */}
        <div className="flex items-center gap-2">
          <button
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            className="inline-flex lg:hidden items-center justify-center rounded-md p-2 text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/">
            <img src="/logo.svg" alt="RoPhim" className="h-8 sm:h-9 md:h-10 w-auto" />
          </Link>
        </div>

        {/* CENTER: NAV + SEARCH CÙNG HÀNG (desktop) */}
        <div className="flex-1 flex max-[767px]:hidden items-center justify-center gap-4">
          {/* Nav desktop giữ nguyên item */}
          <nav className="hidden [@media(min-width:1490px)]:flex text-sm font-medium">
            <ul className="flex items-center gap-5 text-gray-200">
              <li><Link href="/Topic" className="hover:text-yellow-400 transition-colors">Chủ Đề</Link></li>
              <li className="relative">
                <button
                  onClick={() => setOpenType(!openType)}
                  className="hover:text-yellow-400 transition-colors flex items-center gap-1"
                >
                  Thể loại ▾
                </button>

                {/* Menu dropdown */}
                {openType && (
                  <ul className="absolute left-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-lg ring-1 ring-white/10 overflow-hidden z-50">
                    <li>
                      <Link
                        href="/type/co-trang"
                        className="block px-4 py-2 hover:bg-zinc-800 transition"
                      >
                        Phim Cổ Trang
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/type/tinh-cam"
                        className="block px-4 py-2 hover:bg-zinc-800 transition"
                      >
                        Phim Tình Cảm
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/type/hanh-dong"
                        className="block px-4 py-2 hover:bg-zinc-800 transition"
                      >
                        Phim Hành Động
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li><Link href="/Movie" className="hover:text-yellow-400 transition-colors">Phim Lẻ</Link></li>
              <li><Link href="/series" className="hover:text-yellow-400 transition-colors">Phim Bộ</Link></li>
              <li><Link href="/general-view" className="hover:text-yellow-400 transition-colors">Xem Chung</Link></li>

              <li className="relative">
                <button
                  onClick={() => setOpenCountry(!openCountry)}
                  className="flex items-center gap-1 hover:text-yellow-400 transition-colors"
                >
                  Quốc gia
                  <ChevronDown className={`h-4 w-4 transition-transform ${openCountry ? "rotate-180" : ""}`} />
                </button>
                {openCountry && (
                  <div className="absolute left-0 mt-2 w-40 rounded-md bg-[#0F111A] border border-white/10 shadow-lg z-50">
                    <ul className="py-2 text-sm text-white">
                      <li><Link href="/country/uk" className="block px-4 py-2 hover:bg-white/10">Anh</Link></li>
                      <li><Link href="/country/us" className="block px-4 py-2 hover:bg-white/10">Mỹ</Link></li>
                      <li><Link href="/country/kr" className="block px-4 py-2 hover:bg-white/10">Hàn Quốc</Link></li>
                      <li><Link href="/country/jp" className="block px-4 py-2 hover:bg-white/10">Nhật Bản</Link></li>
                      <li><Link href="/country/cn" className="block px-4 py-2 hover:bg-white/10">Trung Quốc</Link></li>
                    </ul>
                  </div>
                )}
              </li>

              <li><Link href="/actor" className="hover:text-yellow-400 transition-colors">Diễn Viên</Link></li>
              <li><Link href="/Schedule" className="hover:text-yellow-400 transition-colors">Lịch chiếu</Link></li>
              <li>
                <Link href="#" className="hover:text-yellow-400 transition-colors inline-flex items-center">
                  Rô Bóng
                  <span className="ml-1 text-[10px] font-bold bg-yellow-400 text-black px-1.5 py-0.5 rounded-md shadow">NEW</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Search desktop */}
          <div className="hidden lg:flex items-center bg-white/10 border border-white/20 px-3 py-2 rounded-full w-[260px] lg:w-[360px] shadow-sm hover:shadow-md transition">
            <Search size={18} className="text-gray-300" />
            <input
              type="text"
              placeholder="Tìm kiếm phim, diễn viên..."
              className="bg-transparent text-sm text-white placeholder-gray-400 outline-none ml-2 w-full"
            />
          </div>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Mobile search trigger */}
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-full p-2 border border-white/20 bg-white/10 text-white/90 hover:bg-white/20"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label={mobileSearchOpen ? "Đóng tìm kiếm" : "Mở tìm kiếm"}
          >
            <Search className="h-5 w-5" />
          </button>

          <button className="hidden xs:flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-md text-white text-xs sm:text-sm">
            <Download className="h-4 w-4 sm:h-5 sm:w-5" />
            <div className="hidden sm:flex flex-col leading-tight text-left">
              <span className="text-[11px] text-gray-300">Tải ứng dụng</span>
              <span className="text-sm font-semibold">RoPhim</span>
            </div>
          </button>

          <button className="hidden lg:flex items-center gap-1 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-black shadow-sm border border-black/10">
            <User className="h-4 w-4" />
            <span className="text-xs sm:text-sm font-medium">Thành viên</span>
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      {mobileSearchOpen && (
        <div className="border-t border-white/10 bg-[#0F111A]/95">
          <div className="px-3 py-2">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-2 rounded-full">
              <Search size={18} className="text-gray-300" />
              <input
                type="text"
                autoFocus
                placeholder="Tìm kiếm phim, diễn viên..."
                className="bg-transparent text-sm text-white placeholder-gray-400 outline-none w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU DRAWER */}
      <div className={`lg:hidden fixed inset-0 z-40 transition ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-72 max-w-[85%] bg-[#0F111A] border-r border-white/10 p-4 transform transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <img src="/logo.svg" alt="RoPhim" className="h-8 w-auto" />
            </Link>
            <button
              aria-label="Đóng menu"
              className="rounded-md p-2 text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-4 text-sm space-y-1 text-gray-200">
            {["Chủ Đề", "Thể loại", "Phim Lẻ", "Phim Bộ", "Xem Chung", "Quốc gia", "Diễn Viên", "Lịch chiếu"].map((item) => (
              <Link key={item} href="#" className="block rounded-md px-3 py-2 hover:bg-white/10 hover:text-yellow-400" onClick={() => setMenuOpen(false)}>
                {item}
              </Link>
            ))}
            <Link href="#" className="flex items-center px-3 py-2 rounded-md hover:bg-white/10">
              Rô Bóng
              <span className="ml-2 text-[10px] font-bold bg-yellow-400 text-black px-1.5 py-0.5 rounded-md shadow">NEW</span>
            </Link>
          </nav>

          <div className="mt-4 border-t border-white/10 pt-4 grid grid-cols-2 gap-2">
            <Link href="#" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white hover:bg-white/10">
              <Download className="h-4 w-4" />
              <span className="text-sm">Tải RoPhim</span>
            </Link>
            <Link href="#" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black px-3 py-2 border border-black/10">
              <User className="h-4 w-4" />
              <span className="text-sm">Thành viên</span>
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
