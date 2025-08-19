import React from "react";
import { Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface TimePickerProps {
  value: Date; 
  onChange: (date: Date) => void; 
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <DateTimePicker
      value={value}
      mode="time"
      display={Platform.OS === "ios" ? "spinner" : "clock"} // spinner = scroll wheel
      onChange={handleChange}
    />
  );
};

export default TimePicker;
