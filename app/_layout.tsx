// app/_layout.tsx
import { Stack } from "expo-router";
import "../global.css";
import ContextProvider from "@/context/ToolieContext";
import { ToolieContext } from "@/context/ToolieContext";
import React, { useContext } from "react";
import { Tabs } from "expo-router/tabs";
import { FontAwesome } from "@expo/vector-icons";
import TabsLayout from "./(tabs)/_layout";

export default function RootLayout() {
  return (
    <ContextProvider>
      <RootLayoutContent />
    </ContextProvider>
  );
}

function RootLayoutContent() {
  const toolieContext = useContext(ToolieContext);
  const isAuthenticated = toolieContext?.isAuthenticated || false;

  if (!isAuthenticated) {
    return (
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Login", headerShown: false }}
        />
      </Stack>
    );
  }

  return (
    <TabsLayout />
   
  );
}