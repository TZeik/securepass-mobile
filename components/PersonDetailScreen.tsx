import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

type PersonDetailScreenProps = NativeStackScreenProps<RootStackParamList, "PersonDetail">;

const PersonDetailScreen: React.FC<PersonDetailScreenProps> = ({ route }) => {
  const { person } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalles de Acceso</Text>
      
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Nombre completo:</Text>
        <Text style={styles.detailValue}>{person.fullName}</Text>
        
        <Text style={styles.detailLabel}>Cédula:</Text>
        <Text style={styles.detailValue}>{person.idNumber}</Text>
        
        <Text style={styles.detailLabel}>Vehículo:</Text>
        <Text style={styles.detailValue}>{person.vehicle}</Text>
        
        <Text style={styles.detailLabel}>Fecha de entrada:</Text>
        <Text style={styles.detailValue}>{person.entryDate}</Text>
        
        <Text style={styles.detailLabel}>Hora de entrada:</Text>
        <Text style={styles.detailValue}>{person.entryTime}</Text>
      </View>
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
    marginBottom: 20,
    textAlign: "center",
  },
  detailContainer: {
    backgroundColor: "#F5F9FF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginTop: 10,
  },
  detailValue: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#E6F2FF",
    borderRadius: 5,
  },
});

export default PersonDetailScreen;