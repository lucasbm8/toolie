import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { ToolieContext } from "@/context/ToolieContext";
import { ShoppingCartIcon } from "lucide-react-native";
// Importando o JSON local
import toolsData from "./../assets/dataFerramentas.json";
import { router } from "expo-router";

// Interface para a estrutura exata da sua API
interface Tool {
  id: number;
  proprietarioId: number;
  tipoFerramenta: string;
  estadoDeUso: string;
  descricao: string;
  precoAluguel: number;
  disponivel: boolean;
  localizacao: string;
  fotosURL: string[];
  condicoesDeUso: string;
  opcoesDeEntrega: string;
  rating: number;
  category: string;
}

interface RenderToolItemProps {
  item: Tool;
}

const SearchTool: React.FC = () => {
  const toolieContext = useContext(ToolieContext);
  if (!toolieContext) {
    throw new Error("useContext must be used within a ContextProvider");
  }
  const { cart, setCart, filters } = toolieContext;

  const [tools, setTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Simula o fetch com dados locais
  useEffect(() => {
    setTools(toolsData);
  }, []);

  const filteredTools = tools.filter((tool) => {
    // Filtro de busca
    const matchesSearch =
      tool.tipoFerramenta.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.localizacao.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtro de estado de uso
    const matchesEstadoDeUso =
      filters.estadoDeUso.length === 0 ||
      filters.estadoDeUso.includes(tool.estadoDeUso);

    // Filtro de preço
    const matchesPreco =
      tool.precoAluguel >= filters.precoMin &&
      tool.precoAluguel <= filters.precoMax;

    // Filtro de condições de uso
    const matchesCondicoes =
      filters.condicoesDeUso.length === 0 ||
      filters.condicoesDeUso.includes(tool.condicoesDeUso);

    // Filtro de rating
    const matchesRating = tool.rating >= filters.rating;

    // Filtro de categoria
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(tool.category);

    return (
      matchesSearch &&
      matchesEstadoDeUso &&
      matchesPreco &&
      matchesCondicoes &&
      matchesRating &&
      matchesCategory
    );
  });

  const formatPrice = (price: number): string => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  const handleCartPress = (id: number) => {
    // Encontra o item correspondente pelo id no toolsData
    const tool = toolsData.find((item) => item.id === id);

    if (!tool) {
      console.error(`Ferramenta com id ${id} não encontrada.`);
      return;
    }

    const isInCart = cart.has(id);

    if (isInCart) {
      // Remove o item do carrinho
      setCart((prevCart: Set<number>) => {
        const newCart = new Set(prevCart); // Cria um novo Set baseado no anterior
        newCart.delete(id); // Remove o item
        console.log(
          `Item removido do carrinho: ${tool.tipoFerramenta} (ID: ${id})`
        );
        console.log(
          "Carrinho atualizado:",
          Array.from(newCart).map((itemId) => {
            const item = toolsData.find((tool) => tool.id === itemId);
            return item
              ? `${item.tipoFerramenta} (ID: ${item.id})`
              : `Desconhecido (ID: ${itemId})`;
          })
        );
        return newCart; // Atualiza o estado
      });
    } else {
      // Adiciona o item ao carrinho
      setCart((prevCart: Set<number>) => {
        const newCart = new Set(prevCart); // Cria um novo Set baseado no anterior
        newCart.add(id); // Adiciona o item
        console.log(
          `Item adicionado ao carrinho: ${tool.tipoFerramenta} (ID: ${id})`
        );
        console.log(
          "Carrinho atualizado:",
          Array.from(newCart).map((itemId) => {
            const item = toolsData.find((tool) => tool.id === itemId);
            return item
              ? `${item.tipoFerramenta} (ID: ${item.id})`
              : `Desconhecido (ID: ${itemId})`;
          })
        );
        return newCart; // Atualiza o estado
      });
    }
  };

  const renderToolItem = ({ item }: RenderToolItemProps) => {
    const isInCart = cart.has(item.id);
  
    return (
      <View className="flex-1 bg-gray-100">
        {/* Header e Barra de Busca */}
        <View className="bg-white p-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-gray-800">Ferramentas</Text>
            <View className="flex-row gap-4">
              <TouchableOpacity 
                onPress={() => router.push("/FiltersPage")}
                className="flex-row items-center"
              >
                <Text className="text-blue-500 font-semibold">Filtros</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="relative"
                onPress={() => router.push("/CartPage")}
              >
                <ShoppingCartIcon size={24} color="black" />
                {cart.size > 0 && (
                  <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                    <Text className="text-white text-xs font-bold">
                      {cart.size}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
  
          <View className="flex-row items-center bg-gray-100 rounded-lg p-2 mt-4">
            <TextInput
              className="flex-1 ml-2 text-gray-800"
              placeholder="Buscar por nome, descrição ou local..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
  
          {/* Filtros ativos */}
          {(filters.estadoDeUso.length > 0 ||
            filters.categories.length > 0 ||
            filters.condicoesDeUso.length > 0 ||
            filters.rating > 0 ||
            filters.precoMin > 0 ||
            filters.precoMax < 1000) && (
            <View className="mt-3">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {filters.estadoDeUso.map((estado) => (
                  <View key={estado} className="bg-blue-100 rounded-full px-3 py-1 mr-2">
                    <Text className="text-blue-700">{estado}</Text>
                  </View>
                ))}
                {filters.categories.map((category) => (
                  <View key={category} className="bg-blue-100 rounded-full px-3 py-1 mr-2">
                    <Text className="text-blue-700">{category}</Text>
                  </View>
                ))}
                {filters.condicoesDeUso.map((condicao) => (
                  <View key={condicao} className="bg-blue-100 rounded-full px-3 py-1 mr-2">
                    <Text className="text-blue-700">{condicao}</Text>
                  </View>
                ))}
                {filters.rating > 0 && (
                  <View className="bg-blue-100 rounded-full px-3 py-1 mr-2">
                    <Text className="text-blue-700">★ {filters.rating}+</Text>
                  </View>
                )}
                {(filters.precoMin > 0 || filters.precoMax < 1000) && (
                  <View className="bg-blue-100 rounded-full px-3 py-1 mr-2">
                    <Text className="text-blue-700">
                      R${filters.precoMin} - R${filters.precoMax}
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        </View>
  
        {/* Lista de Ferramentas */}
        <FlatList
          data={filteredTools}
          renderItem={({ item }) => (
            <View className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm mx-4">
              {item.fotosURL && item.fotosURL.length > 0 && (
                <Image
                  source={{ uri: item.fotosURL[0] }}
                  className="w-full h-48 rounded-lg mb-3"
                  resizeMode="cover"
                />
              )}
  
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-xl font-bold text-gray-800">
                    {item.tipoFerramenta}
                  </Text>
                  <Text className="text-gray-600 mt-1">{item.descricao}</Text>
                  
                  {/* Status de disponibilidade */}
                  <View className={`mt-2 rounded-full px-2 py-1 ${
                    item.disponivel ? 'bg-green-100' : 'bg-red-100'
                  } self-start`}>
                    <Text className={`${
                      item.disponivel ? 'text-green-700' : 'text-red-700'
                    } font-medium`}>
                      {item.disponivel ? 'Disponível' : 'Indisponível'}
                    </Text>
                  </View>
                </View>
  
                <View>
                  <View className="bg-blue-500 px-3 py-1 rounded">
                    <Text className="text-black font-bold">
                      {formatPrice(item.precoAluguel)}/dia
                    </Text>
                  </View>
                  {/* Rating display */}
                  <View className="flex-row items-center justify-end mt-2">
                    {[...Array(5)].map((_, index) => (
                      <Text
                        key={index}
                        className={`text-xl ${
                          index < item.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </Text>
                    ))}
                    <Text className="text-gray-600 ml-1 text-sm">
                      ({item.rating}/5)
                    </Text>
                  </View>
                </View>
              </View>
  
              <View className="mt-3">
                <TouchableOpacity
                  className={`
                    flex-1 py-3 rounded-2xl mt-3 
                    ${!item.disponivel 
                      ? 'bg-gray-400' 
                      : cart.has(item.id)
                        ? "bg-red-500" 
                        : "bg-green-500"
                    }
                  `}
                  onPress={() => item.disponivel ? handleCartPress(item.id) : null}
                  disabled={!item.disponivel}
                >
                  <Text className="text-center text-white font-bold">
                    {!item.disponivel 
                      ? 'Indisponível' 
                      : cart.has(item.id)
                        ? "Remover do carrinho" 
                        : "Adicionar ao carrinho"
                    }
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerClassName="py-4"
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center p-4">
              <Text className="text-center text-gray-500">
                Nenhuma ferramenta encontrada
              </Text>
            </View>
          }
        />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header e Barra de Busca */}
      <View className="bg-white p-4 shadow-sm">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-800">Ferramentas</Text>
          <TouchableOpacity
            className="relative"
            onPress={() => router.push("/CartPage")}
          >
            <ShoppingCartIcon size={24} color="black" />
            {cart.size > 0 && (
              <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">
                  {cart.size}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center bg-gray-100 rounded-lg p-2 mt-4">
          <TextInput
            className="flex-1 ml-2 text-gray-800"
            placeholder="Buscar por nome, descrição ou local..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Lista de Ferramentas */}
      <FlatList
        data={filteredTools}
        renderItem={renderToolItem}
        keyExtractor={(item: Tool) => item.id.toString()}
        contentContainerClassName="p-4"
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center p-4">
            <Text className="text-center text-gray-500">
              Nenhuma ferramenta encontrada
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default SearchTool;
