import { Text, View } from "react-native";

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
      <Text style={{ color: "#FFFFFF" }}>
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
