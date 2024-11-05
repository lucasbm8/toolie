import { Text, View, Image } from "react-native";
import { Link } from "expo-router";

const logo = require("../assets/images/logo2.png");

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#53A3FA", // Cor de fundo definida aqui
      }}
    >
      {/* Imagem com tamanho reduzido */}
      <Image source={logo} className="w-48 h-48 object-contain  mb-5" />

      <Text className="font-inter color-white">
        Edit app/index.tsx to edit this screen.
      </Text>

      <Link
        href="/about"
        className=" font-inter mt-4 px-4 py-2 bg-white rounded text-blue-500"
      >
        Go to About screen
      </Link>
    </View>
  );
}
