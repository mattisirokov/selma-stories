import { StyleSheet, Text, TextInput as NativeInput } from "react-native";
import { KeyboardAvoidingView, Platform } from "react-native";

import Colors from "@/constants/Colors";

type TextInputProps = {
  label: string;
  placeholder: string;
  value: string;
  isLarge?: boolean;
  onChangeText: (text: string) => void;
};

export default function TextInput({
  label,
  placeholder,
  value,
  isLarge,
  onChangeText,
}: TextInputProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.label}>{label}</Text>
      <NativeInput
        style={isLarge ? styles.largeInput : styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.light.text,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.inputBorder,
    fontSize: 15,
    color: Colors.light.text,
  },
  largeInput: {
    width: "100%",
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.inputBorder,
    fontSize: 15,
    color: Colors.light.text,
  },
});
