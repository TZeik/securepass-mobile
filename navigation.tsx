import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginComponent from './components/LoginComponent';
import MainScreen from './components/MainScreen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import QRCodeScanner from './components/QRCodeScanner';

// Define los tipos para tus rutas
type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  QRScanner: undefined;
};



type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

function LoginScreen({ navigation }: LoginScreenProps) {
  const handleLogin = (username: string, password: string) => {
    console.log("Login attempt with:", { username, password });
    navigation.navigate('Main');
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

<Stack.Screen name="QRScanner" component={QRCodeScanner} options={{ title: 'Escanear QR' }} />

function QRCodeScannerScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'QRScanner'>) {
  const handleScanned = (data: string) => {
    console.log("Contenido escaneado:", data);
    navigation.goBack(); // Opcional: vuelve atrás después de escanear
  };

  return <QRCodeScanner onScanned={handleScanned} />;
}


export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Main" 
          component={MainScreen}
          options={{ title: 'Control de acceso' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}