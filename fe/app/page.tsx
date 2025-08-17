
import Top10TodaySlider from "@/components/Home/Top10TodaySlider";
import HomeHighlights from "@/components/HomeHighlights";
import MovieDetail from "@/components/MovieHero";
import HeroBanner from "@/components/MovieHero";
import MovieSlider from "@/components/MovieHero";
import MovieCard from "@/components/MovieHero";
import HomeBanner from "@/components/MovieHero";
import RoPhimHeroBanner from "@/components/MovieHero";
import { TOP10_TODAY } from "@/data/Top10Today";
import Image from "next/image";

export default function Home() {
 return (
   
   <>
      <MovieSlider />
      <HomeHighlights/>
    <Top10TodaySlider items={TOP10_TODAY}   />
   </>
   
  );
}
