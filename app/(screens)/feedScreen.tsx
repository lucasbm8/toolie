import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const params = useLocalSearchParams();
const userId = params.id;

const FeedScreen = () => {
  const router = useRouter(); // Usando o hook useRouter para navegação

  // Função para redirecionar para a página de busca
  const handleCardPress = () => {
    router.push("../searchTool2");
    console.log("userId: ", userId);
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Feed de Serviços</Text>

      {/* ScrollView para permitir rolagem na tela */}
      <ScrollView>
        {/* Card Construção */}
        <TouchableOpacity
          className="mb-4 p-4 bg-gray-200 rounded-lg shadow-lg"
          onPress={handleCardPress} // Adicionando a função de navegação
        >
          <Image
            source={{ uri: "../assets/images/ferramentas.png" }} // Substitua com o link da imagem
            style={{ width: "100%", height: 200, borderRadius: 8 }}
          />
          <Text className="mt-2 text-xl font-semibold">Construção</Text>
          <Text className="mt-1 text-gray-600">
            Encontre serviços de construção para seu projeto.
          </Text>
        </TouchableOpacity>

        {/* Card Jardinagem */}
        <TouchableOpacity
          className="mb-4 p-4 bg-green-200 rounded-lg shadow-lg"
          onPress={handleCardPress} // Adicionando a função de navegação
        >
          <Image
            source={{ uri: "../assets/images/jardinagem.png" }} // Substitua com o link da imagem
            style={{ width: "100%", height: 200, borderRadius: 8 }}
          />
          <Text className="mt-2 text-xl font-semibold">Jardinagem</Text>
          <Text className="mt-1 text-gray-600">
            Descubra serviços de jardinagem e paisagismo.
          </Text>
        </TouchableOpacity>

        {/* Card Eletricista */}
        <TouchableOpacity
          className="mb-4 p-4 bg-yellow-200 rounded-lg shadow-lg"
          onPress={handleCardPress} // Adicionando a função de navegação
        >
          <Image
            source={{ uri: "../assets/images/eletricista.png" }} // Substitua com o link da imagem
            style={{ width: "100%", height: 200, borderRadius: 8 }}
          />
          <Text className="mt-2 text-xl font-semibold">Eletricista</Text>
          <Text className="mt-1 text-gray-600">
            Encontre profissionais para serviços elétricos.
          </Text>
        </TouchableOpacity>

        {/* Card Encanamento */}
        <TouchableOpacity
          className="mb-4 p-4 bg-blue-200 rounded-lg shadow-lg"
          onPress={handleCardPress} // Adicionando a função de navegação
        >
          <Image
            source={{ uri: "../assets/images/encanamento.png" }} // Substitua com o link da imagem
            style={{ width: "100%", height: 200, borderRadius: 8 }}
          />
          <Text className="mt-2 text-xl font-semibold">Encanamento</Text>
          <Text className="mt-1 text-gray-600">
            Serviços de encanamento para sua residência ou empresa.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default FeedScreen;
