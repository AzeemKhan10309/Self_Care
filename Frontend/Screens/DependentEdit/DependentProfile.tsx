import React from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DependentCard from "./DependentCard/DependentCard";
import MedicineCard from "./MedicenCard/MedicenCard";
import type { DashboardStackParamList } from "../../Navigations/User/stacks/DashboardStack";
import { useDependent } from "./Hook/useDependent";
import styles from "./DependentProfile.styles";
const BACKEND_IP = "192.168.18.223:5000";

type Props = NativeStackScreenProps<DashboardStackParamList, "DependentEdit">;

const DependentEdit = ({ route, navigation }: Props) => {
  const { id } = route.params;

  const { dependent, medicines, loading, deleteMedicine } = useDependent(id);

  const getImageUri = (path?: string) => {
    if (!path) return "https://via.placeholder.com/100";

    let cleanPath = path.replace(/\\/g, "/");
    if (!cleanPath.includes("/dependents/")) {
      cleanPath = cleanPath.replace("/uploads/", "");
      cleanPath = `/uploads/dependents/${cleanPath}`;
    }

    return `http://${BACKEND_IP}${cleanPath}`;
  };

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;

  if (!dependent)
    return (
      <View style={styles.centered}>
        <Text>No dependent found</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <DependentCard
        name={dependent.name}
        relationship={dependent.relation}
        age={dependent.age}
        imageUri={getImageUri(dependent.picture)}
      />

      <View style={styles.medicinesContainer}>
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
            onDelete={() =>
              Alert.alert("Delete Medicine", `Are you sure you want to delete ${med.name}?`, [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => deleteMedicine(med._id) },
              ])
            }
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddMedicine", { dependent: { id: dependent._id } })}
      >
        <Image source={require("../../assets/OpenClose.png")} style={styles.addButtonImage} />
      </TouchableOpacity>
    </ScrollView>
  );
};



export default DependentEdit;
