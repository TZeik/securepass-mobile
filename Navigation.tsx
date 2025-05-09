import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginComponent from "./components/LoginComponent";
import MainScreen from "./components/MainScreen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { RootStackParamList } from "./types/types";
import QRScannerScreen from "./components/QRCodeScanner";
import AccessDetailsScreen from "./components/AccessDetailsScreen";
import PersonDetailScreen from "./components/PersonDetailScreen";
import ExitRegistrationScreen from "./components/ExitRegistrationScreen";
import { setAuthToken } from "./api/auth.api";

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
          name="Login"
          options={{ headerShown: false }}
        >
          {(props) => (
            <>
              <StatusBar style="auto" />
              <LoginComponent
                logoImage={require("./assets/Guardia.png")}
                {...props}
              />
            </>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ 
            title: "Control de acceso",
            headerBackVisible: false // Evita el botón de retroceso
          }}
        />

        <Stack.Screen
          name="Scanner"
          component={QRScannerScreen}
          options={{ title: "Escanear QR" }}
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

        <Stack.Screen
          name="ExitRegistration"
          component={ExitRegistrationScreen}
          options={{ title: "Registrar Salida" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}