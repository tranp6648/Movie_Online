// components/MovieSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "lucide-react";

export type MovieSliderItem = {
    id: string | number;
    title: string;
    engTitle: string;
    img: string;
    rating: string | number;
};

export interface MovieSliderProps {
    movies: MovieSliderItem[];
    title?: string;
    href?: string; // link tới trang danh sách phim
}

export function MovieSlider({movies, title, href}: MovieSliderProps) {
    return (
        <div className="w-full px-4 md:px-8 lg:px-16 py-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                    {title ?? "Phim Điện Ảnh Mới Cooóng"}
                </h2>
                {href && (
                    <Link
                        href={href}
                        className="text-sm text-blue-400 hover:underline"
                    >
                        Xem tất cả
                    </Link>
                )}
            </div>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                    640: {slidesPerView: 3},
                    1024: {slidesPerView: 5},
                }}
                navigation
                pagination={{clickable: true}}
                autoplay={{delay: 3000}}
                className="pb-10"
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={movie.img}
                                alt={movie.title}
                                className="w-full h-64 object-cover hover:scale-105 transition-transform"
                            />
                            <div className="p-3">
                                <h3 className="text-sm font-semibold text-white line-clamp-1">
                                    {movie.title}
                                </h3>
                                <p className="text-xs text-gray-400">{movie.engTitle}</p>
                                <p className="text-xs text-yellow-400 mt-1">
                                    ⭐ {movie.rating}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
