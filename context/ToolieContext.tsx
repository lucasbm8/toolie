

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
}
export const ToolieContext = React.createContext<ToolieContextProps | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Set<number>>(new Set());
  const [address, setAddress] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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
        setIsAuthenticated
      }}
    >
      {children}
    </ToolieContext.Provider>
  );
};

export default ContextProvider;