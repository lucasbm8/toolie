import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';

// Importando o JSON local
import toolsData from './../assets/data.json';

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
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Simula o fetch com dados locais
  useEffect(() => {
    setTools(toolsData);
  }, []);

  const filteredTools = tools.filter(tool =>
    tool.tipoFerramenta.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.localizacao.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price: number): string => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const renderToolItem = ({ item }: RenderToolItemProps) => (
    <TouchableOpacity 
      className="bg-white p-4 mb-4 rounded-lg shadow-md"
      onPress={() => handleToolPress(item)}
    >
      {item.fotosURL && item.fotosURL.length > 0 && (
        <Image
          source={{ uri: item.fotosURL[0] }}
          className="w-full h-48 rounded-lg mb-3"
          resizeMode="cover"
        />
      )}
      
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-800">{item.tipoFerramenta}</Text>
          <Text className="text-gray-600 mt-1">{item.descricao}</Text>
        </View>
        <View className="bg-blue-500 px-3 py-1 rounded">
          <Text className="text-white font-bold">
            {formatPrice(item.precoAluguel)}/dia
          </Text>
        </View>
      </View>

      <View className="mt-3">
        <View className="flex-row items-center mt-2">
          <Text className="text-gray-700 font-semibold">Local:</Text>
          <Text className="text-gray-600 ml-2">{item.localizacao}</Text>
        </View>

        <View className="flex-row flex-wrap mt-2">
          <View className={`px-2 py-1 rounded mr-2 mb-1 ${
            item.disponibilidade === 'Disponível' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <Text className={`${
              item.disponibilidade === 'Disponível' ? 'text-green-800' : 'text-red-800'
            } text-sm`}>
              {item.disponibilidade}
            </Text>
          </View>
          <View className="bg-gray-100 px-2 py-1 rounded mr-2 mb-1">
            <Text className="text-gray-800 text-sm">{item.estadoDeUso}</Text>
          </View>
        </View>

        <View className="mt-2">
          <Text className="text-gray-700 text-sm">
            <Text className="font-semibold">Entrega: </Text>
            {item.opcoesDeEntrega}
          </Text>
          <Text className="text-gray-700 text-sm">
            <Text className="font-semibold">Estado: </Text>
            {item.condicoesDeUso}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleToolPress = (tool: Tool): void => {
    console.log('Tool selected:', tool);
    // Adicione aqui a navegação para a tela de detalhes da ferramenta
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header e Barra de Busca */}
      <View className="bg-white p-4 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Ferramentas</Text>
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
