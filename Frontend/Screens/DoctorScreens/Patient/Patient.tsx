import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

type Patient = {
  id: string;
  name: string;
  age: number;
  condition: string;
};

const PatientsDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const dummyPatients: Patient[] = [
      { id: "1", name: "John Doe", age: 45, condition: "Diabetes" },
      { id: "2", name: "Jane Smith", age: 32, condition: "Hypertension" },
      { id: "3", name: "Michael Johnson", age: 28, condition: "Asthma" },
    ];
    setPatients(dummyPatients);
  }, []);

  const renderPatientItem = ({ item }: { item: Patient }) => (
    <TouchableOpacity style={styles.patientCard}>
      <Text style={styles.patientName}>{item.name}</Text>
      <Text style={styles.patientInfo}>Age: {item.age}</Text>
      <Text style={styles.patientInfo}>Condition: {item.condition}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patients List</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={renderPatientItem}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
};

export default PatientsDashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  patientCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  patientName: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  patientInfo: { fontSize: 14, color: "#555" },
});
