"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const movies = [
  {
    id: 1,
    title: "The Fantastic Four: First Steps",
    year: 2025,
    duration: "2h 10m",
    image: "https://static.nutscdn.com/vimg/1920-0/faf2a103f1af46a7d078699bad7d44d8.webp",
    thumb: "https://static.nutscdn.com/vimg/1920-0/faf2a103f1af46a7d078699bad7d44d8.webp",
    description:
      "Bộ Tứ Siêu Đẳng: Bước Đi Đầu Tiên kể về một gia đình siêu anh hùng đối mặt với thử thách khó khăn...",
  },
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    year: 2021,
    duration: "2h 28m",
    image: "https://static.nutscdn.com/vimg/1920-0/161625de0f2c34ec4795140b44bed834.webp",
    thumb: "https://static.nutscdn.com/vimg/150-0/f105d609e2cc3c8ce1c29f999f42bb9d.webp",
    description: "Peter Parker phải đối mặt với đa vũ trụ và những kẻ thù cũ quay trở lại...",
  },
  {
    id: 3,
    title: "Doctor Strange: Multiverse of Madness",
    year: 2022,
    duration: "2h 6m",
    image: "https://static.nutscdn.com/vimg/1920-0/23d9b7d3571a991640bfef6042086044.jpg",
    thumb: "https://static.nutscdn.com/vimg/1920-0/23d9b7d3571a991640bfef6042086044.jpg",
    description: "Stephen Strange du hành đa vũ trụ để ngăn chặn một mối nguy hiểm mới...",
  },
  {
    id: 4,
    title: "WEDNESDAY",
    year: 2022,
    duration: "2h 6m",
    image: "https://static.nutscdn.com/vimg/1920-0/7f4aacf1bd27ae4855354c746fb02191.jpg",
    thumb: "https://static.nutscdn.com/vimg/1920-0/7f4aacf1bd27ae4855354c746fb02191.jpg",
    description:
      "Thông minh, hay châm chọc và chết trong lòng một chút, Wednesday Addams điều tra một vụ giết người liên hoàn trong khi có thêm bạn và cả kẻ thù mới học Học viện Nevermore.",
  },
];

export default function MovieSlider() {
  const [current, setCurrent] = useState(0);
  const total = movies.length;
  const next = () => setCurrent((i) => (i + 1) % total);
  const prev = () => setCurrent((i) => (i - 1 + total) % total);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Swipe support
  const startX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    startX.current = null;
  };

  return (
    <section
      aria-label="Movie slider"
      className="relative w-full overflow-hidden rounded-2xl shadow-xl
                 min-h-[420px] h-[56vh] sm:h-[70vh] lg:h-[88vh] pb-20 sm:pb-24 lg:pb-28"
    >
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={movies[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <Image
            src={movies[current].image}
            alt={movies[current].title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/20" />
          <div className="absolute inset-y-0 left-0 right-1/3 sm:right-1/2 bg-gradient-to-r from-black/65 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        aria-label="Trước"
        onClick={prev}
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur text-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Sau"
        onClick={next}
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur text-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end sm:items-center">
        <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-0 text-white max-w-full sm:max-w-xl lg:max-w-2xl">
          <div className="bg-black/35 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-0 rounded-2xl p-4 sm:p-0">
            <p className="text-yellow-400 font-semibold uppercase text-[10px] sm:text-xs tracking-wider">
              Marvel Studios
            </p>
            <h1 className="font-bold mt-2 text-2xl sm:text-4xl lg:text-6xl leading-tight line-clamp-3">
              {movies[current].title}
            </h1>
            <p className="text-gray-100/90 mt-2 sm:mt-4 text-sm sm:text-base line-clamp-4 sm:line-clamp-5">
              {movies[current].description}
            </p>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-200">
              {movies[current].year} • {movies[current].duration}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-4 mt-4 sm:mt-6">
              <button className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 sm:px-5 py-2 rounded-full font-semibold hover:bg-yellow-500 transition">
                <Play className="h-4 w-4" /> Xem
              </button>
              <button className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25">♡</button>
              <button className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25">i</button>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-3 sm:bottom-5 right-3 sm:right-8 left-3 sm:left-auto z-10">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar p-2 rounded-xl bg-black/25 backdrop-blur-md">
          {movies.map((movie, index) => (
            <button
              key={movie.id}
              onClick={() => setCurrent(index)}
              className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-md overflow-hidden ring-2 transition ${
                current === index ? "ring-yellow-400" : "ring-transparent hover:ring-white/40"
              }`}
              aria-label={`Chọn ${movie.title}`}
            >
              <Image
                src={movie.thumb}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 64px, 80px"
                loading={current === index ? "eager" : "lazy"}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 inset-x-0 flex sm:hidden justify-center gap-1.5 z-10">
        {movies.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`h-1.5 w-3 rounded-full transition ${current === i ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
