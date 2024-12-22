import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { useTranslation } from "react-i18next";

import { useRouter } from "expo-router";

import StoryCard from "@/components/my-stories/StoryCard";
import LanguageSelector from "@/components/LanguageSelector";

import Colors from "@/constants/Colors";
import { useStories } from "@/contexts/StoryContext";

export default function MyStoriesScreen() {
  const { stories } = useStories();
  const { t } = useTranslation();

  const router = useRouter();

  const handleStoryClick = (storyId: number) => {
    router.push(`/story/${storyId}`);
  };

  const sortedByDate = stories.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <SafeAreaView style={{ backgroundColor: Colors.light.background }}>
      <ScrollView contentContainerStyle={styles.container}>
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
