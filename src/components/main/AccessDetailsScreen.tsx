import React from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/types";
import { useAccess } from "./AccessContext";

type AccessDetailsScreenProps = NativeStackScreenProps<RootStackParamList, "AccessDetails">;

const AccessDetailsScreen: React.FC<AccessDetailsScreenProps> = ({ navigation, route }) => {
  const { accessRecords } = useAccess();
  const { token } = route.params; // Obtenemos el token de los parámetros de ruta

  const handlePersonPress = (person: any) => {
    navigation.navigate("PersonDetail", { 
      token, // Pasamos el token de la ruta actual
      person 
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalles de Acceso</Text>
      
      <View style={styles.divider} />
      
      {accessRecords.map((record) => (
        <TouchableOpacity 
          key={record.id} 
          style={styles.recordItem}
          onPress={() => handlePersonPress(record)}
        >
          <Text style={styles.recordName}>{record.name}</Text>
          <Text style={styles.recordTime}>{record.time}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  recordItem: {
    backgroundColor: "#E6F2FF", // Fondo azul claro
    borderRadius: 8, // Bordes redondeados
    marginBottom: 10, // Espacio entre elementos
    padding: 15,
    shadowColor: "#000", // Sombra opcional para mejor visualización
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recordName: {
    fontSize: 18,
    fontWeight: "500",
  },
  recordTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default AccessDetailsScreen;