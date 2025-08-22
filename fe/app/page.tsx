
import AnimeSpotlight from "@/components/Home/AnimeSpotlight";
import CinemaRow from "@/components/Home/CinemaRow";
import HKCinemaRail from "@/components/Home/HKCinemaRail";
import PosterRail from "@/components/Home/PosterRail";
import Top10TodaySlider from "@/components/Home/Top10TodaySlider";
import UpcomingRail from "@/components/Home/UpcomingRail";
import HomeHighlights from "@/components/HomeHighlights";
import MovieSlider from "@/components/MovieHero";
import { AnimeSpotlightData } from "@/data/AnimeSpotlightData";
import { CinemaData } from "@/data/CinemaData";
import { HKItemData } from "@/data/HKItemData";
import { PosterRailData } from "@/data/PosterRailData";
import { TOP10_TODAY } from "@/data/Top10Today";
import { UpcomingRailDetail } from "@/data/UpComingRailData";
import Interest from "@/components/Home/Interest";
import { COUNTRY_RAILS } from "@/data/HomeCountryRails";
import CountryRail from "@/components/Home/CountryRail";
import {MovieSliderData} from "@/data/MovieSliderData";
import {MovieSlider as MovieSlieders} from "@/components/Home/MovieSlider";
import MovieHero from "@/components/MovieHero";


export default function Home() {
  return (

    <>
 
     <MovieHero
bgImage="https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=2400&auto=format&fit=crop"
title="F1: The Movie"
year="2025"
duration="1h 40m"
rating="T16"
score="IMDb 7.9"
genres={["Chính kịch", "Hành động", "Chiếu rạp"]}
description="Brad Pitt vào vai một cựu tay đua trở lại với đường đua Công thức 1 cùng APXGP, một đội đua giả tưởng. Cùng đồng đội, họ sẽ đối đầu với những tay đua máu mặt trong lĩnh vực thú vị này."
thumbnails={[
"https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop",
"https://images.unsplash.com/photo-1520975922071-a569e88f77d4?q=80&w=600&auto=format&fit=crop",
"https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=600&auto=format&fit=crop",
"https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=600&auto=format&fit=crop",
"https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=600&auto=format&fit=crop",
]}
/>
      <HomeHighlights />
      <Interest />
      {COUNTRY_RAILS.map((sec) => (
  <CountryRail
          key={sec.title}
          title={sec.title}
          viewAllHref={sec.viewAllHref}
          items={sec.items}
          accentTitle={
            sec.title.includes("Hàn")
              ? "from-indigo-200 to-white"
              : sec.title.includes("Trung")
              ? "from-amber-200 to-white"
              : "from-pink-300 to-white"
          }
        />
))}

        <MovieSlieders movies={MovieSliderData} title="Phim Điện Ảnh Mới Coóng"/>
      <Top10TodaySlider items={TOP10_TODAY} />
      <CinemaRow items={CinemaData} />
      <Top10TodaySlider items={TOP10_TODAY} title="Top 10 phim lẻ hôm nay" />

      <PosterRail items={PosterRailData} />
      <PosterRail items={PosterRailData} title="Phim Thái New: Không Drama Đời Không Nể" />
      <UpcomingRail items={UpcomingRailDetail} />
      <AnimeSpotlight items={AnimeSpotlightData} />
      <UpcomingRail items={UpcomingRailDetail} />
      <HKCinemaRail items={HKItemData} />
    </>

  );
}
