import { View } from "react-native";

import HomeLayout from "@/components/home/HomeLayout";
import HomeStoryFeed from "@/components/home/HomeStoryFeed";

export default function TabOneScreen() {
  return (
    <HomeLayout>
      <HomeStoryFeed />
    </HomeLayout>
  );
}
