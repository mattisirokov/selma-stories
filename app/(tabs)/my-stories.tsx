import { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl,
  View,
} from "react-native";

import { useTranslation } from "react-i18next";

import { useRouter } from "expo-router";

import { useAIStory } from "@/hooks/useAIStory";

import StoryCard from "@/components/my-stories/StoryCard";
import LanguageSelector from "@/components/LanguageSelector";

import Colors from "@/constants/Colors";
import { Story } from "@/types";

export default function MyStoriesScreen() {
  const [stories, setStories] = useState<Story[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const { getStories } = useAIStory();

  const { t } = useTranslation();
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
        <View style={styles.header}>
          <Text style={styles.title}>{t("created-stories")}</Text>
          <LanguageSelector />
        </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
