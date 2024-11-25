import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { ToolieContext } from "@/context/ToolieContext";

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
  disponibilidade: string;
  localizacao: string;
  fotosURL: string[];
  condicoesDeUso: string;
  opcoesDeEntrega: string;
}

interface RenderToolItemProps {
  item: Tool;
}

const SearchTool: React.FC = () => {
  const { cart, setCart } = useContext(ToolieContext);

  // Verifica se o contexto foi fornecido
  if (!cart || !setCart) {
    throw new Error(
      "ToolieContext deve ser usado dentro de um ContextProvider"
    );
  }

  const [tools, setTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Simula o fetch com dados locais
  useEffect(() => {
    setTools(toolsData);
  }, []);

  const filteredTools = tools.filter(
    (tool) =>
      tool.tipoFerramenta.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.localizacao.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    const isInCart = cart.has(item.id); // Verifica se o item está no carrinho

    return (
      <View className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm">
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
          </View>
          <View className="bg-blue-500 px-3 py-1 rounded">
            <Text className="text-black font-bold">
              {formatPrice(item.precoAluguel)}/dia
            </Text>
          </View>
        </View>

        <View className="mt-3">
          <TouchableOpacity
            className={`bg-secondary flex-1 py-3 rounded-2xl mt-3 ${
              isInCart ? "bg-red-500" : "bg-green-500"
            }`}
            onPress={() => handleCartPress(item.id)}
          >
            <Text className="text-center text-white font-bold">
              {isInCart ? "Remover do carrinho" : "Adicionar ao carrinho"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header e Barra de Busca */}
      <View className="bg-white p-4 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Ferramentas
        </Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => router.push("/CartPage")} // Navega para a página do carrinho
        >
          Ir para o carrinho
        </TouchableOpacity>
        <View className="flex-row items-center bg-gray-100 rounded-lg p-2">
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
