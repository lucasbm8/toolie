// FiltersPage.tsx
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Switch } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { ToolieContext } from "@/context/ToolieContext";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

const FiltersPage: React.FC = () => {
  const toolieContext = useContext(ToolieContext);
  if (!toolieContext) {
    throw new Error("useContext must be used within a ContextProvider");
  }
  const { filters, setFilters } = toolieContext;

  const estadosDeUso = ["Novo", "Usado", "Seminovo"];
  const condicoesDeUso = ["Excelente", "Bom", "Regular"];
  const categories = ["Construção", "Jardinagem", "Elétrica", "Encanamento"];

  const toggleEstadoDeUso = (estado: string) => {
    setFilters((prev) => ({
      ...prev,
      estadoDeUso: prev.estadoDeUso.includes(estado)
        ? prev.estadoDeUso.filter((e) => e !== estado)
        : [...prev.estadoDeUso, estado],
    }));
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleCondicaoDeUso = (condicao: string) => {
    setFilters((prev) => ({
      ...prev,
      condicoesDeUso: prev.condicoesDeUso.includes(condicao)
        ? prev.condicoesDeUso.filter((c) => c !== condicao)
        : [...prev.condicoesDeUso, condicao],
    }));
  };

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="p-4 flex-row items-center border-b border-gray-300 shadow-md">
        <TouchableOpacity onPress={() => router.push("../searchTool2")}>
          <ChevronLeft size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-4">Filtros</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Estado de Uso */}
        <View className="mb-6">
          <Text className="text-lg font-bold mb-3">Estado de Uso</Text>
          <View className="flex-row flex-wrap gap-2">
            {estadosDeUso.map((estado) => (
              <TouchableOpacity
                key={estado}
                onPress={() => toggleEstadoDeUso(estado)}
                className={`px-4 py-2 rounded-full border shadow-md ${
                  filters.estadoDeUso.includes(estado) ? "" : "border-gray-300"
                }`}
              >
                <Text className="font-medium">{estado}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preço */}
        <View className="mb-6">
          <Text className="text-lg font-bold mb-3">Faixa de Preço</Text>
          <Slider
            value={[filters.precoMin, filters.precoMax]}
            minimumValue={0}
            maximumValue={1000}
            step={10}
            onValueChange={(values) =>
              setFilters((prev) => ({
                ...prev,
                precoMin: values[0],
                precoMax: values[1],
              }))
            }
          />
          <View className="flex-row justify-between mt-2">
            <Text>R$ {filters.precoMin}</Text>
            <Text>R$ {filters.precoMax}</Text>
          </View>
        </View>

        {/* Rating Mínimo */}
        <View className="mb-6">
          <Text className="text-lg font-bold mb-3">Avaliação Mínima</Text>
          <Slider
            value={filters.rating}
            minimumValue={0}
            maximumValue={5}
            step={1}
            onValueChange={([value]) =>
              setFilters((prev) => ({ ...prev, rating: value }))
            }
          />
          <View className="flex-row items-center mt-2">
            <Text>{filters.rating} estrelas ou mais</Text>
          </View>
        </View>

        {/* Categorias */}
        <View className="mb-6">
          <Text className="text-lg font-bold mb-3">Categorias</Text>
          <View className="flex-row flex-wrap gap-2">
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-full border shadow-md ${
                  filters.categories.includes(category) ? "" : "border-gray-300"
                }`}
              >
                <Text className="font-medium">{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Condições de Uso */}
        <View className="mb-6">
          <Text className="text-lg font-bold mb-3">Condições de Uso</Text>
          <View className="flex-row flex-wrap gap-2">
            {condicoesDeUso.map((condicao) => (
              <TouchableOpacity
                key={condicao}
                onPress={() => toggleCondicaoDeUso(condicao)}
                className={`px-4 py-2 rounded-full border shadow-md ${
                  filters.condicoesDeUso.includes(condicao)
                    ? ""
                    : "border-gray-300"
                }`}
              >
                <Text className="font-medium">{condicao}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Botões de Ação */}
      <View className="p-4 border-t border-gray-300 shadow-lg">
        <TouchableOpacity
          onPress={() =>
            setFilters({
              estadoDeUso: [],
              precoMin: 0,
              precoMax: 1000,
              condicoesDeUso: [],
              rating: 0,
              categories: [],
            })
          }
          className="mb-3 py-3 border border-gray-300 rounded-lg shadow-md"
        >
          <Text className="text-center font-medium">Limpar Filtros</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          className="py-3 rounded-lg shadow-md"
        >
          <Text className="text-center font-bold">Aplicar Filtros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FiltersPage;
