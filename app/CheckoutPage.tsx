import React, { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ToolieContext } from "@/context/ToolieContext";
import toolsData from "./../assets/dataFerramentas.json";
import { useRouter } from "expo-router";
import ConfirmationPage from "./ConfirmationPage";

const CheckoutPage: React.FC = () => {
  const toolieContext = useContext(ToolieContext);
  if (!toolieContext) {
    throw new Error("useContext must be used within a ContextProvider");
  }
  const { cart, address } = toolieContext;
  const router = useRouter();

  // Estado para as datas de aluguel
  const [startDate, setStartDate] = useState<string>(""); // Data de início no formato string
  const [endDate, setEndDate] = useState<string>(""); // Data de fim no formato string
  const [paymentMethod, setPaymentMethod] = useState<string>(""); // Método de pagamento

  // Função para formatar preço
  const formatPrice = (price: number): string => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Função para calcular o total com base na quantidade de dias
  const calculateTotal = useMemo(() => {
    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    if (!startDate || !endDate || startDate.length < 10 || endDate.length < 10) {
      return 0;
    }

    const start = parseDate(startDate);
    const end = parseDate(endDate);

    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));

    const toolsTotal = Array.from(cart).reduce((acc, itemId) => {
      const tool = toolsData.find((tool) => tool.id === itemId);
      return tool ? acc + tool.precoAluguel * days : acc;
    }, 0);

    return toolsTotal;
  }, [cart, startDate, endDate]);

  // Função para atualizar a data e adicionar "/" automaticamente
  const handleDateInput = (date: string, setDate: (value: string) => void) => {
    let formattedDate = date.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (formattedDate.length > 2) {
      formattedDate = formattedDate.slice(0, 2) + "/" + formattedDate.slice(2);
    }
    if (formattedDate.length > 5) {
      formattedDate = formattedDate.slice(0, 5) + "/" + formattedDate.slice(5, 9);
    }
    setDate(formattedDate);
  };

  // Função para renderizar cada item no resumo
  const renderCartItem = ({ item }: { item: number }) => {
    const tool = toolsData.find((tool) => tool.id === item);

    if (!tool) return null;

    return (
      <View className="bg-white p-4 rounded-lg mb-4" style={{ shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 }}>
        <Image
          source={{ uri: tool.fotosURL[0] }}
          className="w-24 h-24 rounded-lg mb-4"
          resizeMode="cover"
        />
        <Text className="text-lg font-bold text-gray-800">
          {tool.tipoFerramenta}
        </Text>
        <Text className="text-gray-600">
          {formatPrice(tool.precoAluguel)}/dia
        </Text>
      </View>
    );
  };

  // Função para redirecionar para a tela de confirmação
  const handleConfirmRental = () => {
    router.push("/ConfirmationPage"); // Redireciona para a tela de confirmação
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Resumo da Compra
      </Text>

      <FlatList
        data={Array.from(cart) as number[]}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={{ paddingBottom: 15 }}
      />

      {/* Seletores de data */}
      <View className="bg-white p-4 rounded-lg mb-6" style={{ shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 }}>
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Data de Início
        </Text>
        <TextInput
          value={startDate}
          onChangeText={(text) => handleDateInput(text, setStartDate)}
          keyboardType="numeric"
          placeholder="DD/MM/AAAA"
          maxLength={10}
          className="border-2 border-gray-300 rounded-lg p-2 mb-4"
        />

        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Data de Fim
        </Text>
        <TextInput
          value={endDate}
          onChangeText={(text) => handleDateInput(text, setEndDate)}
          keyboardType="numeric"
          placeholder="DD/MM/AAAA"
          maxLength={10}
          className="border-2 border-gray-300 rounded-lg p-2 mb-4"
        />
      </View>

      {/* Box de quantidade de dias */}
      <View className="bg-white p-4 rounded-lg mb-6" style={{ shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 }}>
        <Text className="text-lg font-semibold text-gray-800">
          Quantidade de Dias
        </Text>
        <Text className="text-xl text-gray-800">
          {startDate && endDate && startDate.length === 10 && endDate.length === 10
            ? Math.ceil(
                (new Date(endDate.split("/").reverse().join("-")).getTime() -
                  new Date(startDate.split("/").reverse().join("-")).getTime()) /
                  (1000 * 3600 * 24)
              ) + " dias"
            : "Selecione as datas"}
        </Text>
      </View>

      {/* Box de endereço */}
      <View className="bg-white p-4 rounded-lg mb-6" style={{ shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 }}>
        <Text className="text-lg font-semibold text-gray-800">
          Endereço de Entrega
        </Text>
        <Text className="text-xl text-gray-800">
          {address || "Não informado"}
        </Text>
      </View>

      {/* Box de detalhes de pagamento */}
      <View className="bg-white p-4 rounded-lg mb-6" style={{ shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 }}>
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Detalhes do Pagamento
        </Text>

        {/* Botões de pagamento */}
        <View className="space-y-3">
          <TouchableOpacity
            className={`w-full py-3 rounded-md border-2 items-center ${
              paymentMethod === "credit-card" ? "bg-green-500 border-green-600" : "bg-gray-200 border-gray-300"
            }`}
            onPress={() => setPaymentMethod("credit-card")}
          >
            <Text
              className={`text-sm font-medium ${
                paymentMethod === "credit-card" ? "text-white" : "text-gray-700"
              }`}
            >
              Cartão de Crédito
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`w-full py-3 rounded-md border-2 items-center ${
              paymentMethod === "google-pay" ? "bg-green-500 border-green-600" : "bg-gray-200 border-gray-300"
            }`}
            onPress={() => setPaymentMethod("google-pay")}
          >
            <Text
              className={`text-sm font-medium ${
                paymentMethod === "google-pay" ? "text-white" : "text-gray-700"
              }`}
            >
              Google Pay
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`w-full py-3 rounded-md border-2 items-center ${
              paymentMethod === "paypal" ? "bg-green-500 border-green-600" : "bg-gray-200 border-gray-300"
            }`}
            onPress={() => setPaymentMethod("paypal")}
          >
            <Text
              className={`text-sm font-medium ${
                paymentMethod === "paypal" ? "text-white" : "text-gray-700"
              }`}
            >
              PayPal
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Exibindo o Total */}
      <View className="bg-white p-4 rounded-lg mb-6" style={{ shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 }}>
        <Text className="text-lg font-semibold text-gray-800">
          Total
        </Text>
        <Text className="text-xl text-gray-800">
          {formatPrice(calculateTotal)}
        </Text>
      </View>

      {/* Botão de Confirmar Aluguel */}
      <View className="w-full px-4 pb-6">
        <TouchableOpacity
          className="py-4 rounded-2xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 flex justify-center items-center"
          onPress={handleConfirmRental}
        >
          <Text className="text-white text-lg font-bold tracking-wide">
            Confirmar Aluguel
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CheckoutPage;
