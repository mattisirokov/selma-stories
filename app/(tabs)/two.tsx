import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { useRouter } from "expo-router";

import CreatedStoriesList from "@/components/my-stories/CreatedStoriesList";

import { useAIStory } from "@/hooks/useAIStory";

import { Story } from "@/types";

export default function TabTwoScreen() {
  const [stories, setStories] = useState<Story[]>([]);

  const { getStories } = useAIStory();
  const router = useRouter();

  useEffect(() => {
    getStories().then((stories) => setStories(stories));
  }, []);

  return (
    <CreatedStoriesList
      stories={stories}
      onItemClick={(storyId) => router.push(`/story/${storyId}`)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  image: {
    width: 200,
    height: 200,
    borderWidth: 1,
  },
});
