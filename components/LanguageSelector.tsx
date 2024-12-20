import { View, Text, Switch, StyleSheet } from "react-native";

import { useTranslation } from "react-i18next";

import Colors from "@/constants/Colors";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const toggleLanguage = (value: boolean) => {
    i18n.changeLanguage(value ? "fi" : "en");
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>EN</Text>
        <Switch
          value={i18n.language === "fi"}
          onValueChange={toggleLanguage}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={i18n.language === "fi" ? "#007AFF" : "#f4f3f4"}
        />
        <Text style={styles.label}>FI</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.light.text,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: Colors.light.text,
  },
});
