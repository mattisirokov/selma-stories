import { useRef, useState, useEffect } from "react";

import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import FeatherIcon from "@expo/vector-icons/Feather";

import { useAIStory } from "@/hooks/useAIStory";

import { formatDate } from "@/helpers";

import { Story } from "@/types";

const HEADER_OFFSET = 100;
const HEADER_BACKGROUND = {
  default: "rgba(255,255,255,0)",
  scroll: "rgba(255,255,255,1)",
};

export default function Example() {
  const [storyData, setStoryData] = useState<Story | null>(null);

  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { getStory } = useAIStory();

  useEffect(() => {
    const fetchStory = async () => {
      const result = await getStory(id as string);
      setStoryData(result);
    };
    fetchStory();
  }, [id]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const backgroundColor = scrollY.interpolate({
    inputRange: [0, HEADER_OFFSET, HEADER_OFFSET + 10],
    outputRange: [
      HEADER_BACKGROUND.default,
      HEADER_BACKGROUND.default,
      HEADER_BACKGROUND.scroll,
    ],
  });

  if (!storyData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[styles.actions, { backgroundColor }]}>
        <SafeAreaView>
          <View style={styles.actionWrapper}>
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              style={{ marginRight: "auto" }}
            >
              <View style={[styles.action, styles.actionFilled]}>
                <FeatherIcon color="#323142" name="chevron-left" size={22} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <View style={styles.action}>
                <FeatherIcon color="#323142" name="share" size={22} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <View style={styles.action}>
                <FeatherIcon color="#323142" name="search" size={22} />
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
      <ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.hero}>
          <Image
            alt=""
            style={styles.heroImg}
            source={
              storyData.image_urls && storyData.image_urls.length > 0
                ? { uri: storyData.image_urls[0] }
                : require("@/assets/images/placeholder-image.jpg")
            }
          />

          <View style={styles.heroStatus}>
            <Text style={styles.heroStatusText}>Opened</Text>
          </View>
        </View>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>{storyData.title}</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.headerTopAction}
            >
              <FeatherIcon color="#323142" name="heart" size={22} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerLocation}>
            <FeatherIcon color="#FF9801" name="map-pin" size={14} />

            <Text style={styles.headerLocationText}>
              {formatDate(storyData.created_at)}
            </Text>
          </View>

          <View style={styles.content}>
            {(() => {
              if (!storyData.image_urls || storyData.image_urls.length === 0) {
                return (
                  <Text style={styles.storyText}>{storyData.content}</Text>
                );
              } else if (storyData.image_urls.length >= 2) {
                const midPoint = Math.floor(storyData.content.length / 2);
                const firstHalf = storyData.content.substring(0, midPoint);

                const lastPeriodInFirst = firstHalf.lastIndexOf(".");
                const splitPoint =
                  lastPeriodInFirst !== -1 ? lastPeriodInFirst + 1 : midPoint;

                return (
                  <>
                    <Text style={styles.storyText}>
                      {storyData.content.substring(0, splitPoint)}
                    </Text>
                    <Image
                      source={{ uri: storyData.image_urls[0] }}
                      style={styles.storyImage}
                    />
                    <Text style={styles.storyText}>
                      {storyData.content.substring(splitPoint)}
                    </Text>
                    <Image
                      source={{ uri: storyData.image_urls[1] }}
                      style={styles.storyImage}
                    />
                  </>
                );
              } else {
                const midPoint = Math.floor(storyData.content.length / 2);
                const firstHalf = storyData.content.substring(0, midPoint);

                const lastPeriodInFirst = firstHalf.lastIndexOf(".");
                const splitPoint =
                  lastPeriodInFirst !== -1 ? lastPeriodInFirst + 1 : midPoint;

                return (
                  <>
                    <Text style={styles.storyText}>
                      {storyData.content.substring(0, splitPoint)}
                    </Text>
                    <Image
                      source={{ uri: storyData.image_urls[0] }}
                      style={styles.storyImage}
                    />
                    <Text style={styles.storyText}>
                      {storyData.content.substring(splitPoint)}
                    </Text>
                  </>
                );
              }
            })()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9,
    paddingVertical: 12,
  },
  container: {
    backgroundColor: "#F4F5F6",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 38,
    letterSpacing: -0.015,
    color: "#323142",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginBottom: 6,
  },
  action: {
    width: 36,
    height: 36,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  actionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: -8,
    paddingHorizontal: 16,
  },
  actionFilled: {
    backgroundColor: "#e8f0f9",
  },
  hero: {
    position: "relative",
  },
  heroImg: {
    width: "100%",
    height: 275,
  },
  heroStatus: {
    position: "absolute",
    bottom: 24,
    right: 24,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "#ff9801",
    borderRadius: 50,
  },
  heroStatusText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    letterSpacing: 0.1,
    color: "#ffffff",
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  headerTopAction: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    backgroundColor: "#f1f3f4",
    borderRadius: 9999,
  },
  headerLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLocationText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#323142",
    opacity: 0.7,
    marginLeft: 4,
  },
  content: {
    marginTop: 20,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#323142",
    marginBottom: 20,
  },
  storyImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
});
