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
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "react-native-calendars";

const CheckoutPage: React.FC = () => {
  const toolieContext = useContext(ToolieContext);
  if (!toolieContext) {
    throw new Error("useContext must be used within a ContextProvider");
  }
  const { cart, address } = toolieContext;
  const router = useRouter();

  // Estado para as datas de aluguel
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState<string>(""); // Para armazenar o método de pagamento
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Função para formatar preço
  const formatPrice = (price: number): string => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Função para calcular o total com base na quantidade de dias
  const calculateTotal = useMemo(() => {
    const days =
      endDate && startDate
        ? Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
          )
        : 0;
    const toolsTotal = Array.from(cart).reduce((acc, itemId) => {
      const tool = toolsData.find((tool) => tool.id === itemId);
      return tool ? acc + tool.precoAluguel * days : acc;
    }, 0);

    return toolsTotal;
  }, [cart, startDate, endDate]);

  // Função para manipular a data de início
  const handleStartDateChange = (
    event: any,
    selectedDate: Date | undefined
  ) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  // Função para manipular a data de fim
  const handleEndDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  // Função para redirecionar para a página de confirmação
  const handleConfirmRental = () => {
    // router.push("/confirmation"); // Página de confirmação
  };

  // Função para renderizar cada item no resumo
  const renderCartItem = ({ item }: { item: number }) => {
    const tool = toolsData.find((tool) => tool.id === item);

    if (!tool) return null;

    return (
      <View className="bg-white p-4 rounded-lg shadow-md mb-4">
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

  // Função para formatação de datas com Intl.DateTimeFormat
  const formatDate = (date: Date) => {
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formatter.format(date);
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
      <View className="bg-white p-4 rounded-lg shadow-md mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Data de Início
        </Text>
        <TouchableOpacity
          onPress={() => setShowStartDatePicker(true)}
          className="border-2 border-gray-300 rounded-lg p-2 mb-4"
        >
          <Text>
            {startDate ? formatDate(startDate) : "Selecione a data de início"}
          </Text>
        </TouchableOpacity>

        {showStartDatePicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={handleStartDateChange}
          />
        )}

        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Data de Fim
        </Text>
        <TouchableOpacity
          onPress={() => setShowEndDatePicker(true)}
          className="border-2 border-gray-300 rounded-lg p-2 mb-4"
        >
          <Text>
            {endDate ? formatDate(endDate) : "Selecione a data de fim"}
          </Text>
        </TouchableOpacity>

        {showEndDatePicker && (
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            display="default"
            onChange={handleEndDateChange}
          />
        )}
      </View>

      {/* Box de quantidade de dias */}
      <View className="bg-white p-4 rounded-lg shadow-md mb-6">
        <Text className="text-lg font-semibold text-gray-800">
          Quantidade de Dias
        </Text>
        <Text className="text-xl text-gray-800">
          {startDate && endDate
            ? Math.ceil(
                (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
              ) + " dias"
            : "Selecione as datas"}
        </Text>
      </View>

      {/* Box de endereço */}
      <View className="bg-white p-4 rounded-lg shadow-md mb-6">
        <Text className="text-lg font-semibold text-gray-800">
          Endereço de Entrega
        </Text>
        <Text className="text-xl text-gray-800">
          {address || "Não informado"}
        </Text>
      </View>

      {/* Box de detalhes de pagamento */}
      <View className="bg-white p-4 rounded-lg shadow-md mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Detalhes do Pagamento
        </Text>

        {/* Opções de pagamento (visuais) */}
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            className="bg-gray-300 w-16 h-16 rounded-lg mr-4 flex justify-center items-center"
            onPress={() => setPaymentMethod("credit-card")}
          >
            <Text className="text-center text-white">CC</Text>
          </TouchableOpacity>
          <Text className="text-gray-800">Cartão de Crédito</Text>
        </View>

        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            className="bg-gray-300 w-16 h-16 rounded-lg mr-4 flex justify-center items-center"
            onPress={() => setPaymentMethod("google-pay")}
          >
            <Text className="text-center text-white">GP</Text>
          </TouchableOpacity>
          <Text className="text-gray-800">Google Pay</Text>
        </View>

        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            className="bg-gray-300 w-16 h-16 rounded-lg mr-4 flex justify-center items-center"
            onPress={() => setPaymentMethod("paypal")}
          >
            <Text className="text-center text-white">PP</Text>
          </TouchableOpacity>
          <Text className="text-gray-800">PayPal</Text>
        </View>
      </View>

      <View className="border-t border-gray-200 bg-white p-4">
        <TouchableOpacity
         
         
        >
          <Text className="text-blue text-center font-bold text-lg">
            Confirmar Aluguel
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CheckoutPage;
