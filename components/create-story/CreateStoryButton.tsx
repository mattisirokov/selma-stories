import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useAIStory } from "@/hooks/useAIStory";

export default function CreateStoryButton() {
  const { createStory } = useAIStory();

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          createStory(
            1,
            {
              title: "Matti's Adventure",
              theme: "adventure",
              mainCharacter: "Matti, a young boy",
              setting: "a ship sailing to a faraway land",
              targetAge: 5,
              moral: "Learn to be patient",
              length: "medium",
              language: "English",
            },
            {
              artStyle: "watercolor",
              colorScheme: "bright and cheerful",
              mood: "warm and friendly",
              focusElement: "Matti's face",
            }
          )
        }
      >
        <Text style={styles.text}>Create Story</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
