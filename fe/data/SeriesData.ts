// fe/data/SeriesData.ts
import type { Show } from "@/lib/types";

/**
 * Dữ liệu demo: 48 series để chia 32/ trang.
 * Bạn có thể thay poster bằng ảnh thật. Nếu dùng picsum,
 * cần thêm domain "picsum.photos" trong next.config (bên dưới).
 */
const make = (i: number): Show => ({
  id: `series-${i}`,
  title: `Ngôi Sao Rắc Rối ${i}`,
  subtitle: "My Troublesome Star",
  poster: `https://picsum.photos/seed/series_${i}/400/600`,
  pd: Math.floor(Math.random() * 40) + 1, // PD. 1..40
  tm: Math.random() > 0.6 ? Math.floor(Math.random() * 30) + 1 : undefined, // thỉnh thoảng có TM.
  href: `/phim/${i}`,
});

export const SERIES_DATA: Show[] = Array.from({ length: 48 }, (_, idx) =>
  make(idx + 1)
);
