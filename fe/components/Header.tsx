"use client";
import { useState, useEffect } from "react";
import { Search, User, Download, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
const navItems = [
  { label: "Chủ Đề", href: "/Topic" },
  { label: "Thể loại", href: "/type/tinh-cam" },
  { label: "Phim Lẻ", href: "/Movie" },
  { label: "Phim Bộ", href: "/series" },
  { label: "Xem Chung", href: "/general-view" },
  { label: "Quốc gia", href: "/country/cn" },
  { label: "Diễn Viên", href: "/actor" },
  { label: "Lịch chiếu", href: "/Schedule" },
];
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#0F111A]/95  border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-4 lg:px-8 py-2 sm:py-3">
        {/* LEFT: Logo + Search */}
        <div className="flex items-center gap-3 lg:gap-6 flex-shrink-0">
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="hidden max-[1770px]:inline-flex p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link href="/">
            <img
              src="/logo.svg"
              alt="RoPhim"
              className="h-8 sm:h-9 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop search */}
          <div className="relative hidden lg:block w-full max-w-[300px] lg:max-w-[360px]">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
            />
            <input
              type="search"
              placeholder="Tìm kiếm phim, diễn viên"
              className="w-full h-11 pl-10 pr-3 text-sm text-white placeholder-gray-400 
               bg-[rgba(255,255,255,0.08)] rounded-md border border-transparent
               outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>
        </div>

        {/* CENTER: Desktop menu items */}
        <nav className="hidden min-[1770px]:flex ml-12 justify-start flex-6">
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-200">
            {navItems.map((item, idx) => (
    <li key={idx}>
      <Link
        href={item.href}
        className="hover:text-yellow-400 mr-5"
      >
        {item.label}
      </Link>
    </li>
  ))}
            <li>
              <Link
                href="#"
                className="inline-flex items-center hover:text-yellow-400"
              >
                Rô Bóng
                <span className="ml-1 text-[10px] font-bold bg-yellow-400 text-black px-1.5 py-0.5 rounded-md">
                  NEW
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* RIGHT: Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Mobile search trigger */}
          <button
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="hidden max-[1770px]:inline-flex items-center justify-center rounded-full p-2 border border-white/20 bg-white/10 text-white/90 hover:bg-white/20"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Download App */}
          <button className="hidden min-[1770px]:flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-md text-white text-xs sm:text-sm">
            <Download className="h-4 w-4 sm:h-5 sm:w-5" />
            <div className="hidden sm:flex flex-col leading-tight text-left">
              <span className="text-[11px] text-gray-300">Tải ứng dụng</span>
              <span className="text-sm font-semibold">RoPhim</span>
            </div>
          </button>

          {/* Member */}
          <button className="hidden min-[1770px]:flex items-center gap-1 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-black shadow-sm border border-black/10">
            <User className="h-4 w-4" />
            <span className="text-xs sm:text-sm font-medium">Thành viên</span>
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH */}
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
      <div
        className={`hidden max-[1770px]:flex fixed inset-0 z-40 transition ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        {/* Drawer */}
        <aside
          className={`absolute left-0 top-0 h-full w-72 max-w-[85%] bg-[#0F111A] border-r border-white/10 p-4 transform transition-transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <img src="/logo.svg" alt="RoPhim" className="h-8 w-auto" />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-4 text-sm space-y-1 text-gray-200">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="block rounded-md px-3 py-2 hover:bg-white/10 hover:text-yellow-400"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#"
              className="flex items-center px-3 py-2 rounded-md hover:bg-white/10"
            >
              Rô Bóng
              <span className="ml-2 text-[10px] font-bold bg-yellow-400 text-black px-1.5 py-0.5 rounded-md">
                NEW
              </span>
            </Link>
          </nav>
        </aside>
      </div>
    </header>
  );
}
