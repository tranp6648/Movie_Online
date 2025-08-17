"use client";

import Image from "next/image";
import { useRef } from "react";
import {
    Crown,
    MessageCircleMore,
    Flame,
    Heart,
    Tags,
    ChevronLeft,
    ChevronRight,
    MessageCircle,
    Eye,
    Dot,
    ArrowUpRight,
    BadgeCheck,
    Star,
} from "lucide-react";
import TopCommentsSlider from "./Home/Comment/TopCommentsSlider";
import AutoScrollNewComments from "./Home/Comment/AutoScrollNewComments";

/* --- data giữ nguyên của bạn (rút gọn ở đây cho ngắn) --- */
type TopComment = { id: string; user: { name: string; avatar: string; badge?: "female" | "infinity" | "star" }; text: string; cover: string; stats: { views: number; likes: number; comments: number } };
type RankedItem = { id: string; title: string; poster: string; trend?: "up" | "down" | "flat" };
type NewComment = { id: string; user: { name: string; avatar: string; tag?: string }; text: string; on: string };

const topComments: TopComment[] = [
    {
        id: "1",
        user: { name: "cúnn.", avatar: "https://static.nutscdn.com/vimg/300-0/37bdd6faf59dd720f90d98feeaf32fdf.jpg", badge: "female" },
        text:
            "ùa ê kbt là do t khó tính hay nmao, nhm phim này kph gu t nên t thấy…",
        cover: "https://static.nutscdn.com/vimg/300-0/37bdd6faf59dd720f90d98feeaf32fdf.jpg",
        stats: { views: 3, likes: 0, comments: 3 },
    },
    {
        id: "2",
        user: { name: "blue berry", avatar: "https://static.nutscdn.com/vimg/300-0/fbebf3ba5223efa915d400e5615583ee.jpg", badge: "infinity" },
        text:
            "vụ án tập này vô lý. có thể nói ông hoạ sĩ biết được kĩ thuật vẽ và chép y hệt…",
        cover: "https://static.nutscdn.com/vimg/300-0/fbebf3ba5223efa915d400e5615583ee.jpg",
        stats: { views: 3, likes: 0, comments: 0 },
    },
    {
        id: "3",
        user: { name: "tiểu tiên nữ", avatar: "https://static.nutscdn.com/vimg/300-0/f0591f308a48964ddde38e7b0eb6ab34.png", badge: "female" },
        text: "Cha Chiều đi cùng lm cm gì phiền vc",
        cover: "https://static.nutscdn.com/vimg/300-0/f0591f308a48964ddde38e7b0eb6ab34.png",
        stats: { views: 9, likes: 0, comments: 1 },
    },
    {
        id: "4",
        user: { name: "Một Nhành Hoa", avatar: "https://static.nutscdn.com/vimg/300-0/b47930c9123a64d9a4ece62bb4ca204a.jpg", badge: "female" },
        text:
            "nữ 9 cute hột me vậy mà bên fb đọc cmt toàn thấy chê. Mình là người kén…",
        cover: "https://static.nutscdn.com/vimg/300-0/b47930c9123a64d9a4ece62bb4ca204a.jpg",
        stats: { views: 8, likes: 0, comments: 5 },
    },
    {
        id: "5",
        user: { name: "Yann", avatar: "https://static.nutscdn.com/vimg/300-0/5f0dfab3a4b9602c439f20167581a826.webp", badge: "infinity" },
        text:
            "Sợ Chillu như chính phụ chờ chồng đi bẫy, Ến thì chiến đấu nhỏ đúng kêu…",
        cover: "https://static.nutscdn.com/vimg/300-0/5f0dfab3a4b9602c439f20167581a826.webp",
        stats: { views: 11, likes: 0, comments: 0 },
    },
    {
        id: "5",
        user: { name: "Yann", avatar: "https://static.nutscdn.com/vimg/300-0/5f0dfab3a4b9602c439f20167581a826.webp", badge: "infinity" },
        text:
            "Sợ Chillu như chính phụ chờ chồng đi bẫy, Ến thì chiến đấu nhỏ đúng kêu…",
        cover: "https://static.nutscdn.com/vimg/300-0/5f0dfab3a4b9602c439f20167581a826.webp",
        stats: { views: 11, likes: 0, comments: 0 },
    },
    {
        id: "5",
        user: { name: "Yann", avatar: "https://static.nutscdn.com/vimg/300-0/5f0dfab3a4b9602c439f20167581a826.webp", badge: "infinity" },
        text:
            "Sợ Chillu như chính phụ chờ chồng đi bẫy, Ến thì chiến đấu nhỏ đúng kêu…",
        cover: "https://static.nutscdn.com/vimg/300-0/5f0dfab3a4b9602c439f20167581a826.webp",
        stats: { views: 11, likes: 0, comments: 0 },
    },
    {
        id: "5",
        user: { name: "Yann", avatar: "https://static.nutscdn.com/vimg/300-0/5f0dfab3a4b9602c439f20167581a826.webp", badge: "infinity" },
        text:
            "Sợ Chillu như chính phụ chờ chồng đi bẫy, Ến thì chiến đấu nhỏ đúng kêu…",
        cover: "https://static.nutscdn.com/vimg/300-0/5f0dfab3a4b9602c439f20167581a826.webp",
        stats: { views: 11, likes: 0, comments: 0 },
    },
    {
        id: "5",
        user: { name: "Yann", avatar: "https://static.nutscdn.com/vimg/300-0/5f0dfab3a4b9602c439f20167581a826.webp", badge: "infinity" },
        text:
            "Sợ Chillu như chính phụ chờ chồng đi bẫy, Ến thì chiến đấu nhỏ đúng kêu…",
        cover: "https://static.nutscdn.com/vimg/300-0/5f0dfab3a4b9602c439f20167581a826.webp",
        stats: { views: 11, likes: 0, comments: 0 },
    },
    {
        id: "5",
        user: { name: "Yann", avatar: "https://static.nutscdn.com/vimg/300-0/5f0dfab3a4b9602c439f20167581a826.webp", badge: "infinity" },
        text:
            "Sợ Chillu như chính phụ chờ chồng đi bẫy, Ến thì chiến đấu nhỏ đúng kêu…",
        cover: "https://static.nutscdn.com/vimg/300-0/5f0dfab3a4b9602c439f20167581a826.webp",
        stats: { views: 11, likes: 0, comments: 0 },
    },

];
const hotLeft: RankedItem[] = [
    { id: "r1", title: "Hiến Ngự", poster: "https://static.nutscdn.com/vimg/300-0/f0591f308a48964ddde38e7b0eb6ab34.png", trend: "flat" },
    { id: "r2", title: "Cẩm Nguyệt Như Ca", poster: "https://static.nutscdn.com/vimg/300-0/37bdd6faf59dd720f90d98feeaf32fdf.jpg", trend: "up" },
    { id: "r3", title: "Quái Vật Ngoài Hành Tinh: Địa Cầu", poster: "https://static.nutscdn.com/vimg/300-0/8caaf8685432ce8f5ed66ec74f724e33.jpg", trend: "up" },
    { id: "r4", title: "Định Phong Ba", poster: "https://static.nutscdn.com/vimg/300-0/fbebf3ba5223efa915d400e5615583ee.jpg", trend: "flat" },
    { id: "r5", title: "Phàm Nhân Tu Tiên", poster: "https://static.nutscdn.com/vimg/300-0/0e190589111b3c28e1451cde7b82ca3e.jpg", trend: "flat" },
];
const favRight: RankedItem[] = [
    { id: "f1", title: "Hiến Ngự", poster: "https://static.nutscdn.com/vimg/300-0/f0591f308a48964ddde38e7b0eb6ab34.png", trend: "up" },
    { id: "f2", title: "Cẩm Nguyệt Như Ca", poster: "https://static.nutscdn.com/vimg/300-0/37bdd6faf59dd720f90d98feeaf32fdf.jpg", trend: "up" },
    { id: "f3", title: "Xi Trum", poster: "https://static.nutscdn.com/vimg/300-0/bca5fd021d934c6a7d3397e6d553d481.webp", trend: "up" },
    { id: "f4", title: "Thế Giới Ảo Diệu của Gumball", poster: "https://static.nutscdn.com/vimg/300-0/bea98de0161bff94c6156ebc9c6f86df.jpg", trend: "flat" },
    { id: "f5", title: "Chuốc Tâm", poster: "https://static.nutscdn.com/vimg/300-0/0f52a86a544b5e94b3d577936e925858.jpg", trend: "flat" },
];
const categories = [{ name: "Chính Kịch" }, { name: "Tình Cảm" }, { name: "Tâm Lý" }, { name: "Phiêu Lưu" }, { name: "Cổ Trang" }];
const newComments: NewComment[] = [
    {
        id: "n1",
        user: { name: "Oldin ăn mì Indo", avatar: "https://static.nutscdn.com/vimg/300-0/37bdd6faf59dd720f90d98feeaf32fdf.jpg" },
        text: "huhu Yoon Ho của em",
        on: "Thời Vàng Son",
    },
    {
        id: "n2",
        user: { name: "Tnii", avatar: "https://static.nutscdn.com/vimg/300-0/37bdd6faf59dd720f90d98feeaf32fdf.jpg" },
        text: "rồ lên p2 cho các con dân xem đi rồ",
        on: "Mashle: Ma thuật & Cơ bắp",
    },
    {
        id: "n3",
        user: { name: "Lê anh Thư", avatar: "https://static.nutscdn.com/vimg/300-0/37bdd6faf59dd720f90d98feeaf32fdf.jpg" },
        text: "ờh shop cho ra tập 3 v",
        on: "Trái Bài Nói Dối Là Anh",
    },
    {
        id: "n4",
        user: { name: "Bang", avatar: "https://static.nutscdn.com/vimg/300-0/37bdd6faf59dd720f90d98feeaf32fdf.jpg", tag: "ROX" },
        text:
            "Phim hay ** mà giờ mới biết, mn nên xem nhé. 2 diễn viên chính diễn…",
        on: "Cuộc Đua Lịch Sử",
    },
];

