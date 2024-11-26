import React, { ReactNode, useState } from "react";

interface ToolieContextProps {
  cart: Set<number>;
  setCart: React.Dispatch<React.SetStateAction<Set<number>>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  cep: string;
  setCep: React.Dispatch<React.SetStateAction<string>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

interface Filters {
  estadoDeUso: string[];
  precoMin: number;
  precoMax: number;
  condicoesDeUso: string[];
  rating: number;
  categories: string[];
}

export const ToolieContext = React.createContext<
  ToolieContextProps | undefined
>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Set<number>>(new Set());
  const [address, setAddress] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [cep, setCep] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    estadoDeUso: [],
    precoMin: 0,
    precoMax: 1000,
    condicoesDeUso: [],
    rating: 0,
    categories: [],
  });

  return (
    <ToolieContext.Provider
      value={{
        cart,
        setCart,
        address,
        setAddress,
        username,
        setUsername,
        isAuthenticated,
        setIsAuthenticated,
        cep,
        setCep,
        filters,
        setFilters,
      }}
    >
      {children}
    </ToolieContext.Provider>
  );
};

export default ContextProvider;
