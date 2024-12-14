import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

import Colors from "@/constants/Colors";

interface NumberSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function NumberSelector({
  value,
  onChange,
  min = 1,
  max = 9,
}: NumberSelectorProps) {
  const animatedValue = new Animated.Value(1);

  const handlePress = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      Animated.sequence([
        Animated.spring(animatedValue, {
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.spring(animatedValue, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();

      onChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress(value - 1)}
      >
        <Text style={styles.buttonText}>−</Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.numberContainer,
          { transform: [{ scale: animatedValue }] },
        ]}
      >
        <Text style={styles.number}>{value}</Text>
      </Animated.View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress(value + 1)}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  numberContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  number: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
});
