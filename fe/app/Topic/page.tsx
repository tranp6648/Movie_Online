import TopicSection from "@/components/Topic/TopicSection";
import { TopicData } from "@/data/TopicData";

export default function Home() {
    return (
        <TopicSection topics={TopicData} className="pt-20"/>
    )
}