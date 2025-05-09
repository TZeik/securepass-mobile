import { Camera, CameraType, CameraView, useCameraPermissions} from 'expo-camera';
import React, { useEffect ,useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import {BarCodeScannerResult } from 'expo-barcode-scanner';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';

type ScannerRouteProp = RouteProp<RootStackParamList, 'Scanner'>;

export default function QRScannerScreen() {
  const route = useRoute<ScannerRouteProp>();
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
      
      // Verificamos si onScanned existe antes de llamarlo
      if (onScanned) {
        onScanned(data);
      }
      
      Alert.alert('Código escaneado', data);
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
