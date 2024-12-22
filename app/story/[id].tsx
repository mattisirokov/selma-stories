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
import { useAIStory } from "@/hooks/useAIStory";

import FeatherIcon from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";

import { formatDate } from "@/helpers";
import { Story } from "@/types";

const HEADER_OFFSET = 100;
const HEADER_BACKGROUND = {
  default: "rgba(0,0,0,0)",
  scroll: "rgba(0,0,0,1)",
};

export default function Example() {
  const [storyData, setStoryData] = useState<Story | null>(null);

  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { getStory, generateAudioReading, audioLoadingState } = useAIStory();

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
    return <Text style={{ color: Colors.light.text }}>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
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
                <FeatherIcon
                  color={Colors.light.text}
                  name="chevron-left"
                  size={22}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <View style={styles.action}>
                <FeatherIcon color={Colors.light.text} name="share" size={22} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <View style={styles.action}>
                <FeatherIcon
                  color={Colors.light.text}
                  name="search"
                  size={22}
                />
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
        </View>
        <View
          style={[styles.header, { backgroundColor: Colors.light.background }]}
        >
          <View style={styles.headerTop}>
            <Text style={[styles.title, { color: Colors.light.text }]}>
              {storyData.title}
            </Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.headerTopAction}
            >
              <FeatherIcon color={Colors.light.text} name="heart" size={22} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerLocation}>
            <FeatherIcon color="#FF9801" name="map-pin" size={14} />

            <Text
              style={[styles.headerLocationText, { color: Colors.light.text }]}
            >
              {formatDate(storyData.created_at)}
            </Text>
          </View>
          <View style={styles.content}>
            {(() => {
              if (!storyData.image_urls || storyData.image_urls.length === 0) {
                return (
                  <Text
                    style={[styles.storyText, { color: Colors.light.text }]}
                  >
                    {storyData.content}
                  </Text>
                );
              } else if (storyData.image_urls.length >= 2) {
                const midPoint = Math.floor(storyData.content.length / 2);
                const firstHalf = storyData.content.substring(0, midPoint);

                const lastPeriodInFirst = firstHalf.lastIndexOf(".");
                const splitPoint =
                  lastPeriodInFirst !== -1 ? lastPeriodInFirst + 1 : midPoint;

                return (
                  <>
                    <Text
                      style={[styles.storyText, { color: Colors.light.text }]}
                    >
                      {storyData.content.substring(0, splitPoint)}
                    </Text>
                    <Image
                      source={{ uri: storyData.image_urls[0] }}
                      style={styles.storyImage}
                    />
                    <Text
                      style={[styles.storyText, { color: Colors.light.text }]}
                    >
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
                    <Text
                      style={[styles.storyText, { color: Colors.light.text }]}
                    >
                      {storyData.content.substring(0, splitPoint)}
                    </Text>
                    <Image
                      source={{ uri: storyData.image_urls[0] }}
                      style={styles.storyImage}
                    />
                    <Text
                      style={[styles.storyText, { color: Colors.light.text }]}
                    >
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
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 38,
    letterSpacing: -0.015,
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
    backgroundColor: Colors.light.background,
  },
  actionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: -8,
    paddingHorizontal: 16,
  },
  actionFilled: {
    backgroundColor: Colors.light.background,
  },
  hero: {
    position: "relative",
  },
  heroImg: {
    width: "100%",
    height: 275,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
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
    backgroundColor: Colors.light.tint,
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
    opacity: 0.7,
    marginLeft: 4,
  },
  content: {
    marginTop: 20,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  storyImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
});
