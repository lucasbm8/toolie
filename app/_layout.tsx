// app/_layout.tsx
import { Stack } from "expo-router";
import "../global.css";
import ContextProvider from "@/context/ToolieContext";
import { ToolieContext } from "@/context/ToolieContext";
import React, { useContext } from "react";
import { Tabs } from "expo-router/tabs";
import { FontAwesome } from "@expo/vector-icons";

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
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0066CC',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarButton: undefined,
      }}
    >
      <Tabs.Screen
        name="feedScreen"
        options={{
          title: "Feed",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="CartPage"
        options={{
          title: "Carrinho",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-cart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
      {['CheckoutPage', 'searchTool', 'searchTool2', 'index'].map((name) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarButton: () => null,
            tabBarStyle: { display: 'none' },
          }}
        />
      ))}
    </Tabs>
  );
}