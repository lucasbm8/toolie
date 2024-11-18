import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const SearchTool: React.FC = () => {
    console.log("entrou")
    const fetchTools = async (): Promise<void> => {
        try {
          const response = await fetch('https://restcountries.com/v3.1/currency/cop');
          if (!response.ok) {
            throw new Error('Erro ao buscar ferramentas');
          }
          const data = await response.json();
          console.log(data);
        } catch (err) {
          console.error(err);
        }
      };
      
  useEffect(() => {
    fetchTools();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Carregando ferramentas...</Text>
      <ActivityIndicator size="large" color="#4F46E5" />
    </View>
  );
};

export default SearchTool;
