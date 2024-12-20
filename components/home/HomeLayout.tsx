import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import Colors from "@/constants/Colors";
import FeatherIcon from "@expo/vector-icons/Feather";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <Text style={styles.greetingTitle}>Hello, Selma!</Text>
          <Text style={styles.greetingText}>You have 3 lectures today</Text>
        </View>
        <View style={styles.search}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9695b0"
            style={styles.searchInput}
          />
          <View style={styles.searchFloating}>
            <TouchableOpacity>
              <View style={styles.searchButton}>
                <FeatherIcon
                  name="search"
                  size={20}
                  color={Colors.light.text}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>Created stories</Text>
          <TouchableOpacity>
            <Text style={styles.contentLink}>Create a story</Text>
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
  /** Greeting */
  greeting: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.15)",
    marginBottom: 12,
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
  /** Search */
  search: {
    position: "relative",
  },
  searchInput: {
    height: 56,
    backgroundColor: "#f3f3f6",
    paddingHorizontal: 16,
    color: Colors.light.text,
    fontSize: 18,
    borderRadius: 9999,
  },
  searchFloating: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  searchButton: {
    alignSelf: "center",
    width: 44,
    height: 44,
    borderRadius: 9999,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
  },
  /** Content */
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
    borderStyle: "dashed",
    borderWidth: 4,
    borderColor: "#bada55",
    flex: 1,
    borderRadius: 8,
  },
});
