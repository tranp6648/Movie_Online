import type { WideMovie } from '@/components/general/MovieCardWide'
import type { WatchEvent } from '@/components/general/WatchCard'

// poster thực tế
const posters = [
  "https://image.tmdb.org/t/p/w780/fuVuDYrs8sxvEolnYr0wCSvtyTi.jpg", // Stranger from Hell
  "https://image.tmdb.org/t/p/w780/5jkE2SzR5uR2egEb1rRhF22JyWN.jpg", // Harry Potter
  "https://image.tmdb.org/t/p/w780/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg", // Muộn Hồn Đoạt Xác
]

const avatar = (i: number) => `https://i.pravatar.cc/80?img=${(i % 70) + 1}`

export const premieres: WideMovie[] = [
  {
    id: 'prem-1',
    title: 'Người Lạ Đến Từ Địa Ngục',
    subtitle: 'Stranger from Hell',
    poster: posters[0],
    status: 'done',
    source: 'Netflix',
    timeAgo: '13 ngày trước',
  },
  {
    id: 'prem-2',
    title: 'Harry Potter và Phòng Chứa Bí Mật',
    subtitle: 'Harry Potter and the Chamber of Secrets',
    poster: posters[1],
    status: 'done',
    source: 'Warner Bros',
    timeAgo: '18 ngày trước',
  },
  {
    id: 'prem-3',
    title: 'Muộn Hồn Đoạt Xác',
    subtitle: 'The Possession',
    poster: posters[2],
    status: 'done',
    source: 'Lionsgate',
    timeAgo: '21 ngày trước',
  },
]

// 40 phòng xem (20/phân trang)
export const watchTogether: WatchEvent[] = Array.from({ length: 40 }).map((_, i) => {
  const st = i % 3 === 0 ? 'live' : i % 3 === 1 ? 'upcoming' : 'done'
  return {
    id: `wt-${i + 1}`,
    title: `Cùng xem phim số ${i + 1}`,
    subtitle: st === 'live' ? 'Đang live' : st === 'upcoming' ? 'Sắp chiếu' : 'Đã kết thúc',
    poster: posters[i % posters.length],
    status: st as WatchEvent['status'],
    hostName: `Host ${i + 1}`,
    hostAvatar: avatar(i + 1),
    timeAgo: `${(i % 11) + 1} phút trước`,
    viewers: st === 'live' ? 1 + (i % 10) : undefined,
  }
})
