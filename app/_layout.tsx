import { Stack } from "expo-router";
import "../global.css";
import ContextProvider from "@/context/ToolieContext";
import { ToolieContext } from "@/context/ToolieContext";
import React, { useContext } from "react";
import { Tabs } from "expo-router/tabs";
import LoginComponent from "@/components/LoginComponent";

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
       <LoginComponent />
      </Stack>
    );
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="feedScreen"
        options={{ title: "Feed", headerShown: false }}
      />
      <Tabs.Screen
        name="CartPage"
        options={{ title: "Cart", headerShown: false }}
      />
    </Tabs>
  );
}