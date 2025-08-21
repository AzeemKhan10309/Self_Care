import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./WeekDays.styles";

interface WeekDaysProps {
  selectedDays: number[]; // multiple days (0=Mon ... 6=Sun)
  onToggleDay: (index: number) => void;
  showDate?: string;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WeekDays: React.FC<WeekDaysProps> = ({ selectedDays, onToggleDay, showDate }) => {
  return (
    <View style={styles.container}>
      {showDate ? <Text style={styles.dateText}>{showDate}</Text> : null}
      <View style={styles.daysRow}>
        {days.map((day, i) => {
          const isSelected = selectedDays.includes(i);
          return (
            <TouchableOpacity
              key={i}
              onPress={() => onToggleDay(i)}
              style={[styles.dayButton, isSelected && styles.selectedDay]}
            >
              <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default WeekDays;
