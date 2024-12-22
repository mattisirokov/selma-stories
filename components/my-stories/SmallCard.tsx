import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import { router } from "expo-router";

import { displayPlaceholderImage, formatDate } from "@/helpers";
import Colors from "@/constants/Colors";

import { Story } from "@/types";

interface SmallCardProps {
  story: Story;
}

const SmallCard = ({ story }: SmallCardProps) => {
  const getImageSource = (story: Story) => {
    if (
      displayPlaceholderImage(new Date(story.created_at)) ||
      !story.image_urls?.length
    ) {
      return require("@/assets/images/placeholder-image.jpg");
    }
    return { uri: story.image_urls[0] };
  };
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/story/${story.id}`);
      }}
      style={styles.card}
    >
      <Image
        alt=""
        resizeMode="cover"
        source={getImageSource(story)}
        style={styles.cardImg}
      />

      <View style={styles.cardRow}>
        <View style={styles.cardRowItem}>
          <Text style={styles.cardRowItemText}>
            {formatDate(story.created_at)}
          </Text>
        </View>
      </View>

      <Text style={styles.cardTitle}>{story.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default SmallCard;
