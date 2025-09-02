import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DependentCard from "./DependentCard/DependentCard";
import MedicineCard from "./MedicenCard/MedicenCard";
import type { DashboardStackParamList } from "../../Navigations/stacks/DashboardStack"; 
import { apiRequest } from "../../Services/api";

interface Medicine {
  _id: string;
  name: string;
  dose: string;       
  time: string;      
  quantity: string;   
}

interface Dependent {
  _id: string;
  name: string;
  relation: string;
  age: number;
  picture?: string;
  medicines: Medicine[];
}

type Props = NativeStackScreenProps<DashboardStackParamList, "DependentEdit">;

const DependentEdit = ({ route, navigation }: Props) => {
  const { id } = route.params;

  const [dependent, setDependent] = useState<Dependent | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDependent = async () => {
      try {
        const response = await apiRequest(`/dependents/${id}`);

        setDependent(response);

        const transformedMedicines = (response.medicines || []).map((med: any) => ({
          _id: med._id,
          name: med.name,
          dose: med.dosage.toString(),       
          quantity: med.unit,
          time: med.times && med.times.length > 0
            ? med.times
                .map((t: string) => {
                  const date = new Date(t);
                  return isNaN(date.getTime()) ? t : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                })
                .join(", ")
            : "No time",
        }));

        setMedicines(transformedMedicines);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to fetch dependent data");
      } finally {
        setLoading(false);
      }
    };
    fetchDependent();
  }, [id]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#0000ff" />;

  if (!dependent)
    return (
      <View style={styles.container}>
        <Text>No dependent found</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <DependentCard
        name={dependent.name}
        relationship={dependent.relation}
        age={dependent.age}
        imageUri={dependent.picture}
      />

      <View style={styles.medicineSection}>
{medicines.map((med) => (
  <MedicineCard
    key={med._id}
    name={med.name}
    dose={med.dose}        
    time={med.time}        
    quantity={med.quantity}
    onUpdate={() =>
    navigation.navigate("UpdateMedicineScreen", {
        medicineId: med._id,
        dependentId: dependent._id, 
      })
    }
    onDelete={() => Alert.alert("Delete Medicine", med.name)}
  />
))}


      </View>

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate("AddMedicine", { dependent: { id: dependent._id } })}
      >
        <Image
          source={require("../../assets/OpenClose.png")}
          style={styles.mainIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  medicineSection: { marginTop: 24 },
  mainButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    borderRadius: 30,
    padding: 12,
    elevation: 5,
  },
  mainIcon: { width: 24, height: 24, tintColor: "#fff" },
});

export default DependentEdit;
