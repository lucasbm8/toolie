import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const LoginComponent = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Sua lógica de login aqui
  };

  const handleGoogleLogin = () => {
    // Implementar login com o Google posteriormente
  };

  return (
    <View className="flex items-center justify-center h-full bg-blue-500">
      <View className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <TextInput
          className="border border-gray-300 rounded-md px-4 py-2 mb-4"
          placeholder="Insira seu e-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="border border-gray-300 rounded-md px-4 py-2 mb-4"
          placeholder="Insira sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text className="text-blue-500 mb-4 underline">
          Esqueceu sua senha?
        </Text>
        <TouchableOpacity
          className="bg-blue-500 text-white py-3 rounded-md mb-4"
          onPress={handleLogin}
        >
          <Text className="text-center font-bold">Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white border border-gray-300 text-gray-600 py-3 rounded-md mb-4"
          onPress={handleGoogleLogin}
        >
          <Text className="text-center font-bold">Continuar com Google</Text>
        </TouchableOpacity>
        <Text className="text-center font-bold">
          Não tem conta?{" "}
          <Text className="text-blue-500 underline">Cadastre-se</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginComponent;
