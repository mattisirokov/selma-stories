import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import Colors from "@/constants/Colors";

type CreateStoryStartScreenProps = {
  onPress: () => void;
};

export default function CreateStoryStartScreen({
  onPress,
}: CreateStoryStartScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={styles.hero}
        entering={FadeInDown.delay(200).springify()}
      >
        <Image
          source={{ uri: "https://assets.withfra.me/Landing.3.png" }}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </Animated.View>
      <View style={styles.content}>
        <Animated.View
          style={styles.contentHeader}
          entering={FadeInDown.delay(400).springify()}
        >
          <Text style={styles.title}>
            Create your story{"\n"}with{" "}
            <View style={styles.appName}>
              <Text style={styles.appNameText}>SelmaAI</Text>
            </View>
          </Text>
          <Text style={styles.text}>
            Generate unique stories powered by AI. Create memorable tales for
            any occasion.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600).springify()}>
          <TouchableOpacity
            onPress={() => {
              onPress();
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Create Story</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 40,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "400",
    color: Colors.light.text,
    textAlign: "center",
  },
  /** Hero */
  hero: {
    backgroundColor: Colors.light.tint + "20",
    margin: 12,
    borderRadius: 16,
    padding: 16,
  },
  heroImage: {
    width: "100%",
    height: 400,
  },
  /** Content */
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  contentHeader: {
    paddingHorizontal: 24,
  },
  appName: {
    backgroundColor: Colors.light.tint + "20",
    transform: [
      {
        rotate: "-5deg",
      },
    ],
    paddingHorizontal: 6,
  },
  appNameText: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
  },
  /** Button */
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.light.background,
  },
});
