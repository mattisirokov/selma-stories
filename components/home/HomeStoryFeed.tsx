import React, { useMemo } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";

import SmallCard from "../my-stories/SmallCard";
import Colors from "@/constants/Colors";

import { Story } from "@/types";

interface HomeStoryFeedProps {
  stories: Story[];
}

export default function HomeStoryFeed({ stories }: HomeStoryFeedProps) {
  const rows = useMemo(() => {
    const sortedStories = [...stories].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const rows = [];
    for (let i = 0; i < sortedStories.length; i += 2) {
      rows.push(sortedStories.slice(i, i + 2));
    }

    return rows;
  }, [stories]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((story) => {
              return <SmallCard key={story.id} story={story} />;
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingHorizontal: 8,
    backgroundColor: Colors.light.background,
  },
  row: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: "row",
    gap: 8,
  },
  card: {
    position: "relative",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 4,
    flexDirection: "column",
    alignItems: "stretch",
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#222",
  },
  cardImg: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    borderStyle: "solid",
  },
  cardRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  cardRowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardRowItemText: {
    fontWeight: "400",
    fontSize: 13,
    color: "#888",
    paddingHorizontal: 8,
  },
  cardTitle: {
    marginTop: 4,
    fontWeight: "700",
    paddingHorizontal: 8,
    fontSize: 15,
    lineHeight: 19,
    color: Colors.light.text,
    marginBottom: 8,
  },
});
