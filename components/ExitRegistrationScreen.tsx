import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Modal, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useAccess } from "./AccessContext";


type ExitRegistrationScreenProps = NativeStackScreenProps<RootStackParamList, "ExitRegistration">;

const ExitRegistrationScreen: React.FC<ExitRegistrationScreenProps> = ({ navigation }) => {
  const { accessRecords, removeAccessRecord } = useAccess();
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePersonPress = (id: number) => {
    setSelectedPerson(id);
    setModalVisible(true);
  };

  const confirmExit = () => {
    if (selectedPerson) {
      removeAccessRecord(selectedPerson);
      setModalVisible(false);
      Alert.alert("Salida registrada", "La salida ha sido registrada correctamente.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Registrar Salida</Text>
        
        <View style={styles.divider} />
        
        {accessRecords.map((record) => (
          <TouchableOpacity 
            key={record.id} 
            style={styles.recordItem}
            onPress={() => handlePersonPress(record.id)}
          >
            <Text style={styles.recordName}>{record.name}</Text>
            <Text style={styles.recordTime}>Entrada: {record.time}</Text>
            <Text style={styles.recordDetail}>Vehículo: {record.vehicle}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar salida</Text>
            <Text style={styles.modalText}>
              ¿Está seguro que desea registrar la salida de esta persona?
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmExit}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ... (los estilos son los mismos que en la respuesta anterior)
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
      backgroundColor: "#FFE6E6", // Fondo rojo claro para indicar salida
      borderRadius: 8,
      marginBottom: 10,
      padding: 15,
      shadowColor: "#000",
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
    recordDetail: {
      fontSize: 14,
      color: "#666",
      marginTop: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      width: "80%",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    modalButton: {
      padding: 10,
      borderRadius: 5,
      width: "48%",
      alignItems: "center",
    },
    cancelButton: {
      backgroundColor: "#ccc",
    },
    confirmButton: {
      backgroundColor: "#FF3B30",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });
  export default ExitRegistrationScreen;
