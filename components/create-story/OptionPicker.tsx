import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import Animated, { FadeInUp, Layout } from "react-native-reanimated";

export default function OptionPicker({
  options,
  onSelect,
  selectedOptions,
  isSingleSelect,
}: {
  options: string[];
  onSelect: (options: string[]) => void;
  selectedOptions: string[];
  isSingleSelect: boolean;
}) {
  const toggleOption = (label: string) => {
    let newSelectedOptions: string[];
    if (selectedOptions.includes(label)) {
      newSelectedOptions = selectedOptions.filter((option) => option !== label);
    } else {
      if (isSingleSelect) {
        newSelectedOptions = [label];
      } else {
        newSelectedOptions = [...selectedOptions, label];
      }
    }
    onSelect(newSelectedOptions);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.bubblesContainer}>
        {options.map((option, index) => (
          <Animated.View
            key={option}
            entering={FadeInUp.delay(index * 100)}
            layout={Layout.springify()}
          >
            <TouchableOpacity
              onPress={() => toggleOption(option)}
              style={[
                styles.bubble,
                selectedOptions.includes(option) && styles.selectedBubble,
              ]}
            >
              <Text
                style={[
                  styles.bubbleText,
                  selectedOptions.includes(option) && styles.selectedBubbleText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    height: "100%",
  },
  scrollContent: {
    flexGrow: 1,
  },
  bubblesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 11,
  },
  bubble: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 100,
    marginBottom: 10,
    elevation: 2,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedBubble: {
    transform: [{ scale: 1.1 }],
    backgroundColor: "#6BCB77",
  },
  bubbleText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "600",
  },
  selectedBubbleText: {
    color: "#fff",
  },
  selectedCount: {
    marginTop: 20,
    alignItems: "center",
  },
  selectedCountText: {
    fontSize: 16,
    color: "#666",
  },
});
