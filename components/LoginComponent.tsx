import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import users from "../assets/dataUser.json";
import { ToolieContext } from "@/context/ToolieContext";

const LoginComponent = () => {
  const toolieContext = useContext(ToolieContext);
  if (!toolieContext) {
    throw new Error("useContext must be used within a ContextProvider");
  }
  const { username, setUsername, setIsAuthenticated } = toolieContext;

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [isPasswordResetButtonPressed, setIsPasswordResetButtonPressed] = useState(false);

  const handleLogin = () => {
    const user = users.find((u) => u.email === username);

    if (user) {
      setErrorMessage("");
      setIsAuthenticated(true);
      
      if (user.flagLocatario) {
        router.push("/feedScreen");
      } else if (user.flagLocador) {
        // router.push("/locatarioScreen");
      }
    } else {
      setErrorMessage("E-mail ou senha incorretos");
    }
  };

  const handleGoogleLogin = () => {
    // Implementar login com o Google posteriormente
  };

  return (
    <View className="p-6 rounded-lg w-full max-w-md">
      <TextInput
        className="border bg-white border-gray-700 rounded-2xl px-4 py-2 mb-4"
        placeholder="Insira seu e-mail"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        className="border bg-white border-gray-700 rounded-2xl px-4 py-2 mb-4"
        placeholder="Insira sua senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {errorMessage && (
        <Text className="text-red-500 mb-4 flex justify-center">
          {errorMessage}
        </Text>
      )}

      <TouchableOpacity
        className="bg-secondary-alt py-3 rounded-2xl mb-4 border border-gray-700 flex-1"
        onPress={handleLogin}
      >
        <Text className="text-center text-white font-bold">Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white border text-gray-600 border-gray-700 py-3 rounded-2xl mb-4 flex flex-row items-center justify-center"
        onPress={handleGoogleLogin}
      >
        <FontAwesome name="google" size={24} color="#DB4437" className="mr-2" />
        <Text className="font-inter font-bold">Continuar com Google</Text>
      </TouchableOpacity>

      <Text className="text-center p-4">
        Não tem conta?{" "}
        <TouchableOpacity>
          <Text className="text-blue-900 underline">Cadastre-se</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default LoginComponent;