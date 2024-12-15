import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Colors from "@/constants/Colors";

interface LoadingStoryProps {
  storyLoadingState: "idle" | "loading" | "success" | "error";
  imagesLoadingState: "idle" | "loading" | "success" | "error";
  numberOfImages: number;
  onReset: () => void;
}

export default function LoadingStory({
  storyLoadingState,
  imagesLoadingState,
  numberOfImages,
  onReset,
}: LoadingStoryProps) {
  // loading states for story
  const storyRenderingStages = () => {
    switch (storyLoadingState) {
      case "idle":
        return <Text style={styles.text}>Sharpening the pencils...</Text>;
      case "loading":
        return <Text style={styles.text}>Writing some more notes...</Text>;
      case "success":
        return <Text style={styles.text}>The plot has been created!</Text>;
      case "error":
        return <Text style={styles.text}>Oops, something went wrong</Text>;
      default:
        return <Text style={styles.text}>Loading...</Text>;
    }
  };

  // loading states for images
  const imageRenderingStages = () => {
    switch (imagesLoadingState) {
      case "idle":
        return (
          <Text style={styles.text}>Getting the pain brushed ready...</Text>
        );
      case "loading":
        return <Text style={styles.text}>Doing some picasso magic...</Text>;
      case "success":
        return (
          <Text style={styles.text}>Voila, the masterpiece is ready!</Text>
        );
      case "error":
        return <Text style={styles.text}>Oops, something went wrong</Text>;
      default:
        return <Text style={styles.text}>Loading...</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {numberOfImages > 0 ? (
          storyLoadingState === "success" &&
          imagesLoadingState === "success" ? (
            <>
              <Text style={styles.text}>Your story and images are ready!</Text>
              <TouchableOpacity style={styles.button} onPress={onReset}>
                <Text style={styles.buttonText}>Create Another Story</Text>
              </TouchableOpacity>
            </>
          ) : storyLoadingState !== "success" ? (
            storyRenderingStages()
          ) : (
            imageRenderingStages()
          )
        ) : storyLoadingState === "success" ? (
          <>
            <Text style={styles.text}>Your story is ready!</Text>
            <TouchableOpacity style={styles.button} onPress={onReset}>
              <Text style={styles.buttonText}>Create Another Story</Text>
            </TouchableOpacity>
          </>
        ) : (
          storyRenderingStages()
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  contentContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "white",
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
