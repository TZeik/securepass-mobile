import { Camera, CameraType, CameraView, useCameraPermissions} from 'expo-camera';
import React, { useEffect ,useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import {BarCodeScannerResult } from 'expo-barcode-scanner';
import { RouteProp, useRoute, useNavigation,NavigationProp} from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';
import Navigation from '@/navigation/Navigation';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from 'axios';

type ScannerRouteProp = RouteProp<RootStackParamList, 'Scanner'>;
type Nav = NavigationProp<RootStackParamList>;
export default function QRScannerScreen() {
  const route = useRoute<ScannerRouteProp>();
  const navigation = useNavigation<Nav>();
  const { onScanned, token } = route.params;

  const [cameraType, setCameraType] = useState<CameraType>("back");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
 
    const handleBarCodeScanned = ({ data }: BarCodeScannerResult) => {
    if (!scanned) {
      setScanned(true);
      setScannedData(data);

      if (onScanned) {
        onScanned(data);
      }

      // Condición simulada (puedes usar data, token u otra cosa)
      const condicionValida = data.startsWith("VALIDO_"); // ejemplo: cambia por lo que necesites

      Alert.alert(
        'Código escaneado',
        data,
        [
          {
            text: 'OK',
            onPress: () => {
              
                navigation.navigate('EntryForm');
               
            }
          }
        ]
      );
    }
  }; 

  if (hasPermission === null) {
    return <Text>Solicitando permiso de cámara...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        facing={cameraType}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={StyleSheet.absoluteFillObject}
      /> 
      <View style={styles.overlay}>
        {scannedData && <Button title="Escanear otro" onPress={() => {
          setScanned(false);
          setScannedData(null);
        }} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
});
