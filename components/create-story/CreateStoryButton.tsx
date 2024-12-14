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
            2,
            {
              title: "Matti and Selma's Tarina",
              theme: "adventure",
              mainCharacter: "Selma and Matti, two young friends",
              setting: "a far away desert with a lot of sand",
              targetAge: 5, // they can all be 5
              moral: "It's always good to learn TypeScript",
              length: "medium", // they can all be medium
              language: "Finnish", // they can all be Finnish
            },
            {
              artStyle: "watercolor",
              colorScheme: "bright and cheerful",
              mood: "warm and friendly",
              focusElement: "Matti and Selma",
            }
          )
        }
      >
        <Text style={styles.text}>Create a new story</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    alignSelf: "center",
    marginTop: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