export default function HomeHighlights() {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: "left" | "right") => {
        const el = scrollerRef.current;
        if (!el) return;
        el.scrollBy({ left: (dir === "left" ? -1 : 1) * el.clientWidth * 0.9, behavior: "smooth" });
    };

    return (
        /* ========== CHỈ 1 DIV BÊN NGOÀI ========== */
        <div className="w-full  border-white/10 bg-[#0d1117] p-4 md:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] text-gray-200">

            {/* TOP BÌNH LUẬN (có đường kẻ dưới) */}
            <div className="pb-4 md:pb-8 border-b border-white/10">
                <div className="mb-3 flex items-center gap-2">
                    <Crown size={18} className="opacity-80" />
                    <h2 className="text-sm font-semibold tracking-wide">TOP BÌNH LUẬN</h2>
                </div>

                <div className="relative">


                    <div className="p-6">
                        <TopCommentsSlider items={topComments} perView={5} intervalMs={4000} />
                    </div>
                </div>
            </div>

            {/* HÀNG DƯỚI: 3 CỘT TRONG CÙNG 1 DIV, CÓ VIỀN DỌC NGĂN CỘT */}
            {/* HÀNG DƯỚI: 4 CỘT CÙNG 1 HÀNG */}
            <div className="pt-4 md:pt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {/* Cột 1: SÔI NỔI NHẤT */}
                <section className="rounded-2xl border border-white/5 bg-[#0d1117] p-4">
                    <SectionTitle title="SÔI NỔI NHẤT" icon={<Flame size={18} />} />
                    <RankList items={hotLeft} />
                    <SeeMore />
                </section>

                {/* Cột 2: YÊU THÍCH NHẤT */}
                <section className="rounded-2xl border border-white/5 bg-[#0d1117] p-4">
                    <SectionTitle title="YÊU THÍCH NHẤT" icon={<Heart size={18} />} />
                    <RankList items={favRight} />
                    <SeeMore />
                </section>

                {/* Cột 3: THỂ LOẠI HOT */}
                <section className="rounded-2xl border border-white/5 bg-[#0d1117] p-4">
                    <SectionTitle title="THỂ LOẠI HOT" icon={<Tags size={18} />} />
                    <div className="mt-3 flex flex-col gap-3">
                        {categories.map((c, i) => (
                            <div key={c.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 text-sm text-gray-400">{i + 1}.</span>
                                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm">
                                        {c.name}
                                    </span>
                                </div>
                                {i < 3 ? (
                                    <ArrowUpRight size={16} className="opacity-70" />
                                ) : (
                                    <Dot size={18} className="opacity-50" />
                                )}
                            </div>
                        ))}
                    </div>
                    <SeeMore />
                </section>

                {/* Cột 4: BÌNH LUẬN MỚI */}
                <section className="rounded-2xl border border-white/5 bg-[#0d1117] p-4">
                    <SectionTitle title="BÌNH LUẬN MỚI" icon={<MessageCircleMore size={18} />} />
                  <AutoScrollNewComments items={newComments} height={320} speed={0.6} />
                </section>
            </div>

        </div>
    );
}

/* -------- subcomponents -------- */

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
    return (
        <div className="mb-2 flex items-center gap-2">
            <span className="opacity-80">{icon}</span>
            <h3 className="text-sm font-semibold tracking-wide">{title}</h3>
        </div>
    );
}

function RankList({ items }: { items: RankedItem[] }) {
    return (
        <ol className="mt-3 space-y-3">
            {items.map((it, idx) => (
                <li key={it.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="w-6 text-sm text-gray-400">{idx + 1}.</span>
                        <div className="relative h-8 w-8 overflow-hidden rounded">
                            <Image src={it.poster} alt={it.title} fill />
                        </div>
                        <span className="max-w-[180px] truncate text-sm">{it.title}</span>
                    </div>
                    {it.trend === "up" ? (
                        <ArrowUpRight size={16} className="opacity-70" />
                    ) : it.trend === "down" ? (
                        <Dot size={18} className="rotate-90 opacity-50" />
                    ) : (
                        <Dot size={18} className="opacity-50" />
                    )}
                </li>
            ))}
        </ol>
    );
}

function SeeMore() {
    return (
        <button className="mt-3 text-left text-sm text-gray-400 hover:text-gray-200">Xem thêm</button>
    );
}
