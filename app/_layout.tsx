// app/_layout.tsx
import { Stack } from "expo-router";
import "../global.css";
import ContextProvider from "@/context/ToolieContext";
import { ToolieContext } from "@/context/ToolieContext";
import React, { useContext } from "react";

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

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="index" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}