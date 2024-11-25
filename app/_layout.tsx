import { Stack } from "expo-router";
import "../global.css";
import ContextProvider from "@/context/ToolieContext";
import { ToolieContext } from "@/context/ToolieContext";
import React, { useContext } from "react";
import { Tabs } from "expo-router/tabs";

export default function RootLayout() {
  const toolieContext = useContext(ToolieContext);
  const username = toolieContext?.username || "";

  if (username === "") {
    return (
      <ContextProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Login", headerShown: false }}
          />
        </Stack>
      </ContextProvider>
    );
  }

  return (
    <ContextProvider>
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
    </ContextProvider>
  );
}
