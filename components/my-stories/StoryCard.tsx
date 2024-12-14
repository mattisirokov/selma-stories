import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Story } from "@/types";
import Colors from "@/constants/Colors";

export default function StoryCard({
  story,
  onItemClick,
}: {
  story: Story;
  onItemClick: (id: number) => void;
}) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          onItemClick(story.id);
        }}
      >
        <Image
          alt=""
          resizeMode="cover"
          source={
            story.image_urls && story.image_urls.length > 0
              ? { uri: story.image_urls[0] }
              : require("@/assets/images/placeholder-image.jpg")
          }
          style={styles.cardImg}
        />

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{story.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 1,
    borderColor: Colors.light.text,
    marginBottom: 16,
  },
  cardImg: {
    width: "100%",
    height: 180,
    borderRadius: 12,
  },
  cardBody: {
    paddingVertical: 16,
  },
  cardTitle: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "700",
    color: Colors.light.text,
  },
});
