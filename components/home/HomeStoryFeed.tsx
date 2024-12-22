import React, { useMemo } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

import { formatDate, displayPlaceholderImage } from "@/helpers";

import Colors from "@/constants/Colors";

import { feed } from "@/constants/placeholder-data";

export default function HomeStoryFeed() {
  const rows = useMemo(() => {
    const rows = [];

    for (let i = 0; i < feed.length; i += 2) {
      rows.push(feed.slice(i, i + 2));
    }

    return rows;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <ScrollView contentContainerStyle={styles.content}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map(({ img, title, author, authorImg, tag, date }, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {}}
                  style={styles.card}
                >
                  <View style={styles.cardTag}>
                    <Text style={styles.cardTagText}>{tag}</Text>
                  </View>

                  <Image
                    alt=""
                    resizeMode="cover"
                    source={{ uri: img }}
                    style={styles.cardImg}
                  />

                  <View style={styles.cardRow}>
                    <View style={styles.cardRowItem}>
                      <Image
                        alt=""
                        source={{ uri: authorImg }}
                        style={styles.cardRowItemImg}
                      />

                      <Text style={styles.cardRowItemText}>{author}</Text>
                    </View>

                    <Text style={styles.cardRowDivider}>·</Text>

                    <View style={styles.cardRowItem}>
                      <Text style={styles.cardRowItemText}>{date}</Text>
                    </View>
                  </View>

                  <Text style={styles.cardTitle}>{title}</Text>
                </TouchableOpacity>
              );
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
  /** Header */
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
  },
  /** Card */
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
  cardTag: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
    backgroundColor: Colors.light.background,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 8,
  },
  cardTagText: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: "700",
    color: Colors.light.tint,
    textTransform: "capitalize",
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
    flexWrap: "wrap",
  },
  cardRowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "transparent",
  },
  cardRowItemImg: {
    width: 22,
    height: 22,
    borderRadius: 9999,
    marginRight: 6,
  },
  cardRowItemText: {
    fontWeight: "400",
    fontSize: 13,
    color: "#888",
  },
  cardRowDivider: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#888",
    paddingHorizontal: 4,
  },
  cardTitle: {
    marginTop: 4,
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 19,
    color: Colors.light.text,
    marginBottom: 8,
  },
});
