import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { apiRequest } from "../../../Services/api";

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

export const useDependent = (dependentId: string) => {
  const [dependent, setDependent] = useState<Dependent | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDependent = async () => {
    try {
      const response = await apiRequest(`/dependents/${dependentId}`);
      setDependent(response);

      const transformedMedicines = (response.medicines || []).map((med: any) => ({
        _id: med._id,
        name: med.name,
        dose: med.dosage.toString(),
        quantity: med.unit,
        time:
          med.times && med.times.length > 0
            ? med.times
                .map((t: string) => {
                  const date = new Date(t);
                  return isNaN(date.getTime())
                    ? t
                    : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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

  const deleteMedicine = async (medicineId: string) => {
    try {
      const response = await apiRequest(`/medicines/${medicineId}`, "DELETE");
      if ("error" in response) {
        Alert.alert("Error", response.message);
        return;
      }

      setMedicines((prev) => prev.filter((med) => med._id !== medicineId));
      Alert.alert("Success", "Medicine deleted successfully");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to delete medicine");
    }
  };

  useEffect(() => {
    fetchDependent();
  }, [dependentId]);

  return { dependent, medicines, loading, fetchDependent, deleteMedicine };
};
