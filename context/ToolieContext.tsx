import React, { ReactNode, useState } from "react";

// Define a interface do contexto
interface ToolieContextProps {
  cart: Set<number>; // O carrinho é um Set de IDs
  setCart: React.Dispatch<React.SetStateAction<Set<number>>>; // Função para atualizar o estado do carrinho
}

// Cria o contexto com um valor inicial padrão
export const ToolieContext = React.createContext<
  ToolieContextProps | undefined
>(undefined);

// Componente Provider
export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Set<number>>(new Set());

  return (
    <ToolieContext.Provider value={{ cart, setCart }}>
      {children}
    </ToolieContext.Provider>
  );
};

export default ContextProvider;
