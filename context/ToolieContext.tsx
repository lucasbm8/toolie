import React, { ReactNode, useState } from "react";

// Define a interface do contexto
interface ToolieContextProps {
  cart: Set<number>; // O carrinho é um Set de IDs
  setCart: React.Dispatch<React.SetStateAction<Set<number>>>; // Função para atualizar o estado do carrinho
  address: string; // O endereço é uma string
  setAddress: React.Dispatch<React.SetStateAction<string>>; // Função para atualizar o estado do endereço
  username: string; // O nome de usuário é uma string
  setUsername: React.Dispatch<React.SetStateAction<string>>; // Função para atualizar o estado do nome de usuário
}

// Cria o contexto com um valor inicial padrão
export const ToolieContext = React.createContext<
  ToolieContextProps | undefined
>(undefined);

// Componente Provider
export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Set<number>>(new Set());
  const [address, setAddress] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  return (
    <ToolieContext.Provider
      value={{ cart, setCart, address, setAddress, setUsername, username }}
    >
      {children}
    </ToolieContext.Provider>
  );
};

export default ContextProvider;
