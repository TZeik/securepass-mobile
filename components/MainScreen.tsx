import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Usa el mismo tipo de parámetros definido en Navigation.tsx
type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

type MainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">;

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={() => console.log("Registrar acceso")}
      >
        <Text style={styles.buttonText}>Registrar Acceso</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => console.log("Detalles de acceso")}
      >
        <Text style={styles.buttonText}>Detalles de Acceso</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.tertiaryButton]}
        onPress={() => console.log("Registrar salida")} // Ejemplo usando navigation
      >
        <Text style={styles.buttonText}>Registrar salida</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
  },
  secondaryButton: {
    backgroundColor: "#34C759",
  },
  tertiaryButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MainScreen;
