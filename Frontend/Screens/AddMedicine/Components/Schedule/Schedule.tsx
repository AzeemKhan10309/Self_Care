import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import WeekDays from "../WeekDays/WeekDays";
import CustomTimePicker from "../CustomTimePicker/CustomTimePicker";
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
  selectedDays: number[];
  onToggleDay: (index: number) => void;
  errors: { [key: string]: string };
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
  errors,
}) => {
  const [customTimePickerVisible, setCustomTimePickerVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const openTimePicker = (index: number | null) => {
    setEditingIndex(index);
    setCustomTimePickerVisible(true);
  };

  const onTimeSelected = (date: Date) => {
    setCustomTimePickerVisible(false);
    handleTimeChange({ type: "set" }, date);
    setEditingIndex(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => {
            openTimePicker(null);
            handleAddTime();
          }}
          style={styles.addButton}
        >
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
          {errors.startDate && <Text style={styles.errorText}>{errors.startDate}</Text>}
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
            <TouchableOpacity onPress={() => { openTimePicker(i); handleEditTime(i); }} style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeTime(i)} style={styles.removeButton}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
        {errors.times && <Text style={styles.errorText}>{errors.times}</Text>}
      </View>

      <CustomTimePicker
        visible={customTimePickerVisible}
        initialTime={editingIndex !== null && times[editingIndex] ? times[editingIndex] : new Date()}
        onConfirm={onTimeSelected}
        onCancel={() => setCustomTimePickerVisible(false)}
      />

      <WeekDays selectedDays={selectedDays} onToggleDay={onToggleDay} showDate="" />
      {errors.selectedDays && <Text style={styles.errorText}>{errors.selectedDays}</Text>}
    </View>
  );
};

export default Schedule;
