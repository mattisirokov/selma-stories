import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

import Colors from "@/constants/Colors";
import FeatherIcon from "@expo/vector-icons/Feather";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              alt=""
              source={{
                uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <FeatherIcon color={Colors.light.text} name="bell" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>{t("welcome")}, Selma!</Text>
          <Text style={styles.greetingText}>{t("welcome-long-text")}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>{t("welcome-page-header")}</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/create-story")}>
            <Text style={styles.contentLink}>{t("welcome-page-cta")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentPlaceholder}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
  },
  top: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  greeting: {
    paddingVertical: 16,
    marginBottom: 6,
  },
  greetingTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.light.text,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.text,
    marginTop: 8,
  },
  content: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.light.text,
  },
  contentLink: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },
  contentPlaceholder: {
    flex: 1,
    borderRadius: 8,
  },
});
