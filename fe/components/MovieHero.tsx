"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
    id:4,
    title:"WEDNESDAY",
     year: 2022,
    duration: "2h 6m",
    image:"https://static.nutscdn.com/vimg/1920-0/7f4aacf1bd27ae4855354c746fb02191.jpg",
    thumb: "https://static.nutscdn.com/vimg/1920-0/7f4aacf1bd27ae4855354c746fb02191.jpg",
    description: "Thông minh, hay châm chọc và chết trong lòng một chút, Wednesday Addams điều tra một vụ giết người liên hoàn trong khi có thêm bạn và cả kẻ thù mới học Học viện Nevermore.",
  }
];

export default function MovieSlider() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative w-full h-[930px] overflow-hidden">
      {/* Background full image */}
      <motion.div
        key={movies[current].id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <Image
          src={movies[current].image}
          alt={movies[current].title}
          fill
          className="object-cover"
          priority
        />
        {/* overlay để dễ đọc text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-transparent"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-12 text-white max-w-2xl">
        <h2 className="text-yellow-400 font-semibold uppercase text-sm">
          Marvel Studios
        </h2>
        <h1 className="text-5xl font-bold mt-2">{movies[current].title}</h1>
        <p className="text-gray-300 mt-4">{movies[current].description}</p>
        <p className="mt-3 text-sm text-gray-400">
          {movies[current].year} • {movies[current].duration}
        </p>

        {/* Action buttons */}
        <div className="flex space-x-4 mt-6">
          <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-500 transition">
            ▶ Xem
          </button>
          <button className="bg-white/20 px-4 py-2 rounded-full hover:bg-white/30">
            ♡
          </button>
          <button className="bg-white/20 px-4 py-2 rounded-full hover:bg-white/30">
            i
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-5 right-10 flex space-x-3 z-10">
        {movies.map((movie, index) => (
          <button
            key={movie.id}
            onClick={() => setCurrent(index)}
            className={`relative w-20 h-14 rounded-md overflow-hidden border-2 transition ${
              current === index ? "border-yellow-400" : "border-transparent"
            }`}
          >
            <Image
              src={movie.thumb}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
