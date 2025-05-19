import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/types";
import { getAuthenticatedUser } from "../../api/auth.api";
import {
  delToken,
  loadToken,
  saveToken,
  setAuthToken,
} from "@/services/auth.service";
import LogoutConfirmationModal from "../auth/LogoutModal";

type MainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">;

const MainScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const { token } = route.params;
  const [user, setUser] = useState(route.params.user);
  const [loading, setLoading] = useState(false);
const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      try {
        setLoading(true);
        setAuthToken(token);
        setUser(await getAuthenticatedUser());
      } catch (error: any) {
        console.error("Se produjo un error al verificar sesión", error);
        Alert.alert("Error", error.message);
        navigation.replace("Login");
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [token]);

  const handleRegistrarAcceso = () => {
    navigation.navigate("Scanner", {
      onScanned: (value: string) => {
        console.log("Escaneado:", value);
      },
      token,
    });
  };

  const handleResidentList = () => {
    navigation.navigate("ResidentList", { token, user });
  };

  const handleRegistrarSalida = () => {
    navigation.navigate("ExitRegistration", {
      onScanned: (value: string) => {
        console.log("Escaneado:", value);
      },
      token
    });
  };

  const handleLogoutRequest = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setAuthToken(null);
    delToken();
    navigation.replace('Login');
    setShowLogoutModal(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };


  return (
    // Al entrar presentar al usuario autenticado
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido, {user.name}</Text>

      <TouchableOpacity
        style={[styles.button, styles.entryButton]}
        onPress={handleRegistrarAcceso}
      >
        <Text style={styles.buttonText}>Registrar Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.exitButton]}
        onPress={handleRegistrarSalida}
      >
        <Text style={styles.buttonText}>Registrar Salida</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.residentsButton]}
        onPress={handleResidentList}
      >
        <Text style={styles.buttonText}>Residentes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogoutRequest}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <LogoutConfirmationModal
        visible={showLogoutModal}
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
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
  entryButton: {
    backgroundColor: "#2BAEFA",
  },
  exitButton: {
    backgroundColor: "#FA812B",
  },
  residentsButton: {
    backgroundColor: "#11CC4F",
  },
  logoutButton: {
    backgroundColor: "#FA392B",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MainScreen;
