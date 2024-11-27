// app/Profile.tsx
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ToolieContext } from '@/context/ToolieContext';
import { FontAwesome } from "@expo/vector-icons";
import { Stack, Tabs } from 'expo-router';

export default function Profile() {
  const router = useRouter();
  const context = useContext(ToolieContext);
  
  if (!context) {
    throw new Error("Context must be used within provider");
  }

  const { username, setUsername, setIsAuthenticated, setCart, setAddress } = context;

  const handleLogout = () => {
    setUsername('');
    setIsAuthenticated(false);
    setCart(new Set());
    setAddress('');
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="items-center mb-8 mt-12">
        <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center mb-4">
          <FontAwesome name="user" size={40} color="#666" />
        </View>
        <Text className="text-xl font-bold">{username}</Text>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 py-4 px-6 rounded-xl mt-auto mb-8"
      >
        <Text className="text-white text-center font-bold">Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

// Atualização do _layout.tsx para incluir o Profile
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
      <Tabs.Screen
        name="checkoutPage"
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' }
        }}
      />
      <Tabs.Screen
        name="searchTool"
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' }
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' }
        }}
      />
    </Tabs>
  );
}