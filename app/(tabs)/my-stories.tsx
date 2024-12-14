import { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl, // Add this import
} from "react-native";
import { useRouter } from "expo-router";

import { useAIStory } from "@/hooks/useAIStory";
import Colors from "@/constants/Colors";
import StoryCard from "@/components/my-stories/StoryCard";
import { Story } from "@/types";

export default function MyStoriesScreen() {
  const [stories, setStories] = useState<Story[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { getStories } = useAIStory();
  const router = useRouter();

  const loadStories = useCallback(async () => {
    const fetchedStories = await getStories();
    if (fetchedStories) {
      setStories(fetchedStories);
    }
  }, [getStories]);

  useEffect(() => {
    loadStories();
  }, [loadStories]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadStories();
    setRefreshing(false);
  }, [loadStories]);

  const handleStoryClick = (storyId: number) => {
    router.push(`/story/${storyId}`);
  };

  const sortedByDate = stories.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <SafeAreaView style={{ backgroundColor: Colors.light.background }}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.light.text]}
            tintColor={Colors.light.text}
          />
        }
      >
        <Text style={styles.title}>Created stories</Text>
        {sortedByDate.map((story, index) => (
          <StoryCard
            key={story.id || index}
            story={story}
            onItemClick={handleStoryClick}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 12,
  },
});
