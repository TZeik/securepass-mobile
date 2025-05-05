import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginComponent from "./components/LoginComponent";
import MainScreen from "./components/MainScreen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import QRCodeScanner from "./components/QRCodeScanner";
import { RootStackParamList } from "./types";
import QRScannerScreen from "./components/QRCodeScanner";
import AccessDetailsScreen from "./components/AccessDetailsScreen";
import PersonDetailScreen from "./components/PersonDetailScreen";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

function LoginScreen({ navigation }: LoginScreenProps) {
  const handleLogin = (username: string, password: string) => {
    console.log("Login attempt with:", { username, password });
    navigation.navigate("Main");
  };

  return (
    <>
      <StatusBar style="auto" />
      <LoginComponent
        logoImage={require("./assets/Guardia.png")}
        onLogin={handleLogin}
      />
    </>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

/* function QRCodeScannerScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Scanner">) {
  const handleScanned = (data: string) => {
    console.log("Contenido escaneado:", data);
    navigation.goBack(); // Opcional: vuelve atrás después de escanear
  };

  return <QRCodeScanner />;
}
 */
//onScanned={handleScanned}
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Scanner"
          component={QRScannerScreen}
          options={{ title: "Escanear QR" }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: "Control de acceso" }}
        />

        <Stack.Screen
          name="AccessDetails"
          component={AccessDetailsScreen}
          options={{ title: "Detalles de Acceso" }}
        />

        <Stack.Screen
          name="PersonDetail"
          component={PersonDetailScreen}
          options={{ title: "Detalles de Persona" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
