"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Heart, Plus, Share2, MessageSquare } from "lucide-react";

export type Episode = { id: number; label: string; href: string };
export type Actor = { name: string; avatar: string };
export type Comment = {
  id: number;
  user: string;
  avatar: string;
  content: string;
  time: string;
};

export type MovieDetailProps = {
  poster: string;
  title: string;
  subtitle?: string;
  year: number;
  genres: string[];
  description: string;
  episodes: Episode[];
  actors: Actor[];
  duration: string;
  country: string;
  network: string;
  producer: string;
  director: string;
  comments: Comment[];
};

type Tab = "episodes" | "gallery" | "cast" | "suggested";

export default function MovieDetail({
  poster,
  title,
  subtitle,
  year,
  genres,
  description,
  episodes,
  actors,
  duration,
  country,
  network,
  producer,
  director,
  comments,
}: MovieDetailProps) {
  const [tab, setTab] = useState<Tab>("episodes");

  const tabs: { key: Tab; label: string }[] = [
    { key: "episodes", label: "Tập phim" },
    { key: "gallery", label: "Gallery" },
    { key: "cast", label: "Diễn viên" },
    { key: "suggested", label: "Đề xuất" },
  ];

  return (
    <section className="w-full text-white">
      {/* Banner */}
      <div
        className="relative h-[70vh] flex items-end bg-black/40"
        style={{
          backgroundImage: `url(${poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8 pb-10">
          {/* Poster */}
          <div className="w-40 md:w-52 shrink-0 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={poster}
              alt={title}
              width={208}
              height={300}
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            {subtitle && <p className="mt-1 text-white/70 text-lg">{subtitle}</p>}

            <div className="flex flex-wrap gap-2 mt-4 text-sm text-white/80">
              <span>{year}</span>
              {genres.map((g) => (
                <span
                  key={g}
                  className="px-2 py-0.5 rounded bg-white/20 text-xs font-medium"
                >
                  {g}
                </span>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="px-5 py-2 rounded-lg bg-yellow-400 text-black font-semibold flex items-center gap-2 hover:bg-yellow-300 transition"
              >
                <Play className="h-5 w-5" /> Xem ngay
              </button>
              {[Heart, Plus, Share2, MessageSquare].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex gap-4 border-b border-white/10">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 -mb-px border-b-2 text-sm transition ${
                tab === t.key
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent text-white/70 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "episodes" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {episodes.map((ep) => (
                <a
                  key={ep.id}
                  href={ep.href}
                  className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-center text-sm"
                >
                  {ep.label}
                </a>
              ))}
            </div>
          )}
          {tab === "gallery" && (
            <div className="text-white/60">Gallery đang cập nhật...</div>
          )}
          {tab === "cast" && (
            <div className="flex gap-4 flex-wrap">
              {actors.map((a) => (
                <div key={a.name} className="w-20 text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-white/10 mx-auto">
                    <Image
                      src={a.avatar}
                      alt={a.name}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-2 text-sm truncate">{a.name}</div>
                </div>
              ))}
            </div>
          )}
          {tab === "suggested" && (
            <div className="text-white/60">Danh sách phim gợi ý...</div>
          )}
        </div>
      </div>

      {/* Description + Info */}
      <div className="max-w-7xl mx-auto px-4 mt-10 space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Giới thiệu</h3>
          <p className="text-white/70 leading-relaxed">{description}</p>
        </div>
        <div className="space-y-2 text-white/80">
          <p>
            <span className="font-medium text-white">Thời lượng:</span> {duration}
          </p>
          <p>
            <span className="font-medium text-white">Quốc gia:</span> {country}
          </p>
          <p>
            <span className="font-medium text-white">Networks:</span> {network}
          </p>
          <p>
            <span className="font-medium text-white">Sản xuất:</span> {producer}
          </p>
          <p>
            <span className="font-medium text-white">Đạo diễn:</span> {director}
          </p>
        </div>
      </div>

      {/* Comments */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <h3 className="font-semibold text-lg mb-4">
          Bình luận ({comments.length})
        </h3>

        {/* Form nhập */}
        <div className="mb-6">
          <textarea
            placeholder="Viết bình luận..."
            className="w-full p-3 rounded-lg bg-white/5 text-sm text-white placeholder:text-white/40 resize-none focus:outline-none focus:ring-1 focus:ring-yellow-400"
            rows={3}
          />
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Gửi
          </button>
        </div>

        {/* List bình luận */}
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3 ">
              <Image
                src={c.avatar}
                alt={c.user}
                width={30}
                height={30}
                className="rounded-3xl object-cover"
              />
              <div>
                <p className="font-medium">
                  {c.user}{" "}
                  <span className="text-white/50 text-xs">· {c.time}</span>
                </p>
                <p className="text-white/80 text-sm">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
