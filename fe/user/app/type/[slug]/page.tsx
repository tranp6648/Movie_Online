import AnimeGrid, { AnimeItem } from "@/components/Type/AnimeGrid";

const CATEGORY_MAP: Record<string, { title: string; items: AnimeItem[] }> = {
  "co-trang": {
    title: "Phim Cổ Trang",
    items: Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      title: `Cổ Trang ${i + 1}`,
      subtitle: "English Title",
      episodesLabel: i % 2 ? "PĐ. 5" : "PĐ. 1",
      poster:
        "https://static.nutscdn.com/vimg/300-0/f9ff705fe020ce52ca70fbae0161fa35.jpg",
      href: "#",
    })),
  },
  "tinh-cam": {
    title: "Phim Tình Cảm",
    items: Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      title: `Tình Cảm ${i + 1}`,
      subtitle: "Romantic Title",
      episodesLabel: i % 2 ? "PĐ. 8" : "PĐ. 3",
      poster:
        "https://static.nutscdn.com/vimg/300-0/f9ff705fe020ce52ca70fbae0161fa35.jpg",
      href: "#",
    })),
  },
};

type CategoryPageProps = {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function CategoryPage(rawProps: unknown) {
  const { params } = rawProps as CategoryPageProps;

  const category =
    CATEGORY_MAP[params.slug] ?? { title: "Không tìm thấy", items: [] };

  return (
    <AnimeGrid
      heading={category.title}
      items={category.items}
      page={1}
      pageCount={5}
      baseHref={`/Type/${params.slug}`}
      className="pt-20"
    />
  );
}
