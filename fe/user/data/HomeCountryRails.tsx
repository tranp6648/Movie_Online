import type { Show } from '@/lib/types'
import { CinemaData } from '@/data/CinemaData'
import { HKItemData } from '@/data/HKItemData'

/** Chuẩn hoá item bất kỳ -> Show (dùng cho CountryCard) */
const toShow = (x: any): Show => {
  const id =
    x.id ?? x.movieId ?? x._id ?? x.slug ?? cryptoRandom()

  const title =
    x.title ?? x.name ?? x.movieName ?? x.viTitle ?? x.vnTitle ?? x.origin_name ?? 'No title'

  const subtitle =
    x.enTitle ?? x.engTitle ?? x.en_name ?? x.enTitleName ?? x.original_name ?? ''

  const poster =
    x.poster ?? x.posterUrl ?? x.poster_url ?? x.image ?? x.cover ?? x.thumb ?? x.thumb_url ?? x.thumbnail ?? '/poster-fallback.jpg'

  const pd =
    (typeof x.episode === 'number' && x.episode) ||
    (typeof x.ep === 'number' && x.ep) ||
    (typeof x.current_episode === 'number' && x.current_episode) ||
    undefined

  const tm =
    (typeof x.dub === 'number' && x.dub) ||
    (x.is_dub === true ? 1 : undefined) ||
    (typeof x.tm === 'number' && x.tm) ||
    undefined

  const href =
    x.href ??
    (x.slug ? `/movie/${x.slug}` : (x.id || x.movieId) ? `/movie/${x.id ?? x.movieId}` : undefined)

  return { id: String(id), title, subtitle, poster, pd, tm, href }
}

function cryptoRandom() {
  return Math.random().toString(36).slice(2)
}
const normalize = (arr: any[]): Show[] => (arr ?? []).map(toShow)

/* ============ ẢNH KHÔNG TRÙNG (Unsplash) ============ */
/** KR (Hàn) */
const KR_UNIQUE_POSTERS = [
  'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558980664-10eb4802d1f5?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963f?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1200&auto=format&fit=crop',
]

/** CN (Trung) */
const CN_UNIQUE_POSTERS = [
  'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
]

/** US-UK */
const US_UNIQUE_POSTERS = [
  'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?q=80&w=1200&auto=format&fit=crop',
]

/* ============ EXTRA items: mỗi nhóm 6 phim ============ */
const EXTRA_KR = KR_UNIQUE_POSTERS.map((p, i) => ({
  id: `kr_x${i + 1}`,
  title: [
    'Bí Ẩn Sân Trường', 'Đêm Mưa Seoul', 'Trái Tim Mùa Xuân',
    'Sứ Mệnh Cuối Cùng', 'Thám Tử Bờ Sông', 'Bức Ảnh Bí Ẩn',
  ][i],
  subtitle: [
    'School Mystery', 'Rainy Night in Seoul', 'Spring Hearts',
    'Final Mission', 'Riverside Detective', 'The Hidden Photo',
  ][i],
  poster: p,
  episode: [8, 1, undefined, 16, 6, undefined][i],
}))

const EXTRA_CN = CN_UNIQUE_POSTERS.map((p, i) => ({
  id: `cn_x${i + 1}`,
  title: [
    'Mộng Hoa Lục', 'Trường Tương Tư', 'Hữu Phỉ',
    'Sơn Hà Lệnh', 'Hộc Châu Phu Nhân', 'Lưu Ly Mỹ Nhân Sát',
  ][i],
  subtitle: [
    'A Dream of Splendor', 'Lost You Forever', 'Legend of Fei',
    'Word of Honor', 'Novoland: Pearl Eclipse', 'Love and Redemption',
  ][i],
  poster: p,
  episode: [36, undefined, undefined, undefined, undefined, undefined][i],
  dub:     [36, undefined, undefined, undefined, undefined, undefined][i],
}))

const EXTRA_US = US_UNIQUE_POSTERS.map((p, i) => ({
  id: `us_x${i + 1}`,
  title: [
    'Học Viện', 'Đặc Vụ Cánh Bướm', 'Thế Giới Ảo Diệu',
    'Người Sắt Hồi Sinh', 'Kẻ Hủy Diệt Tái Xuất', 'Vệ Binh Dải Ngân Hà',
  ][i],
  subtitle: [
    'The Institute', 'Butterfly', 'Gumball',
    'Iron Man Reborn', 'Terminator Returns', 'Guardians of the Galaxy',
  ][i],
  poster: p,
  episode: [7, 4, undefined, undefined, undefined, undefined][i],
  dub:     [undefined, undefined, 20, undefined, undefined, undefined][i],
}))

/* ====== TỔNG HỢP & LẤY 6 PHIM/PHẦN ====== */
export const KR_SHOWS: Show[] = normalize([...(CinemaData as any[]), ...EXTRA_KR]).slice(0, 6)
export const CN_SHOWS: Show[] = normalize([...(HKItemData as any[]), ...EXTRA_CN]).slice(0, 6)
export const US_SHOWS: Show[] = normalize([...(CinemaData as any[]).slice(6), ...EXTRA_US]).slice(0, 6)

/* ====== Config cho trang Home map/render ====== */
export type CountryRailSection = {
  title: string
  viewAllHref: string
  items: Show[]
}

export const COUNTRY_RAILS: CountryRailSection[] = [
  { title: 'Phim Hàn Quốc mới',  viewAllHref: '/topics/k-drama', items: KR_SHOWS },
  { title: 'Phim Trung Quốc mới', viewAllHref: '/topics/c-drama', items: CN_SHOWS },
  { title: 'Phim US-UK mới',     viewAllHref: '/topics/us-uk',    items: US_SHOWS },
]
