import InterestCard from './InterestCard'

/** Danh sách chủ đề (có thể đổi màu/slug tuỳ ý) */
const topics = [
  { title: 'Marvel',              slug: 'marvel',       from: 'from-indigo-600', to: 'to-blue-400' },
  { title: '4K',                  slug: '4k',           from: 'from-violet-500', to: 'to-purple-300' },
  { title: 'Sitcom',              slug: 'sitcom',       from: 'from-emerald-600', to: 'to-teal-400' },
  { title: 'Lồng Tiếng Cực Mạnh', slug: 'long-tieng',   from: 'from-purple-500', to: 'to-violet-300' },
  { title: 'Xuyên Không',         slug: 'xuyen-khong',  from: 'from-orange-400', to: 'to-rose-300' },
  { title: 'Cổ Trang',            slug: 'co-trang',     from: 'from-rose-500',   to: 'to-red-300' },
] as const

export default function Interest() {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">Bạn đang quan tâm gì?</h2>

      {/* Lưới 6 cột trên màn hình lớn; tự động xuống hàng ở màn hình bé */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {topics.map(t => (
          <InterestCard
            key={t.slug}
            title={t.title}
            href={`/topics/${t.slug}`}
            from={t.from}
            to={t.to}
          />
        ))}

        {/* Thẻ “+4 chủ đề” xuất hiện ở hàng tiếp theo */}
        <InterestCard title="+4 chủ đề" href="/topics" from="" to="" muted />
      </div>
    </section>
  )
}
