import React from "react";
import {
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import MedicineInfo from "./Components/MedicineInfo/MedicineInfo";
import Reminder from "./Components/Reminder/Reminder";
import Schedule from "./Components/Schedule/Schedule";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import styles from "./AddMedicine.styles";

import { useAddMedicine } from "./Hook/useAddMedicine";

const AddMedicineScreen: React.FC = () => {
  const hook = useAddMedicine();

  const content = (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Add Medicine</Text>

        <MedicineInfo
          medicine={hook.medicine}
          setMedicine={hook.setMedicine}
          description={hook.description}
          setDescription={hook.setDescription}
          type={hook.type}
          handleTypeSelect={hook.handleTypeSelect}
          dosage={hook.dosage}
          setDosage={hook.setDosage}
          unit={hook.unit}
        />

        <Schedule
          startDate={hook.startDate}
          setStartDate={hook.setStartDate}
          endDate={hook.endDate}
          setEndDate={hook.setEndDate}
          times={hook.times}
          handleAddTime={hook.handleAddTime}
          handleEditTime={hook.handleEditTime}
          removeTime={hook.removeTime}
          showTimePicker={hook.showTimePicker}
          currentIndex={hook.currentIndex}
          handleTimeChange={hook.handleTimeChange}
          selectedDays={hook.selectedDays}
          onToggleDay={hook.toggleDay}
        />

        <Reminder
          reminderEnabled={hook.reminderEnabled}
          setReminderEnabled={hook.setReminderEnabled}
          reminderBefore={hook.reminderBefore}
          setReminderBefore={hook.setReminderBefore}
          repeat={hook.repeat}
          setRepeat={hook.setRepeat}
        />

        <Input placeholder="Notes" value={hook.notes} onChangeText={hook.setNotes} />
        <Button title="Select Image" onPress={hook.pickImage} />
        {hook.image && (
          <Image
            source={{ uri: hook.image }}
            style={{ width: 100, height: 100, marginTop: 10 }}
          />
        )}

        <Button title="Save Medicine" onPress={hook.handleSave} />
      </ScrollView>
    </TouchableWithoutFeedback>
  );

  return Platform.OS === "ios" ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={80}
    >
      {content}
    </KeyboardAvoidingView>
  ) : (
    <View style={{ flex: 1 }}>{content}</View>
  );
};

export default AddMedicineScreen;
