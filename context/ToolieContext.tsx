import { View, Text } from "react-native";
import React, { ReactNode, useState } from "react";

export const ToolieContext = React.createContext({});

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState(new Set());

  return (
    <ToolieContext.Provider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </ToolieContext.Provider>
  );
};

export default ContextProvider;
