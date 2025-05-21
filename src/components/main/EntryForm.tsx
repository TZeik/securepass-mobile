import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RegistryData, VisitResponse } from '@/types/visit.types';
import { getVisitsByQRId, RegisterEntry } from '@/api/visit.api';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/types';
import { loadToken, setAuthToken } from '@/services/auth.service';
import { getAuthenticatedUser } from '@/api/auth.api';
import { User } from '@/types/user.types';


type EntryFormProps = NativeStackScreenProps<RootStackParamList, "EntryForm">;

const EntryForm:  React.FC<EntryFormProps> = ({ navigation, route }) =>  {
  const [imagenPersona, setImagenPersona] = useState<string | null>(null);
  const [imagenVehiculo, setImagenVehiculo] = useState<string | null>(null);
  const { qrData } = route.params;
  const [guard, setGuard] = useState<User | null>(null);
  const [authToken, setAuthTokenState] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await loadToken(); 
        setAuthTokenState(token);        
        setAuthToken(token);             

        if (token) {
          const user = await getAuthenticatedUser(); 
          setGuard(user); 
        }
      } catch (error) {
        console.error("Error autenticando:", error);
      }
    };

    initializeAuth();
  }, []);

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

//Logica para Aprobar y Rechazar visitas
const aprobarVisita = async () => {
  const payload: RegistryData = {
    qrId: visits!.qrId,
    guardId: guard!._id
  };

  try {
    await RegisterEntry(payload, 'aprobada');
    Alert.alert('Éxito', 'Entrada aprobada');
    navigation.navigate("Main");
  } catch (error) {
    Alert.alert('Error', 'No se pudo aprobar la visita');
  }
};

const rechazarVisita = async () => {
  const payload: RegistryData = {
    qrId: visits!.qrId,
    guardId: guard!._id
  };

  try {
    await RegisterEntry(payload, 'rechazada');
    Alert.alert('Éxito', 'Entrada rechazada');
    navigation.navigate("Main");
  } catch (error) {
    Alert.alert('Error', 'No se pudo rechazar la visita');
  }
};


 return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Información de la Visita</Text>

        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{visits?.visit.name}</Text>

        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{visits?.visit.email}</Text>

        <Text style={styles.label}>Cédula:</Text>
        <Text style={styles.value}>{visits?.visit.document}</Text>

        <Text style={styles.label}>Imagen de la persona:</Text>
        {imagenPersona && <Image source={{ uri: imagenPersona }} style={styles.image} />}
        <Button title="Seleccionar imagen de persona" onPress={() => seleccionarImagen(setImagenPersona)} />

        <Text style={styles.label}>Imagen del vehículo:</Text>
        {imagenVehiculo && <Image source={{ uri: imagenVehiculo }} style={styles.image} />}
        <Button title="Seleccionar imagen del vehículo" onPress={() => seleccionarImagen(setImagenVehiculo)} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btnGreen} >
            <Text style={styles.btnText} onPress={aprobarVisita}>Aprobar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRed} >
            <Text style={styles.btnText} onPress={rechazarVisita}>Rechazar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#f2f6fc',
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#222',
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginTop: 18,
    fontSize: 18,
    color: '#333',
  },
  value: {
    fontSize: 17,
    marginTop: 4,
    color: '#555',
  },
  image: {
    width: '100%',
    height: 260,
    marginVertical: 15,
    borderRadius: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  btnGreen: {
    flex: 1,
    backgroundColor: '#28a745',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  btnRed: {
    flex: 1,
    backgroundColor: '#dc3545',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 12,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EntryForm;