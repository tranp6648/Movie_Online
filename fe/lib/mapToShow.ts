// Hàm map linh hoạt: cố gắng lấy đủ trường cần thiết
const toShow = (x: any) => ({
  id: String(x.id ?? x.movieId ?? x.slug ?? cryptoRandom()),
  title: x.title ?? x.name ?? x.viTitle ?? 'No title',
  subtitle: x.enTitle ?? x.engTitle ?? x.subtitle ?? '',
  poster: x.poster ?? x.image ?? x.cover ?? '/poster-fallback.jpg',
  pd: typeof x.episode === 'number' ? x.episode : undefined,
  tm: typeof x.dub === 'number' ? x.dub : undefined,
  href: x.href ?? (x.id ? `/movie/${x.id}` : undefined),
})

// fallback id khi data thiếu id
const cryptoRandom = () => Math.random().toString(36).slice(2)