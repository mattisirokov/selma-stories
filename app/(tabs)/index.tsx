import { useEffect } from "react";

import { useStories } from "@/contexts/StoryContext";

import HomeLayout from "@/components/home/HomeLayout";
import HomeStoryFeed from "@/components/home/HomeStoryFeed";

export default function TabOneScreen() {
  const { stories } = useStories();

  return (
    <HomeLayout>
      <HomeStoryFeed stories={stories} />
    </HomeLayout>
  );
}
