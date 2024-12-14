import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import Animated, { FadeInDown } from "react-native-reanimated";
import Colors from "@/constants/Colors";
import React from "react";

type CreateStoryStepProps = {
  step: number;
  onPress: () => void;
  onBackPress: () => void;
  disabledNextButton?: boolean;
  title: string;
  helpText: string;
  highlightedText?: string;
  children: React.ReactNode;
};

export default function CreateStoryStep({
  step,
  onPress,
  onBackPress,
  disabledNextButton,
  title,
  highlightedText,
  helpText,
  children,
}: CreateStoryStepProps): JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View
          style={styles.header}
          entering={FadeInDown.delay(200).springify()}
        >
          <Text style={styles.stepIndicator}>Step {step}</Text>
          <Text style={styles.title}>
            {title.split(" ").map((word, index) => {
              if (highlightedText && word === highlightedText) {
                return (
                  <Text key={index} style={styles.highlightedText}>
                    {word}{" "}
                  </Text>
                );
              }
              return word + " ";
            })}
          </Text>
          <Text style={styles.helpText}>{helpText}</Text>
        </Animated.View>

        <Animated.View
          style={styles.content}
          entering={FadeInDown.delay(400).springify()}
        >
          <View style={styles.childrenContainer}>{children}</View>
        </Animated.View>

        <Animated.View
          style={styles.buttonContainer}
          entering={FadeInDown.delay(600).springify()}
        >
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              disabledNextButton ? styles.disabledNextButton : styles.nextButton
            }
            onPress={onPress}
            disabled={disabledNextButton}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  stepIndicator: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.light.tint,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  highlightedText: {
    fontWeight: "600",
    color: Colors.light.tint,
  },
  helpText: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.light.text,
    opacity: 0.5,
  },
  content: {
    flex: 1,
    marginVertical: 24,
  },
  childrenContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: "scroll",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  backButton: {
    flex: 1,
    marginRight: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.light.tint + "20",
    alignItems: "center",
  },
  nextButton: {
    flex: 1,
    marginLeft: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
  },
  disabledNextButton: {
    flex: 1,
    marginLeft: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.light.tint + "20",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.light.tint,
  },
  nextButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.light.background,
  },
});
