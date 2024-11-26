import React, { useContext, useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { ToolieContext } from "@/context/ToolieContext";
import toolsData from "./../assets/dataFerramentas.json";
import { router } from "expo-router";

const CartPage: React.FC = () => {
  const toolieContext = useContext(ToolieContext);
  if (!toolieContext) {
    throw new Error("useContext must be used within a ContextProvider");
  }
  const { cart, setCart } = toolieContext;
  const { address, setAddress } = toolieContext;
  const { deliveryCost, setDeliveryCost } = toolieContext; // Acesso ao endereço do contexto

  const { cep, setCep } = toolieContext; // Acesso ao CEP do contexto
  const [addressDisplay, setAddressDisplay] = useState("Insira o CEP");
  const [deliveryType, setDeliveryType] = useState<string>("retirar");

  const [isFetchingAddress, setIsFetchingAddress] = useState(false); // Estado para exibir carregamento

  useEffect(() => {
    if (cep) {
      fetchAddressByCep(cep);
    }
  }, [cep]);

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
      setDeliveryCost(15);
    } else {
      setDeliveryCost(0); // Entrega grátis
    }
  };

  // Função para buscar o endereço pelo CEP
  const fetchAddressByCep = async (inputCep: string) => {
    setIsFetchingAddress(true); // Mostra carregamento
    try {
      const sanitizedCep = inputCep.replace(/\D/g, ""); // Remove caracteres não numéricos
      if (sanitizedCep.length !== 8) {
        throw new Error("Insira um CEP válido (8 dígitos).");
      }

      const response = await fetch(
        `https://viacep.com.br/ws/${sanitizedCep}/json/`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar o endereço. Verifique o CEP.");
      }

      const data = await response.json();

      if (data.erro) {
        throw new Error("CEP não encontrado. Verifique o número.");
      }

      const rua = data.logradouro || "Rua não encontrada";
      const bairro = data.bairro || "Bairro não encontrado";

      setAddressDisplay(`${rua} - ${bairro}`);
      setAddress(`${rua} - ${bairro}`); // Atualiza no contexto
    } catch (error) {
      setAddressDisplay("Erro ao buscar o endereço.");
    } finally {
      setIsFetchingAddress(false); // Esconde carregamento
    }
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
          data={Array.from(cart) as number[]}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={{ paddingBottom: 15 }}
        />
      )}

      {cart.size > 0 && (
        <View className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Detalhes da Entrega
          </Text>

          {/* Entrada de CEP */}
          <TextInput
            placeholder="Informe seu CEP"
            value={cep}
            onChangeText={(value) => {
              setCep(value);
              fetchAddressByCep(value); // Busca o endereço ao alterar o CEP
            }}
            className="border-2 border-gray-300 rounded-lg p-2 mb-4"
            keyboardType="numeric"
          />

          {/* Exibição do endereço ou carregamento */}
          {isFetchingAddress ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Text className="text-gray-800 mb-4">{addressDisplay}</Text>
          )}

          {/* Tipos de entrega */}
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
              Entrega Amanhã (+{formatPrice(15)})
            </Text>
          </View>

          {/* Total */}
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
