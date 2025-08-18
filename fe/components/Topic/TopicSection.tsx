import { ChevronRight } from "lucide-react";

export type Topic = {
    id: string | number;
    title: string;
    href?: string;
    color?: keyof typeof PALETTES;
}
const PALETTES = {
    blue: {
        from: "from-[#4F7DF2]",
        to: "to-[#3E6BE2]"
    },
    purple: {
        from: "from-[#B44CF2]",
        to: "to-[#8A3DE2]"
    },
    teal: {
        from: "from-[#2DB5A6]",
        to: "to-[#1E8F87]",
    },
    indigo: {
        from: "from-[#8B8EC4]",
        to: "to-[#6F74AE]",
    },
    green: {
        from: "from-[#6BC163]",
        to: "to-[#55A74D]",
    },
    rose: {
        from: "from-[#C86D66]",
        to: "to-[#B05650]",
    },
    pink: {
        from: "from-[#F49AC3]",
        to: "to-[#E372A6]",
    },
    orange: {
        from: "from-[#E7A285]",
        to: "to-[#D88E6E]",
    },
} as const;
const waveBg =
    "url('data:image/svg+xml;utf8,\
  <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 200\" opacity=\"0.35\">\
    <defs>\
      <linearGradient id=\"g\" x1=\"0\" x2=\"1\">\
        <stop stop-color=\"white\" stop-opacity=\"0\"/>\
        <stop offset=\"1\" stop-color=\"white\" stop-opacity=\"0.6\"/>\
      </linearGradient>\
    </defs>\
    <path d=\"M0 160 Q 60 120 120 160 T 240 160 T 400 160 V 200 H 0 Z\" fill=\"url(%23g)\"/>\
    <path d=\"M0 140 Q 60 100 120 140 T 240 140 T 400 140 V 200 H 0 Z\" fill=\"url(%23g)\"/>\
  </svg>')";
const TopicSection = ({
    title = "Các chủ đề",
    topics,
    className = "",
}: {
    title?: string;
    topics: Topic[];
    className?: string;
}) => {
    return(
        <section className={`w-full ${className}`} aria-labelledby="topics-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 id="topics-heading" className="text-white text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">{title}</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                    {topics.map((t)=>{
                        const p = PALETTES[t.color ?? "blue"];
                        return(
                            <li key={t.id}>
                                <a
                                href={t.href ?? "#"}
                                className={`relative block rounded-2xl p-5 sm:p-6 h-[130px] sm:h-[150px] 
                                    overflow-hidden shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] 
                                    bg-gradient-to-br ${p.from} ${p.to} focus:outline-none focus-visible:ring
                                    focus-visible:ring-yellow-400`}
                                style={{backgroundImage:t.color,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundBlendMode:'overlay'}}
                                >
                                    <div className="flex h-full flex-col justify-between">
                                        <h3 className="text-white text-2xl font-bold drop-shadow-sm line-clamp-2">{t.title}</h3>
                                        <span className="inline-flex items-center gap-1 text-white/90 text-sm font-medium">
                                         Xem toàn bộ <ChevronRight className="h-4 w-4" />
                                        </span>
                                    </div>
                                    <span className="pointer-events-none absolute inset-0 rounded-2xl bg-white/0 hover:bg-white/5 transition-colors"/>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}
export default TopicSection;