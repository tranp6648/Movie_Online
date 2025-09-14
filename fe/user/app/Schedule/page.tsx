import ScheduleTimeline, { Day, Show } from "@/components/ScheduleTimeline/ScheduleTimeline";

export default function Schedule() {
  const days: Day[] = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString("vi-VN", { weekday: "short" }),
    };
  });

  const make = (id: number, title: string, startMin: number, seed: number, ep?: string): Show => ({
    id,
    title,
    startMin,
    durationMin: 90,
    poster: `https://picsum.photos/seed/${seed}/100/150`,
    episode: ep,
  });

  const itemsByDay: Record<string, Show[]> = {
    [days[0].date]: [make(1, "Tựa Như Tình Đầu", 8 * 60, 1, "Tập 5")],
    [days[1].date]: [make(2, "Hiến Ngư", 10 * 60, 2, "Tập 9")],
    [days[2].date]: [
      make(3, "Tôi Ở Đỉnh Cao Đợi Cậu", 12 * 60 + 30, 3, "Tập 17"),
      make(4, "Cẩm Nguyệt Như Ca", 14 * 60, 4, "Tập 29"),
    ],
  };

  return <ScheduleTimeline className="pt-22" days={days} itemsByDay={itemsByDay} startHour={8} endHour={23} />;
}
