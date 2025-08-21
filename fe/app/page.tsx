
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


export default function Home() {
  return (

    <>
    //a
      <MovieSlider />
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
