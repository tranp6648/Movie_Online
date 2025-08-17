
import AnimeSpotlight from "@/components/Home/AnimeSpotlight";
import CinemaRow from "@/components/Home/CinemaRow";
import HKCinemaRail from "@/components/Home/HKCinemaRail";
import PosterRail from "@/components/Home/PosterRail";
import Top10TodaySlider from "@/components/Home/Top10TodaySlider";
import UpcomingRail from "@/components/Home/UpcomingRail";
import HomeHighlights from "@/components/HomeHighlights";
import MovieDetail from "@/components/MovieHero";
import HeroBanner from "@/components/MovieHero";
import MovieSlider from "@/components/MovieHero";
import MovieCard from "@/components/MovieHero";
import HomeBanner from "@/components/MovieHero";
import RoPhimHeroBanner from "@/components/MovieHero";
import { AnimeSpotlightData } from "@/data/AnimeSpotlightData";
import { CinemaData } from "@/data/CinemaData";
import { HKItemData } from "@/data/HKItemData";
import { PosterRailData } from "@/data/PosterRailData";
import { TOP10_TODAY } from "@/data/Top10Today";
import { UpcomingRailDetail } from "@/data/UpComingRailData";
import Image from "next/image";

export default function Home() {
  return (

    <>
      <MovieSlider />
      <HomeHighlights />
      <Top10TodaySlider items={TOP10_TODAY} />
      <CinemaRow items={CinemaData} />
      <Top10TodaySlider items={TOP10_TODAY} title="Top 10 phim lẻ hôm nay" />
      <PosterRail items={PosterRailData}/>
       <PosterRail items={PosterRailData} title="Phim Thái New: Không Drama Đời Không Nể"/>
       <UpcomingRail items={UpcomingRailDetail}/>
       <AnimeSpotlight items={AnimeSpotlightData}/>
       <UpcomingRail items={UpcomingRailDetail}/>
       <HKCinemaRail items={HKItemData}/>
    </>

  );
}
