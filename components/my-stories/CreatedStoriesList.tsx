import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

import { Story } from "@/types";

export default function CreatedStoriesList({
  stories,
  onItemClick,
}: {
  stories: Story[];
  onItemClick: (storyId: number) => void;
}) {
  const sortedByDate = stories.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Created stories</Text>

        {sortedByDate.map((story, index) => {
          return (
            <View
              key={index}
              style={[styles.card, index === 0 && { borderTopWidth: 0 }]}
            >
              <TouchableOpacity
                onPress={() => {
                  onItemClick(story.id);
                }}
              >
                <Image
                  alt=""
                  resizeMode="cover"
                  source={
                    story.image_urls
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
        })}
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
    color: "#1d1d1d",
    marginBottom: 12,
  },
  /** Card */
  card: {
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    marginBottom: 16,
  },
  cardImg: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginRight: 16,
  },
  cardBody: {
    paddingVertical: 16,
  },
  cardTitle: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: -6,
    marginBottom: 8,
  },
  cardRowItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  cardRowItemText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#173153",
    marginLeft: 4,
  },
  cardPrice: {
    fontSize: 19,
    fontWeight: "700",
    color: "#173153",
  },
});
