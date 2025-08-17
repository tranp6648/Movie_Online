// fe/data/HomeCountryRails.tsx
import type { Show } from '@/lib/types'
import { CinemaData } from '@/data/CinemaData'
import { HKItemData } from '@/data/HKItemData'

/**
 * Chuẩn hoá 1 item bất kỳ -> Show dùng cho CountryCard
 * - Thử nhiều tên field thường gặp (title, image/cover/thumb, episode/dub...)
 * - Có fallback an toàn để không bị undefined
 */
const toShow = (x: any): Show => {
  // id / slug
  const id =
    x.id ??
    x.movieId ??
    x._id ??
    x.slug ??
    cryptoRandom()

  // tiêu đề & phụ đề
  const title =
    x.title ??
    x.name ??
    x.movieName ??
    x.viTitle ??
    x.vnTitle ??
    x.origin_name ??
    'No title'

  const subtitle =
    x.enTitle ??
    x.engTitle ??
    x.en_name ??
    x.enTitleName ??
    x.original_name ??
    ''

  // ảnh poster (ưu tiên ảnh lớn, có nhiều khả năng tên khác nhau)
  const poster =
    x.poster ??
    x.posterUrl ??
    x.poster_url ??
    x.image ??
    x.cover ??
    x.thumb ??
    x.thumb_url ??
    x.thumbnail ??
    '/poster-fallback.jpg'

  // badge: số tập (PD) & thuyết minh (TM)
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

  // link chi tiết
  const href =
    x.href ??
    (x.slug
      ? `/movie/${x.slug}`
      : (x.id || x.movieId)
      ? `/movie/${x.id ?? x.movieId}`
      : undefined)

  return {
    id: String(id),
    title,
    subtitle,
    poster,
    pd,
    tm,
    href,
  }
}

// fallback id ngẫu nhiên (tránh trùng key)
function cryptoRandom() {
  return Math.random().toString(36).slice(2)
}

// Chuẩn hoá mảng: CHƯA filter poster để đảm bảo luôn có dữ liệu hiển thị
const normalize = (arr: any[]): Show[] => (arr ?? []).map(toShow)

// ====== GHÉP DỮ LIỆU CHO 3 NHÓM ======
export const KR_SHOWS: Show[] = normalize((CinemaData as any[]).slice(0, 12))
export const CN_SHOWS: Show[] = normalize((HKItemData as any[]).slice(0, 12))
// Tạm reuse để có data; sau này thay bằng dataset US-UK riêng
export const US_SHOWS: Show[] = normalize((CinemaData as any[]).slice(12, 24))

// Cấu hình rail để page chỉ việc map/render
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

/* 
// (Tuỳ chọn) debug nhanh:
console.log('CinemaData length =', Array.isArray(CinemaData) ? CinemaData.length : 'not array')
console.log('HKItemData length =', Array.isArray(HKItemData) ? HKItemData.length : 'not array')
console.log('CinemaData[0] =', (CinemaData as any[])[0])
*/
