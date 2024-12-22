import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";

import { formatDate, displayPlaceholderImage } from "@/helpers";

import Colors from "@/constants/Colors";

import { Story } from "@/types";

export default function StoryCard({
  story,
  onItemClick,
}: {
  story: Story;
  onItemClick: (id: number) => void;
}) {
  return (
    <TouchableOpacity onPress={() => onItemClick(story.id)}>
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Image
            alt=""
            resizeMode="cover"
            source={
              displayPlaceholderImage(new Date(story.created_at)) ||
              !story.image_urls?.length
                ? require("@/assets/images/placeholder-image.jpg")
                : { uri: story.image_urls[0] }
            }
            style={styles.cardImg}
          />
          <View style={styles.datePill}>
            <Text style={styles.dateText}>{formatDate(story.created_at)}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{story.title}</Text>
          </View>
          <Text style={styles.preview} numberOfLines={2}>
            {story.content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 24,
    marginBottom: 24,
    backgroundColor: "#222",
  },
  cardTop: {
    position: "relative",
    borderRadius: 24,
  },
  cardImg: {
    width: "100%",
    height: 180,
    borderRadius: 24,
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: Colors.light.text,
  },
  datePill: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  dateText: {
    color: Colors.light.text,
    fontSize: 12,
    fontWeight: "600",
  },
  preview: {
    color: Colors.light.text,
    fontSize: 14,
    opacity: 0.8,
  },
});
