"use client";
import { useEffect, useState } from "react";
import { Search, User, Download } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#0F111A] border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="RoPhim" className="h-10" />
        </div>

        {/* Search */}
        <div className="flex items-center bg-white/10 border border-white/20 px-3 py-2 rounded-full w-[280px] shadow-sm hover:shadow-md transition">
          <Search size={18} className="text-gray-300" />
          <input
            type="text"
            placeholder="Tìm kiếm phim, diễn viên..."
            className="bg-transparent text-sm text-white placeholder-gray-400 outline-none ml-2 w-full"
          />
        </div>

        {/* Menu */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#" className="relative text-gray-200 hover:text-yellow-400 transition duration-200">Chủ Đề</a>
          <a href="#" className="relative text-gray-200 hover:text-yellow-400 transition duration-200">Thể loại ▾</a>
          <a href="#" className="relative text-gray-200 hover:text-yellow-400 transition duration-200">Phim Lẻ</a>
          <a href="#" className="relative text-gray-200 hover:text-yellow-400 transition duration-200">Phim Bộ</a>
          <a href="#" className="relative text-gray-200 hover:text-yellow-400 transition duration-200">Xem Chung</a>
          <a href="#" className="relative text-gray-200 hover:text-yellow-400 transition duration-200">Quốc gia ▾</a>
          <a href="#" className="relative text-gray-200 hover:text-yellow-400 transition duration-200">Diễn Viên</a>
          <a href="#" className="relative text-gray-200 hover:text-yellow-400 transition duration-200">Lịch chiếu</a>
          <a href="#" className="relative text-gray-200 hover:text-yellow-400 transition duration-200 flex items-center">
            Rô Bóng
            <span className="ml-1 text-[10px] font-bold bg-yellow-400 text-black px-1.5 py-0.5 rounded-md shadow">
              NEW
            </span>
          </a>
        </nav>

        {/* Right buttons */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-3 py-1 rounded-md text-white text-sm">
            <Download size={20} />
            <div className="flex flex-col leading-tight text-left">
              <span className="text-[11px] text-gray-300">Tải ứng dụng</span>
              <span className="text-sm font-semibold">RoPhim</span>
            </div>
          </button>

          <button className="flex items-center space-x-1 bg-white px-4 py-3 rounded-full text-black shadow-sm border">
            <User size={16} className="text-black" />
            <span className="text-sm font-medium">Thành viên</span>
          </button>
        </div>
      </div>
    </header>
  );
}
