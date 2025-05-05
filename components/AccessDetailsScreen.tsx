import React from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type AccessDetailsScreenProps = NativeStackScreenProps<RootStackParamList, "AccessDetails">;

const AccessDetailsScreen: React.FC<AccessDetailsScreenProps> = ({ navigation }) => {
  //Datos de cada uno
  const accessRecords = [
    { 
      id: 1, 
      name: "Juan Pérez", 
      time: "09:15 AM",
      fullName: "Juan Alberto Pérez González",
      idNumber: "402-31824212-3",
      vehicle: "Toyota Corolla 2020 - ABC123",
      entryDate: "15/05/2023",
      entryTime: "09:00 AM",
      visitPurpose: "Reunión de negocios",
      contactPerson: "Carlos Méndez",
      department: "Ventas"
    },
    { 
      id: 2, 
      name: "María García", 
      time: "10:30 AM",
      fullName: "María José García Rodríguez",
      idNumber: "402-31824212-2",
      vehicle: "Nissan Sentra 2019 - XYZ987",
      entryDate: "15/05/2023",
      entryTime: "10:00 AM",
      visitPurpose: "Entrega de documentos",
      contactPerson: "Ana López",
      department: "Contabilidad"
    },
    // ... más registros
  ];

  const handlePersonPress = (person: any) => {
    navigation.navigate("PersonDetail", { person });
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