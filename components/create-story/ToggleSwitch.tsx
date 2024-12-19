import { View, Text, Switch, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

type ToggleSwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
};

export default function ToggleSwitch({
  value,
  onChange,
  label,
}: ToggleSwitchProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={(value) => onChange(value)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.light.text,
    marginBottom: 8,
  },
});
