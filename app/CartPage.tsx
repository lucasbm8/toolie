import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { ToolieContext } from "@/context/ToolieContext";
import toolsData from "./../assets/dataFerramentas.json";
import { useRouter } from "expo-router";

const CartPage: React.FC = () => {
  const { cart, setCart } = useContext(ToolieContext);
  const router = useRouter();

  // Função para formatar preço
  const formatPrice = (price: number): string => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Função para remover item do carrinho
  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart: Set<number>) => {
      const newCart = new Set(prevCart);
      newCart.delete(id);
      return newCart;
    });
  };

  // Função para redirecionar para a página de checkout
  const handleProceedToCheckout = () => {
    // router.push("/checkout"); // Redireciona para a página de checkout
  };

  // Função para renderizar cada item no carrinho
  const renderCartItem = ({ item }: { item: number }) => {
    const tool = toolsData.find((tool) => tool.id === item);

    if (!tool) return null;

    return (
      <View className="flex-row items-center bg-gray-50 p-4 mb-4 rounded-lg shadow-sm">
        {tool.fotosURL && tool.fotosURL.length > 0 && (
          <Image
            source={{ uri: tool.fotosURL[0] }}
            className="w-16 h-16 rounded-lg mr-4"
            resizeMode="cover"
          />
        )}
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-800">
            {tool.tipoFerramenta}
          </Text>
          <Text className="text-gray-600 mt-1">{tool.descricao}</Text>
          <Text className="text-lg text-gray-800 mt-2">
            {formatPrice(tool.precoAluguel)}/dia
          </Text>
        </View>
        <TouchableOpacity
          className="bg-red-500 px-4 py-2 rounded-lg"
          onPress={() => handleRemoveFromCart(tool.id)}
        >
          <Text className="text-white font-bold">Remover</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Carrinho de Compras
      </Text>

      {cart.size === 0 ? (
        <Text className="text-center text-gray-500">
          Seu carrinho está vazio
        </Text>
      ) : (
        <FlatList
          data={Array.from(cart) as number[]} // Aqui é feita a tipagem explícita
          renderItem={renderCartItem}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      {/* Botão de Checkout */}
      {cart.size > 0 && (
        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-2xl mt-4"
          onPress={handleProceedToCheckout}
        >
          <Text className="text-center text-white font-bold text-lg">
            Finalizar Compra
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CartPage;
