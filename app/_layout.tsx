import { useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";

import { useColorScheme } from "@/components/useColorScheme";
import { useFonts } from "expo-font";

import FontAwesome from "@expo/vector-icons/FontAwesome";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="story/[id]"
          options={{
            headerShown: false,
            headerBackTitle: "Back",
            headerTitle: "Story",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
