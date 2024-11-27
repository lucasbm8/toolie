import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ToolieContext } from '@/context/ToolieContext';
import { FontAwesome } from "@expo/vector-icons";

export default function Profile() {
 const router = useRouter();
 const context = useContext(ToolieContext);
 
 if (!context) {
   throw new Error("Context must be used within provider");
 }

 const { 
   username, 
   setUsername, 
   setIsAuthenticated, 
   setCart, 
   setAddress,
   address,
   cep,
   setCep,
 } = context;

 const handleLogout = () => {
   setUsername('');
   setIsAuthenticated(false);
   setCart(new Set());
   setAddress('');
   setCep('');
   router.replace('/');
 };

 return (
   <ScrollView className="flex-1 bg-white">
     <View className="items-center py-8 bg-blue-50">
       <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4 shadow-md">
         <FontAwesome name="user" size={40} color="#3B82F6" />
       </View>
       <Text className="text-xl font-bold text-gray-800">{username}</Text>
       <Text className="text-gray-500 mt-1">Usuário</Text>
     </View>

     <View className="p-6">
       <View className="bg-white rounded-xl shadow-sm p-4 mb-4">
         <Text className="text-lg font-bold mb-4">Informações Pessoais</Text>
         
         <View className="mb-4">
           <Text className="text-gray-500 text-sm mb-1">Endereço</Text>
           <Text className="text-gray-800">{address || 'Não informado'}</Text>
         </View>

         <View className="mb-4">
           <Text className="text-gray-500 text-sm mb-1">CEP</Text>
           <Text className="text-gray-800">{cep || 'Não informado'}</Text>
         </View>
       </View>

       <TouchableOpacity
         onPress={() => {/* Adicione navegação para edição de perfil */}}
         className="bg-blue-500 py-4 px-6 rounded-xl mb-4"
       >
         <Text className="text-white text-center font-bold">Editar Perfil</Text>
       </TouchableOpacity>

       <TouchableOpacity
         onPress={handleLogout}
         className="bg-red-500 py-4 px-6 rounded-xl"
       >
         <Text className="text-white text-center font-bold">Sair</Text>
       </TouchableOpacity>
     </View>
   </ScrollView>
 );
}