import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { useContext } from "react";
import { ToolieContext } from "@/context/ToolieContext";

export default function TabsLayout() {
 const toolieContext = useContext(ToolieContext);
 if (!toolieContext) {
   throw new Error("useContext must be used within a ContextProvider");
 }
 const { cart } = toolieContext;

 return (
   <Tabs
     screenOptions={{
        tabBarActiveTintColor: "#0066CC",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerShown: false,
      }}
   >
     <Tabs.Screen
       name="searchTool2"
       options={{
         title: "Feed",
         tabBarIcon: ({ color }) => (
           <FontAwesome name="home" size={24} color={color} />
         ),
       }}
     />
     <Tabs.Screen
       name="CartPage"
       options={{
         title: "Carrinho",
         tabBarIcon: ({ color }) => (
           <View>
             <FontAwesome name="shopping-cart" size={24} color={color} />
             {cart.size > 0 && (
               <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
                 <Text className="text-white text-xs font-bold">
                   {cart.size}
                 </Text>
               </View>
             )}
           </View>
         ),
       }}
     />
     <Tabs.Screen
       name="Profile"
       options={{
         title: "Perfil",
         tabBarIcon: ({ color }) => (
           <FontAwesome name="user" size={24} color={color} />
         ),
       }}
     />
   </Tabs>
 );
}