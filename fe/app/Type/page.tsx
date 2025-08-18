// app/type/page.tsx (Server Component OK)
import AnimeGrid, { AnimeItem } from "@/components/Type/AnimeGrid";

export default function Type() {
  const items: AnimeItem[] = Array.from({ length: 18 }).map((_, i) => ({
    id: i + 1,
    title: `Sample Title ${i + 1}`,
    subtitle: "English Title",
    episodesLabel: i % 2 ? "PĐ. 6" : "PĐ. 1",
    poster: "https://static.nutscdn.com/vimg/300-0/f9ff705fe020ce52ca70fbae0161fa35.jpg",
    href: "#",
  }));

  return (
    <AnimeGrid
      heading="Phim Anime"
      items={items}
      page={1}
      pageCount={13}
      getPageHref={(p) => `?page=${p}`}   
      className="pt-19"
    />
  );
}
