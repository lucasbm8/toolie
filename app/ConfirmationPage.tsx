// ConfirmationPage.tsx
import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { ToolieContext } from "@/context/ToolieContext";

const ConfirmationPage: React.FC = () => {
  const router = useRouter();
  const toolieContext = useContext(ToolieContext);

  if (!toolieContext) {
    throw new Error("useContext must be used within a ContextProvider");
  }

  const { setCart } = toolieContext;

  const handleBackToHome = () => {
    setCart(new Set()); // Reseta o carrinho
    router.push("/"); // Redireciona para a página inicial
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu pedido de aluguel foi confirmado</Text>
      <Text style={styles.message}>
        Agora só resta esperar a aprovação do locador.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
        <Text style={styles.buttonText}>Voltar para a Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#4b5563",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ConfirmationPage;
