import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const LoginComponent = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const [isPasswordResetButtonPressed, setIsPasswordResetButtonPressed] =
    useState(false);

  const handleLogin = () => {
    // Sua lógica de login aqui
  };

  const handleGoogleLogin = () => {
    // Implementar login com o Google posteriormente
  };
  const handlePasswordResetButtonPress = () => {
    setIsPasswordResetButtonPressed(!isPasswordResetButtonPressed);
  };

  return (
    <View className="p-6 rounded-lg  w-full max-w-md">
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
      <TouchableOpacity
        className={`flex justify-end ${
          isPasswordResetButtonPressed ? "text-blue-950" : "text-blue-500"
        } mb-4 underline`}
        onPress={handlePasswordResetButtonPress}
      >
        <Text>Esqueceu sua senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-blue-500 text-white py-3 rounded-2xl mb-4 "
        onPress={handleLogin}
      >
        <Text className="text-center font-bold ">Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white border border-gray-300 text-gray-600 py-3 rounded-md mb-4 flex flex-row items-center justify-center"
        onPress={handleGoogleLogin}
      >
        <FontAwesome name="google" size={24} color="#D64444" className="mr-2" />
        <Text className="font-bold">Continuar com Google</Text>
      </TouchableOpacity>
      <Text className="text-center font-bold">
        Não tem conta?{" "}
        <Text className="text-blue-800 underline">Cadastre-se</Text>
      </Text>
    </View>
  );
};

export default LoginComponent;
