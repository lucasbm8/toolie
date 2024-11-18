import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter, Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
// import { Link } from "expo-router";
// import ProductDetailsPage from "@/app/productDetails";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [isPasswordResetButtonPressed, setIsPasswordResetButtonPressed] =
    useState(false);

    const handleLogin = () => {
      const validEmail = "user"; // E-mail específico
      const validPassword = "pass"; // Senha específica
      if (email === validEmail && password === validPassword) {
        setErrorMessage("");
        setEmail("");
        setPassword("");
        router.push("/searchTool"); // Navega para a nova tela
      } else {
        setErrorMessage("E-mail ou senha incorretos");
      }
    };
    

  const handleGoogleLogin = () => {
    // Implementar login com o Google posteriormente
  };

  const handlePasswordResetButtonPress = () => {
    setIsPasswordResetButtonPressed(!isPasswordResetButtonPressed);
  };

  return (
    <View className="p-6 rounded-lg w-full max-w-md">
      <TextInput
        className="border bg-white border-gray-700 rounded-2xl px-4 py-2 mb-4"
        placeholder="Insira seu e-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border bg-white border-gray-700 rounded-2xl px-4 py-2 mb-4"
        placeholder="Insira sua senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {errorMessage ? (
        <Text className="text-red-500 mb-4 flex justify-center">
          {errorMessage}
        </Text>
      ) : null}

      <View className="flex items-center">
        <TouchableOpacity
          className="text-blue-800 mb-4 underline"
          onPress={handlePasswordResetButtonPress}
        >
          <Text className="font-inter" >Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>

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
        <TouchableOpacity className="text-blue-900 mb-4 underline">
          <Text>Cadastre-se</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default LoginComponent;
