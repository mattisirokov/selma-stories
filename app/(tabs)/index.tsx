import { Text, StyleSheet } from "react-native";
import HomeLayout from "@/components/home/HomeLayout";

export default function TabOneScreen() {
  return (
    <HomeLayout>
      <Text style={styles.text}>Welcome to the home page</Text>
    </HomeLayout>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
});
