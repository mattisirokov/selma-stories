import { StyleSheet, Animated, TouchableOpacity } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";

interface LoadingStoryProps {
  storyLoadingState: "idle" | "loading" | "success" | "error";
  imagesLoadingState: "idle" | "loading" | "success" | "error";
}

export default function LoadingStory({
  storyLoadingState,
  imagesLoadingState,
}: LoadingStoryProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const textFadeAnim = useRef(new Animated.Value(1)).current;
  const [displayedText, setDisplayedText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  // Helper function to animate text changes
  const updateLoadingText = (newText: string) => {
    Animated.sequence([
      Animated.timing(textFadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      setDisplayedText(newText);
    }, 200);
  };

  useEffect(() => {
    // Initial fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    // Update loading text based on states
    if (storyLoadingState === "loading") {
      setShowButton(false);
      updateLoadingText("Creating your magical story... ✨");
    } else if (storyLoadingState === "success") {
      if (imagesLoadingState === "loading") {
        setShowButton(false);
        updateLoadingText("Drawing beautiful illustrations... 🎨");
      } else if (imagesLoadingState === "success") {
        updateLoadingText("Images created successfully! 🖼️");
        setTimeout(() => setShowButton(true), 500);
      } else if (imagesLoadingState === "error") {
        updateLoadingText(
          "Couldn't create the images, but your story is ready! 🎯"
        );
        setTimeout(() => setShowButton(true), 500);
      } else {
        updateLoadingText("Story created successfully! 📖");
        setTimeout(() => setShowButton(true), 500);
      }
    } else if (storyLoadingState === "error") {
      updateLoadingText("Oops! Something went wrong creating the story 😕");
      setTimeout(() => setShowButton(true), 500);
    }
  }, [storyLoadingState, imagesLoadingState]);

  useEffect(() => {
    if (storyLoadingState === "success" && imagesLoadingState === "success") {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          router.push("/");
        });
      }, 1500);
    }

    if (
      storyLoadingState === "error" ||
      (storyLoadingState === "success" && imagesLoadingState === "error")
    ) {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          router.push("/");
        });
      }, 2000);
    }
  }, [storyLoadingState, imagesLoadingState]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.Text style={[styles.text, { opacity: textFadeAnim }]}>
        {displayedText}
      </Animated.Text>
      {showButton && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            router.push("/my-stories");
          }}
        >
          <Animated.Text style={styles.nextButtonText}>
            Read Story
          </Animated.Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "white",
  },
  nextButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    width: 200,
  },
  nextButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.light.background,
  },
});
