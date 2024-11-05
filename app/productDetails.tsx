import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

const ProductDetailsPage = () => {
  const router = useRouter();

  // Dados de exemplo do produto
  const product = {
    images: [
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
    ],
    rating: 4.5,
    price: 99.99,
    description:
      "Este é um produto incrível com muitos recursos interessantes.",
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Carrossel de imagens */}
      <View className="h-56">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-1"
        >
          {product.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              className="h-56 w-full object-cover"
            />
          ))}
        </ScrollView>
      </View>

      {/* Detalhes do produto */}
      <View className="px-6 py-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold">
            {product.rating.toFixed(1)}
          </Text>
          <View className="flex-row space-x-1 items-center">
            <Feather name="star" size={20} color="#FBAB07" />
            <Text className="text-gray-500">{product.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text className="text-4xl font-bold mt-2">
          R$ {product.price.toFixed(2)}
        </Text>
        <Text className="text-gray-600 mt-4">{product.description}</Text>
      </View>

      {/* Botões de ação */}
      <View className="px-6 py-4 flex-row space-x-4">
        <TouchableOpacity className="bg-blue-500 flex-1 py-3 rounded-2xl">
          <Text className="text-center text-white font-bold">
            Adicionar ao carrinho
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 flex-1 py-3 rounded-2xl">
          <Text className="text-center font-bold">Alugar agora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetailsPage;
