import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

// Usa el mismo tipo de parámetros definido en Navigation.tsx

type MainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">;

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const handleRegistrarAcceso = () => {
    navigation.navigate("Scanner", {
      onScanned: (value: string) => {
        console.log("Escaneado:", value);
      },
    });
  };

  const handleDetallesAcceso = () => {
    navigation.navigate("AccessDetails");
  };

  const handleRegistrarSalida = () => {
    navigation.navigate("ExitRegistration");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={handleRegistrarAcceso}
      >
        <Text style={styles.buttonText}>Registrar Acceso</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={handleDetallesAcceso}
      >
        <Text style={styles.buttonText}>Detalles de Acceso</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.tertiaryButton]}
        onPress={handleRegistrarSalida} // Ejemplo usando navigation
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
