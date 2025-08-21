import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import WeekDays from "../WeekDays/WeekDays";
import styles from "./Schedule.styles";

interface Props {
  startDate: Date;
  setStartDate: (val: Date) => void;
  endDate: Date | null;
  setEndDate: (val: Date) => void;
  times: Date[];
  handleAddTime: () => void;
  handleEditTime: (index: number) => void;
  removeTime: (index: number) => void;
  showTimePicker: boolean;
  currentIndex: number | null;
  handleTimeChange: (e: any, d?: Date) => void;

  // NEW props for days
  selectedDays: number[];
  onToggleDay: (index: number) => void;
}

const Schedule: React.FC<Props> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  times,
  handleAddTime,
  handleEditTime,
  removeTime,
  showTimePicker,
  currentIndex,
  handleTimeChange,
  selectedDays,
  onToggleDay,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={handleAddTime} style={styles.addButton}>
          <Text style={styles.buttonText}>+ Add Time</Text>
        </TouchableOpacity>

        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Start Date:</Text>
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(e, d) => d && setStartDate(d)}
          />
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>End Date:</Text>
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            display="default"
            onChange={(e, d) => d && setEndDate(d)}
          />
        </View>
      </View>

      <View style={styles.timesContainer}>
        {times.map((t, i) => (
          <View key={i} style={styles.timeRow}>
            <Text style={styles.timeText}>
              {t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Text>
            <TouchableOpacity onPress={() => handleEditTime(i)} style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeTime(i)} style={styles.removeButton}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {showTimePicker && (
        <DateTimePicker
          value={currentIndex !== null && times[currentIndex] ? times[currentIndex] : new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleTimeChange}
        />
      )}

      {/* Week days selection */}
      <WeekDays selectedDays={selectedDays} onToggleDay={onToggleDay} showDate="" />
    </View>
  );
};

export default Schedule;
