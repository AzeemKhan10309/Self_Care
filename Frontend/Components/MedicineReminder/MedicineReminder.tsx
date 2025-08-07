import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

interface MedicationReminderProps {
  name: string;
  time: string;
  pills: string;
  onComplete: () => void;
  onCancel: () => void;
}

const MedicationReminder: React.FC<MedicationReminderProps> = ({
  name,
  time,
  pills,
  onComplete,
  onCancel,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.medName}>{name}</Text>
        <View style={styles.inRow}>
          <View style={styles.timeContainer}>
            <Image
              source={require("../../assets/clock-outline.png")}
              style={styles.timeIcon}
              resizeMode="contain"
            />
            <Text style={styles.medTime}>{time}</Text>
          </View>

          <View style={styles.PillContainer}>
            <Image
              source={require("../../assets/pill.png")}
              style={styles.PillIcon}
              resizeMode="contain"
            />
            <Text style={styles.medPills}>{pills} </Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={onCancel} style={styles.button}>
          <Image
            source={require("../../assets/x.png")}
            style={styles.xIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onComplete} style={styles.button}>
          <Image
            source={require("../../assets/check.png")}
            style={styles.checkIcon}
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
  infoContainer: {
    flex: 1,
  },
  medName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  medDose: {
    fontSize: 14,
    color: "#555",
  },

  medPills: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
  },

  xIcon: {
    width: 20,
    height: 20,
  },
  checkIcon: {
    width: 24,
    height: 24,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  timeIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  medTime: {
    fontSize: 14,
    color: "#888",
  },
  PillContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  PillIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  inRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
});

export default MedicationReminder;
