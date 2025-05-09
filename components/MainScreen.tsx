import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type MainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">;

const MainScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {

  /* Obtener el token y los datos del usuario de los parámetros de ruta
      y pasarlo a las siguientes pantallas:
  */
  const { token, user } = route.params;

  const handleRegistrarAcceso = () => {
    navigation.navigate("Scanner", {
      onScanned: (value: string) => {
        console.log("Escaneado:", value);
      },
      token
    });
  };

  const handleDetallesAcceso = () => {
    navigation.navigate("AccessDetails", { token });
  };

  const handleRegistrarSalida = () => {
    navigation.navigate("ExitRegistration", { token });
  };

  return (
    
    // Al entrar presentar al usuario autenticado
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido, {user.name}</Text>
      
      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={handleRegistrarAcceso}
      >
        <Text style={styles.buttonText}>Registrar Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.tertiaryButton]}
        onPress={handleRegistrarSalida}
      >
        <Text style={styles.buttonText}>Registrar Salida</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={handleDetallesAcceso}
      >
        <Text style={styles.buttonText}>Residentes</Text>
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
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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