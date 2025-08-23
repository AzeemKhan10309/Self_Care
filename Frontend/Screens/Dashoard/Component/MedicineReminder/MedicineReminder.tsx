import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

interface MedicationReminderProps {
  id: string;
  name: string;
  time: string;
  pills: string;
  status?: "Taken" | "Missed" | "Pending";
  onComplete: (id: string) => void;
  onCancel: (id: string) => void;
}

export const MedicationReminder: React.FC<MedicationReminderProps> = ({
  id,
  name,
  time,
  pills,
  status,
  onComplete,
  onCancel,
}) => {
  const isDisabled = status === "Taken" || status === "Missed";

  const handleAction = (action: "Taken" | "Missed") => {
    if (isDisabled) return;
    if (action === "Taken") onComplete(id);
    if (action === "Missed") onCancel(id);
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
          onPress={() => handleAction("Missed")}
          disabled={isDisabled}
          style={[styles.button, status === "Missed" && { backgroundColor: "red" }]}
        >
          <Image
            source={require("../../../../assets/x.png")}
            style={[styles.xIcon, status === "Missed" && { tintColor: "#fff" }]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleAction("Taken")}
          disabled={isDisabled}
          style={[styles.button, status === "Taken" && { backgroundColor: "green" }]}
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