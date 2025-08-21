
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { apiRequest } from "../../../../Services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store";

interface MedicationReminderProps {
  id: string;          
  name: string;
  time: string;
  pills: string;
  status?: "Taken" | "Missed";  
  id: string;          // medicineId
  name: string;
  time: string;
  pills: string;
  status: "Taken" | "Missed" | undefined;  
  onComplete: (id: string) => void;
  onCancel: (id: string) => void;
}

const MedicationReminder: React.FC<MedicationReminderProps> = ({
  id,
  name,
  time,
  pills,
  status,
  onComplete,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.id;

  const isDisabled = loading || !userId || status === "Taken" || status === "Missed";

  const handleComplete = async () => {
    if (status || !userId) return; 
    setLoading(true);
    try {
      onComplete(id); // parent state update
  // Get user from Redux
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?._id;

  // Disable buttons if userId missing, loading, or already Taken/Missed
  const isDisabled = loading || !userId || status === "Taken" || status === "Missed";

  const handleComplete = async () => {
    if (status || !userId) return; // prevent double marking or missing user
    setLoading(true);
    try {
      onComplete(id);
      const payload = {
        medicineId: id,
        userId,
        dependentId: null,
        time: new Date().toISOString(),
        status: "Taken",
      };
      console.log("Sending dose log:", payload);
      await apiRequest("/doselog/", "POST", payload);
    } catch (err) {
      console.error("Error logging dose:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (status || !userId) return; 
    setLoading(true);
    try {
      onCancel(id); // parent state update
    if (status || !userId) return; // prevent double marking or missing user
    setLoading(true);
    try {
      onCancel(id);
      const payload = {
        medicineId: id,
        userId,
        dependentId: null,
        time: new Date().toISOString(),
        status: "Missed",
      };
      console.log("Sending dose log:", payload);
      await apiRequest("/doselog/", "POST", payload);
    } catch (err) {
      console.error("Error logging dose:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.medName,
            status === "Taken" && { color: "green" },
            status === "Missed" && { color: "red" },
          ]}
        >
          {name}
        </Text>
        <View style={styles.inRow}>
          <View style={styles.timeContainer}>
            <Image
              source={require("../../../../assets/clock-outline.png")}
              style={styles.timeIcon}
              resizeMode="contain"
            />
            <Text style={styles.medTime}>{time}</Text>
          </View>

          <View style={styles.PillContainer}>
            <Image
              source={require("../../../../assets/pill.png")}
              style={styles.PillIcon}
              resizeMode="contain"
            />
            <Text style={styles.medPills}>{pills}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={handleCancel}
          disabled={isDisabled}
          style={[
            styles.button,
            status === "Missed" && { backgroundColor: "red" },
          ]}
        >
          <Image
            source={require("../../../../assets/x.png")}
            style={[styles.xIcon, status === "Missed" && { tintColor: "#fff" }]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleComplete}
          disabled={isDisabled}
          style={[
            styles.button,
            status === "Taken" && { backgroundColor: "green" },
          ]}
        >
          <Image
            source={require("../../../../assets/check.png")}
            style={[styles.checkIcon, status === "Taken" && { tintColor: "#fff" }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MedicationReminder;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  infoContainer: { flex: 1 },
  medName: { fontSize: 18, fontWeight: "bold" },
  medPills: { fontSize: 14, color: "#333", fontWeight: "bold" },
  actionsContainer: { flexDirection: "row", alignItems: "center" },
  button: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
  },
  xIcon: { width: 20, height: 20 },
  checkIcon: { width: 24, height: 24 },
  timeContainer: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  timeIcon: { width: 16, height: 16, marginRight: 5 },
  medTime: { fontSize: 14, color: "#888" },
  PillContainer: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  PillIcon: { width: 16, height: 16, marginRight: 5 },
  inRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
});
