import React, { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { ToolieContext } from "@/context/ToolieContext";
import toolsData from "./../assets/dataFerramentas.json";
import { router, useRouter } from "expo-router";

const CartPage: React.FC = () => {
  const toolieContext = useContext(ToolieContext);
  if (!toolieContext) {
    throw new Error("useContext must be used within a ContextProvider");
  }
  const { cart, setCart } = toolieContext;
  const { address, setAddress } = toolieContext; // Acesso ao endereço do contexto

  // Estado para CEP e tipo de entrega
  const [cep, setCep] = useState(""); // Inicia com o CEP do contexto, se disponível
  const [deliveryType, setDeliveryType] = useState<string>("retirar");
  const [deliveryCost, setDeliveryCost] = useState<number>(0);
  const [addressInput, setAddressInput] = useState(""); // Estado para o campo de endereço

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
    router.push("/CheckoutPage"); // Redireciona para a página de checkout
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

  // Função para sortear valor de entrega "Amanhã"
  const handleDeliveryChange = (type: string) => {
    setDeliveryType(type);

    if (type === "amanha") {
      // Sorteia um valor entre 1 e 15
      const randomCost = Math.floor(Math.random() * 15) + 1;
      setDeliveryCost(randomCost);
    } else {
      setDeliveryCost(0); // Entrega grátis
    }
  };

  // Função para atualizar o endereço no contexto
  const handleAddressChange = (value: string) => {
    setAddress(value); // Atualiza o endereço no contexto
    setAddressInput(value); // Atualiza o valor local para o campo de entrada
  };

  // Função para calcular o total
  const total = useMemo(() => {
    const toolsTotal = Array.from(cart).reduce((acc, itemId) => {
      const tool = toolsData.find((tool) => tool.id === itemId);
      return tool ? acc + tool.precoAluguel : acc;
    }, 0);

    return toolsTotal + deliveryCost;
  }, [cart, deliveryCost]);

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
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
          contentContainerStyle={{ paddingBottom: 15 }}
        />
      )}

      {/* Detalhes da entrega aparecerão apenas após a renderização de todos os itens */}
      {cart.size > 0 && (
        <View className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Detalhes da Entrega
          </Text>

          {/* Caixa para inserir o CEP */}
          <TextInput
            placeholder="Informe seu CEP"
            value={cep}
            onChangeText={(value) => {
              setCep(value);
            }}
            className="border-2 border-gray-300 rounded-lg p-2 mb-4"
            keyboardType="numeric"
          />

          {/* Caixa para inserir o endereço */}
          <TextInput
            placeholder="Informe seu Endereço"
            value={addressInput}
            onChangeText={handleAddressChange} // Atualiza o endereço no contexto
            className="border-2 border-gray-300 rounded-lg p-2 mb-4"
          />

          {/* Tipos de entrega com Radio Buttons */}
          <Text className="font-semibold text-gray-700 mb-2">
            Escolha o tipo de entrega:
          </Text>

          <View className="flex-row items-center mb-4">
            <RadioButton
              color="#53A3FA"
              value="retirar"
              status={deliveryType === "retirar" ? "checked" : "unchecked"}
              onPress={() => handleDeliveryChange("retirar")}
            />
            <Text className="text-gray-800">Retirar no Local (Grátis)</Text>
          </View>

          <View className="flex-row items-center mb-4">
            <RadioButton
              color="#53A3FA"
              value="amanha"
              status={deliveryType === "amanha" ? "checked" : "unchecked"}
              onPress={() => handleDeliveryChange("amanha")}
            />
            <Text className="text-gray-800">
              Entrega Amanhã ({formatPrice(deliveryCost)})
            </Text>
          </View>

          {/* Exibição do total */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">Total</Text>
            <Text className="text-xl font-semibold text-gray-800">
              {formatPrice(total)}
            </Text>
          </View>

          {/* Botão de Finalizar */}
          <TouchableOpacity
            className="bg-green-500 py-3 rounded-2xl mt-4"
            onPress={handleProceedToCheckout}
          >
            <Text className="text-center text-white font-bold text-lg">
              Finalizar
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default CartPage;
