import { Stack } from "expo-router";
import "../global.css";
import ContextProvider from "@/context/ToolieContext";

export default function RootLayout() {
  return (
    <ContextProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen name="about" options={{ title: "About" }} />
        <Stack.Screen
          name="productDetails"
          options={{ title: "product-details" }}
        />
        <Stack.Screen name="searchTool" options={{ title: "Search Tool" }} />
        <Stack.Screen name="searchTool2" options={{ title: "Search Tool" }} />
        <Stack.Screen name="feedScreen" options={{ title: "Feed" }} />
      </Stack>
    </ContextProvider>
  );
}
