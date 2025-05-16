import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { VisitResponse } from '@/types/visit.types';
import { getVisitsByQRId } from '@/api/visit.api';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/types';


type EntryFormProps = NativeStackScreenProps<RootStackParamList, "EntryForm">;

const EntryForm:  React.FC<EntryFormProps> = ({ navigation, route }) =>  {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [cedula, setCedula] = useState('');
  const [imagenPersona, setImagenPersona] = useState<string | null>(null);
  const [imagenVehiculo, setImagenVehiculo] = useState<string | null>(null);
 
  const { qrData } = route.params;

  // Simula la carga desde una API
  const [visits, setVisits] = useState<VisitResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const getVisits = async () => {
        try {
          setVisits(await getVisitsByQRId(qrData));
          setIsLoading(false);
        } catch (error) {
          console.error(`Ocurrio un error al obtener visitas`, error);
        }
      };
      getVisits();
    }, []);

  const seleccionarImagen = async (setImagen: (uri: string) => void) => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      alert('Se necesita permiso para acceder a la galería');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre: </Text>
      <TextInput value={nombre} editable={false} style={styles.inputDisabled} />

      <Text style={styles.label}>Correo:</Text>
      <TextInput value={correo} editable={false} style={styles.inputDisabled} />

      <Text style={styles.label}>Cédula:</Text>
      <TextInput value={cedula} editable={false} style={styles.inputDisabled} />

      <Text style={styles.label}>Imagen de la persona:</Text>
      {imagenPersona && <Image source={{ uri: imagenPersona }} style={styles.image} />}
      <Button title="Seleccionar imagen de persona" onPress={() => seleccionarImagen(setImagenPersona)} />

      <Text style={styles.label}>Imagen del vehículo:</Text>
      {imagenVehiculo && <Image source={{ uri: imagenVehiculo }} style={styles.image} />}
      <Button title="Seleccionar imagen del vehículo" onPress={() => seleccionarImagen(setImagenVehiculo)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputDisabled: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    color: '#777',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
});
