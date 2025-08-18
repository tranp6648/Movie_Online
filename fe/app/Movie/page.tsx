import MovieListGrid, { MovieCard } from "@/components/Movie/MovieListGrid";

export default function Movie() {
    const items: MovieCard[] = Array.from({ length: 18 }).map((_, i) => ({
    id: i + 1,
    title: `Màn Đêm Luôn Tới ${i + 1}`,
    subtitle: "Night Always Comes",
    poster: "https://static.nutscdn.com/vimg/300-0/f9ff705fe020ce52ca70fbae0161fa35.jpg",
    href: "#",
    badges: [
      { text: i % 3 === 0 ? "CAM" : "P.Đê", color: i % 3 === 0 ? "amber" : "gray" },
      ...(i % 5 === 0 ? [{ text: "T.Minh", color: "green" as const }] : []),
    ],
  }));

  return (
    <MovieListGrid heading="Phim lẻ" items={items} page={1} className="pt-22" pageCount={454} getPageHref={(p) => `?page=${p}`} />
  );
}