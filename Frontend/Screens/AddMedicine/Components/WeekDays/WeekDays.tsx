import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./WeekDays.styles";

interface WeekDaysProps {
  selectedDay?: number; // index of selected day (0=Mon, 6=Sun)
  onSelectDay?: (index: number) => void;
  showDate?: string; // optional "Today - Sat, 4 Dec"
}

const WeekDays: React.FC<WeekDaysProps> = ({ selectedDay, onSelectDay, showDate }) => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <View style={styles.container}>
      {showDate && <Text style={styles.dateText}>{showDate}</Text>}

      <View style={styles.daysRow}>
        {days.map((d, i) => (
          <TouchableOpacity key={i} onPress={() => onSelectDay?.(i)}>
            <Text
              style={[
                styles.day,
                i === selectedDay && { color: "#fff", backgroundColor: "#2563eb" },
              ]}
            >
              {d}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default WeekDays;
