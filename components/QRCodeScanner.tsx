import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Camera, CameraType, BarCodeScanningResult } from 'expo-camera';

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef<Camera | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: BarCodeScanningResult) => {
    if (!scanned) {
      setScanned(true);
      setScannedData(data);
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
      <Camera
        ref={(ref) => (cameraRef.current = ref)}
        style={StyleSheet.absoluteFillObject}
        type={CameraType.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ['qr'],
        }}
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
