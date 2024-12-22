import { View, Text, StyleSheet, ScrollView } from "react-native";

import Animated, { FadeInDown } from "react-native-reanimated";

import { useTranslation } from "react-i18next";

import { Ionicons } from "@expo/vector-icons";
import { StoryParams } from "@/types";

interface StoryCreationSummaryProps {
  onBackPress: () => void;
  formData: StoryParams;
}

export default function StoryCreationSummary({
  onBackPress,
  formData,
}: StoryCreationSummaryProps) {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.grid}>
        <Animated.View
          style={styles.gridItem}
          entering={FadeInDown.delay(100).springify()}
        >
          <Ionicons name="book" size={24} color="white" />
          <Text style={styles.label}>{t("summary-step-title")}</Text>
          <Text style={styles.text}>{formData.title}</Text>
        </Animated.View>

        <Animated.View
          style={styles.gridItem}
          entering={FadeInDown.delay(200).springify()}
        >
          <Ionicons name="person" size={24} color="white" />
          <Text style={styles.label}>{t("summary-step-main-character")}</Text>
          <Text style={styles.text}>{formData.mainCharacter}</Text>
        </Animated.View>

        <Animated.View
          style={styles.gridItem}
          entering={FadeInDown.delay(300).springify()}
        >
          <Ionicons name="star" size={24} color="white" />
          <Text style={styles.label}>{t("summary-step-character-traits")}</Text>
          <Text style={styles.text}>
            {formData.mainCharacterTraits.join(" ")}
          </Text>
        </Animated.View>

        <Animated.View
          style={styles.gridItem}
          entering={FadeInDown.delay(400).springify()}
        >
          <Ionicons name="heart" size={24} color="white" />
          <Text style={styles.label}>{t("summary-step-theme")}</Text>
          <Text style={styles.text}>{formData.theme}</Text>
        </Animated.View>

        <Animated.View
          style={styles.gridItem}
          entering={FadeInDown.delay(500).springify()}
        >
          <Ionicons name="location" size={24} color="white" />
          <Text style={styles.label}>{t("summary-step-setting")}</Text>
          <Text style={styles.text}>{formData.setting}</Text>
        </Animated.View>

        <Animated.View
          style={styles.gridItem}
          entering={FadeInDown.delay(600).springify()}
        >
          <Ionicons name="images" size={24} color="white" />
          <Text style={styles.label}>{t("summary-step-number-of-images")}</Text>
          <Text style={styles.text}>{formData.amountOfImages}</Text>
        </Animated.View>

        {formData.amountOfImages > 0 && (
          <Animated.View
            style={styles.gridItem}
            entering={FadeInDown.delay(700).springify()}
          >
            <>
              <Ionicons name="brush" size={24} color="white" />
              <Text style={styles.label}>{t("summary-step-image-style")}</Text>
              <Text style={styles.text}>{formData.imageStyle}</Text>
            </>
          </Animated.View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    paddingBottom: 20,
  },
  gridItem: {
    backgroundColor: "#333333",
    borderRadius: 12,
    padding: 15,
    width: "48%",
    alignItems: "center",
  },
  label: {
    color: "#999999",
    fontSize: 12,
    marginTop: 8,
  },
  text: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },
});
