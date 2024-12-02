// api/toolsApi.ts
import axios from 'axios';

const BASE_URL = 'https://toolie-back-end.onrender.com/api/v1';

export const fetchTools = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ferramentas`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar ferramentas:', error);
    throw error;
  }
};