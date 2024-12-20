import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";

import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";
import { useTranslation } from "react-i18next";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: useClientOnlyValue(false, true),
        tabBarIconStyle: { marginBottom: 4 },
        tabBarLabelStyle: { marginTop: 4 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="create-story"
        options={{
          title: t("create-story"),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus-circle" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="my-stories"
        options={{
          title: t("my-stories"),
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
