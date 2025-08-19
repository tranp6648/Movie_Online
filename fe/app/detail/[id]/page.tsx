import MovieDetail from "@/components/MovieDetail/MovieDetail";

export default function Page() {
  return (
    <MovieDetail
      poster="https://static.nutscdn.com/vimg/1920-0/f93325ae5cf719ec60eb94521994f0b1.webp"
      title="Minh Nguyệt Nhập Khanh Hoài"
      subtitle="A Forbidden Marriage"
      year={2025}
      genres={["Cổ Trang", "Tình Cảm"]}
      description="Bộ phim kể về câu chuyện tình yêu giữa hoàng tử và một thiếu nữ bình thường, vượt qua mọi định kiến và thử thách trong xã hội cổ trang."
      episodes={Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        label: `Tập ${i + 1}`,
        href: "#",
      }))}
      actors={[
        {
          name: "Mao Zijun",
          avatar:
            "https://image.tmdb.org/t/p/w500/j8h9CrCjaKZJVI6Wco4T3L4bQEm.jpg",
        },
        {
          name: "Zhou Jieqiong",
          avatar:
            "https://image.tmdb.org/t/p/w500/1VnhapQgorQZ9g6EOHiiwUCqmMi.jpg",
        },
        {
          name: "Li Jiulin",
          avatar:
            "https://image.tmdb.org/t/p/w500/oeYVgeHcSp9nmeu2wsNNounmopq.jpg",
        },
      ]}
      duration="45 phút"
      country="Trung Quốc"
      network="iQiyi"
      producer="iQIYI"
      director="He Honghui"
      comments={[
        {
          id: 1,
          user: "Ovu",
          avatar: "https://image.tmdb.org/t/p/w500/oeYVgeHcSp9nmeu2wsNNounmopq.jpg",
          content: "Bà nữ nhìn lạ quá, giống gì đó bên HTTD dko?",
          time: "1 giờ trước",
        },
        {
          id: 2,
          user: "Văn Tịch Vũ",
          avatar: "https://image.tmdb.org/t/p/w500/oeYVgeHcSp9nmeu2wsNNounmopq.jpg",
          content:
            "Muốn Mao Tử Tuấn một lần làm nam chính phim nào nó xịn xịn bôm tấn tí. Phim hay thì ảnh toàn kẹp phụ thôi tiếc.",
          time: "2 ngày trước",
        },
        {
          id: 3,
          user: "Trích",
          avatar: "https://image.tmdb.org/t/p/w500/oeYVgeHcSp9nmeu2wsNNounmopq.jpg",
          content:
            "Lâu lắm mới thấy Mao Tử Tuấn đóng phim, từ thích vai độc công tử Tần vô viêm lâm @@",
          time: "2 ngày trước",
        },
        {
          id: 4,
          user: "Giang",
          avatar: "https://image.tmdb.org/t/p/w500/oeYVgeHcSp9nmeu2wsNNounmopq.jpg",
          content:
            "Phim dễ đoán, tưởng phim tập dài ai dè ghép tập ngắn lại nên có 10 tập, kỹ xảo ba xu, kịch bản xàm.",
          time: "2 ngày trước",
        },
        {
          id: 5,
          user: "Lê Ngọc Quý",
          avatar: "https://image.tmdb.org/t/p/w500/oeYVgeHcSp9nmeu2wsNNounmopq.jpg",
          content: "Hong biết bây hồng nhan thích Chu Khiết Quỳnh hehe",
          time: "3 ngày trước",
        },
      ]}
    />
  );
}
