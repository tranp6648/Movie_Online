"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Plus, ThumbsUp, ThumbsDown, Star, Heart, Info } from "lucide-react";

type MovieItem = {
  bg: string;
  labelLogo?: string;
  title: string;
  subtitle?: string;
  imdbScore?: string;
  quality?: string;
  ageRating?: string;
  year?: string | number;
  duration?: string;
  genres?: string[];
  description?: string;
  cast?: { name: string; avatar: string }[];
};

export default function MovieHeroResponsive() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [movies] = useState<MovieItem[]>([
    {
      bg: "https://static.nutscdn.com/vimg/1920-0/e8e69917d75ea39ccd6f59de623d8bdf.webp",
      labelLogo: "https://static.nutscdn.com/vimg/0-260/3f53160176be9787a445b049a07609f9.png",
      title: "Tay Đua F1",
      subtitle: "F1: The Movie",
      imdbScore: "7.9",
      quality: "4K",
      ageRating: "T16",
      year: 2025,
      duration: "1h 40m",
      genres: ["Action", "Drama", "Sport", "Thriller"],
      description: "Một câu chuyện đầy kịch tính về cuộc đua gay cấn trong thế giới Formula 1, nơi tốc độ và đam mê quyết định tất cả. Theo chân những tay đua xuất sắc nhất thế giới trong hành trình chinh phục đường đua và vượt qua những thử thách khắc nghiệt.",
      cast: [
        { name: "Lewis Hamilton", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
        { name: "Emma Stone", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e1?w=100&h=100&fit=crop&crop=face" },
        { name: "Chris Evans", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
        { name: "Zendaya", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
        { name: "Michael Shannon", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
        { name: "Scarlett Johansson", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" }
      ]
    },
    {
      bg: "https://static.nutscdn.com/vimg/1920-0/52e2094019b6a0be624ab64f91986977.webp",
      labelLogo: "https://static.nutscdn.com/vimg/0-260/67c686175f272df39fed84a04b2b2823.png",
      title: "Interstellar",
      subtitle: "Beyond the Stars",
      ageRating: "T16",
      year: 2025,
      duration: "2h 49m",
      genres: ["Chính kịch", "Hình sự", "Cổ điển", "Bí ẩn"],
      description: "Một bản thảo viết tay quý giá của kiệt tác Thần khúc do Dante Alighieri sáng tác vô tình rơi vào tay một ông trùm mafia khét tiếng ở New York, sau khi được truyền qua tay một vị linh mục bí ẩn. Khi nhà văn Nick Tosches được mời xác minh tính thật giả của bản thảo, anh đã bị cuốn vào một hành trình đầy uẩn khúc.",
      cast: [
        { name: "Matthew McConaughey", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=face" },
        { name: "Anne Hathaway", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
        { name: "Jessica Chastain", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face" },
        { name: "Matt Damon", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face" }
      ]
    },
    {
      bg: "https://static.nutscdn.com/vimg/1920-0/fdf26f9295adea7a951f615d6171cfc2.jpg",
      labelLogo: "https://static.nutscdn.com/vimg/0-260/b27bc01f8898465b7a025a22582a00f9.png",
      title: "Blade Runner 2049",
      subtitle: "Weapons",
      quality: "CAM",
      ageRating: "T18",
      year: 2025,
      duration: "2h 09m",
      genres: ["Chiếu rạp", "Kinh dị", "Bí ẩn", "Tâm lý"],
      description: "Vụ mất tích bí ẩn của 17 đứa trẻ lúc 2:17 sáng thứ Tư chỉ là bắt đầu cho chuỗi sự kiện kinh hoàng tại Maybrook.",
      cast: [
        { name: "Ryan Gosling", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face" },
        { name: "Harrison Ford", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face" },
        { name: "Ana de Armas", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=face" },
        { name: "Jared Leto", avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face" }
      ]
    }
  ]);

  const current = movies[currentIndex];

  return (
    <div className="relative w-full  overflow-hidden bg-black  text-white max-w-full">
      {/* MOBILE VERSION - Full screen hero like Netflix */}
      <div className="block md:hidden">
        <div className="relative h-screen">
          {/* Background Image with smooth transition */}
          <motion.div
            key={`mobile-${current.bg}`}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${current.bg})` }}
          />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

          {/* Content Container */}
          <div className="relative z-10 flex flex-col justify-center items-center h-full p-4 text-center">
            <div className="space-y-4 max-w-md">
              {/* Title */}
              <motion.div
                key={`mobile-title-${current.title}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-2"
              >
                <h1 className="text-5xl font-bold text-white leading-tight">
                  {current.title}
                </h1>
                {current.subtitle && (
                  <p className="text-xl text-yellow-400 font-medium">
                    {current.subtitle}
                  </p>
                )}
              </motion.div>

              {/* Movie Info Tags */}
              <motion.div
                key={`mobile-info-${current.imdbScore}-${current.quality}-${current.year}-${current.duration}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                {current.imdbScore && (
                  <div className="flex items-center gap-1 bg-yellow-600 text-black px-3 py-1.5 rounded text-sm font-bold">
                    <span>IMDb</span>
                    <span>{current.imdbScore}</span>
                  </div>
                )}
                {current.quality && (
                  <span className="bg-white/20 text-white px-3 py-1.5 rounded text-sm font-semibold border border-white/30">
                    {current.quality}
                  </span>
                )}
                {current.ageRating && (
                  <span className="bg-red-600 text-white px-3 py-1.5 rounded text-sm font-semibold">
                    {current.ageRating}
                  </span>
                )}
                {current.year && (
                  <span className="text-white/90 text-sm bg-black/30 px-2 py-1 rounded">{current.year}</span>
                )}
                {current.duration && (
                  <span className="text-white/90 text-sm bg-black/30 px-2 py-1 rounded">{current.duration}</span>
                )}
              </motion.div>

              {/* Action Buttons */}
              {/* <motion.div
                key={`mobile-buttons-${current.title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex items-center justify-center gap-4"
              >
                <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/90 transition-all duration-300 text-sm">
                  <Play className="w-4 h-4" />
                  <span>Phát</span>
                </button>

                <button className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 transition-all duration-300 text-sm backdrop-blur-sm">
                  <Plus className="w-4 h-4" />
                  <span>Danh sách</span>
                </button>
              </motion.div> */}

              {/* Cast/Action Icons */}
              {movies && movies.length > 0 && (
                <motion.div
                  key={`mobile-cast-${current.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className="flex items-center justify-center"
                >
                  {/* Cast Avatars with equal spacing */}
                  <div className="flex items-center justify-center gap-4">
                    {movies.slice(0, 6).map((actor, index) => (
                      <motion.div
                        key={`${current.title}-${actor.title}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                        className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 hover:border-white transition-all duration-300 hover:scale-110"
                        title={actor.title}
                      >
                        <img
                          onClick={() => setCurrentIndex(index)}
                          src={actor.bg}
                          alt={actor.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
      </div>

      {/* DESKTOP VERSION - Original horizontal layout */}
      <div className="hidden md:block">
        <section className="relative h-[82vh] w-full overflow-hidden rounded-2xl bg-black flex items-stretch">
          {/* Background with smooth transition */}
          <motion.div
            key={`desktop-${current.bg}`}
            initial={{ opacity: 0.3, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${current.bg})` }}
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0.6)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

          {/* Content */}
          <div className="relative z-10 flex flex-1 h-full mx-auto px-8">
            {/* Left info */}
            <div className="flex flex-col justify-center pt-16 flex-1">
              {current.labelLogo && (
                <motion.img
                  key={`desktop-logo-${current.labelLogo}`}
                  src={current.labelLogo}
                  alt="Logo"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="mb-4 opacity-95 object-contain max-w-[500px] max-h-[130px]"
                />
              )}

              <motion.h3
                key={`desktop-title-${current.subtitle}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="text-[1.1em] uppercase tracking-widest ml-1 text-yellow-300"
              >
                {current.subtitle}
              </motion.h3>

              {/* Meta */}
              <motion.div
                key={`desktop-meta-${current.imdbScore}-${current.quality}-${current.year}-${current.duration}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/80"
              >
                {current.imdbScore && (
                  <span className="rounded bg-white/10 px-2 py-0.5 border border-yellow-400 text-yellow-300">
                    IMDb {current.imdbScore}
                  </span>
                )}
                {current.quality && (
                  <span className="rounded bg-white/10 px-2 py-0.5 border border-white/20">
                    {current.quality}
                  </span>
                )}
                {current.ageRating && (
                  <span className="rounded bg-white/10 px-2 py-0.5 border border-red-400 text-red-300">
                    {current.ageRating}
                  </span>
                )}
                {current.year && (
                  <span className="rounded bg-white/10 px-2 py-0.5 border border-white">
                    {current.year}
                  </span>
                )}
                {current.duration && (
                  <span className="rounded bg-white/10 px-2 py-0.5 border border-white">
                    {current.duration}
                  </span>
                )}
              </motion.div>

              {/* Genres */}
              {current.genres && current.genres.length > 0 && (
                <motion.div
                  key={`desktop-genres-${current.genres.join(",")}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  className="mt-4 flex flex-wrap gap-2 text-xs text-white/75"
                >
                  {current.genres.map((g) => (
                    <span
                      key={g}
                      className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5"
                    >
                      {g}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Description */}
              {current.description && (
                <motion.p
                  key={`desktop-desc-${current.description}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="mt-4 max-w-xl text-sm leading-relaxed text-white/90"
                >
                  {current.description}
                </motion.p>
              )}

              {/* Controls */}
              <motion.div
                key={`desktop-controls-${current.title}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 flex items-center gap-3"
              >
                <button className="grid h-[70px] w-[70px] place-items-center rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 text-black shadow transition hover:scale-105">
                  <Play className="h-5 w-5 text-black fill-black" />
                </button>
                <div className="flex overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur">
                  <button className="grid h-12 w-12 place-items-center text-white hover:bg-white/20 transition">
                    <Heart className="h-5 w-5" />
                  </button>
                  <div className="w-px bg-white/20" />
                  <button className="grid h-12 w-12 place-items-center text-white hover:bg-white/20 transition">
                    <Info className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right thumbnails - Desktop only */}
            <div className="flex flex-col justify-end items-end flex-1 mb-6">
              <div className="flex gap-2 overflow-x-auto scroll-smooth no-scrollbar">
                {movies.map((movie, i) => (
                  <button
                    key={`thumb-${movie.bg}-${i}`}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    className={`relative h-[56px] w-[92px] flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-300  ${i === currentIndex
                      ? "border-yellow-400 ring-2 ring-yellow-400/70"
                      : "border-white/20 hover:border-white/40"
                      }`}
                  >
                    <img src={movie.bg} alt={movie.title} className="h-full w-full object-cover" />
                    {/* Active indicator */}
                    {i === currentIndex && (
                      <div className="absolute inset-0 bg-yellow-400/20" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}