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
  ActivityIndicator,
} from "react-native";

import MedicineInfo from "../Components/MedicineInfo/MedicineInfo";
import Schedule from "../Components/Schedule/Schedule";
import Reminder from "../Components/Reminder/Reminder";
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";
import styles from "../AddMedicine.styles";

import { useUpdateMedicine } from "./UpdateMedicenHook/UpdatedHook";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DashboardStackParamList } from "../../../Navigations/User/stacks/DashboardStack";

type Props = NativeStackScreenProps<DashboardStackParamList, "UpdateMedicineScreen">;

const UpdateMedicineScreen: React.FC<Props> = ({ route, navigation }) => {
  const { medicineId, dependentId } = route.params;
  const hook = useUpdateMedicine({ medicineId, dependentId });

  const handleSave = async () => {
    const success = await hook.handleUpdate();
    if (success) navigation.goBack();
  };

  const content = (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          {dependentId ? "Update Dependent Medicine" : "Update My Medicine"}
        </Text>

        {hook.loading && <ActivityIndicator size="large" color="#007bff" />}

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
          errors={hook.errors}
        />

<Schedule
  startDate={hook.startDate}
  setStartDate={hook.setStartDate}
  endDate={hook.endDate}
  setEndDate={hook.setEndDate}
  times={hook.times} 
  handleAddTime={() => hook.handleAddTime(new Date())}
  handleEditTime={(index) => {
    hook.setCurrentIndex(index);
    hook.setShowTimePicker(true);
  }}
  removeTime={hook.removeTime}
  showTimePicker={hook.showTimePicker}
  currentIndex={hook.currentIndex}
  handleTimeChange={hook.handleTimeChange} 
  selectedDays={hook.selectedDays}
  onToggleDay={hook.toggleDay}
  errors={hook.errors}
/>




        <Reminder
          repeat={hook.repeat !== "None"}
          setRepeat={(val: boolean) => hook.setRepeat(val ? "Daily" : "None")}
          reminderEnabled={hook.reminderEnabled}
          setReminderEnabled={hook.setReminderEnabled}
          reminderBefore={hook.reminderBefore}
          setReminderBefore={hook.setReminderBefore}
          errors={hook.errors}
        />

        <Input placeholder="Notes" value={hook.notes} onChangeText={hook.setNotes} />

        <Button title="Select Image" onPress={hook.pickImage} />
        {hook.image && (
          <Image
            source={{ uri: hook.image }}
            style={{ width: 100, height: 100, marginTop: 10 }}
            resizeMode="cover"
          />
        )}

        <Button
          title="Update Medicine"
          onPress={handleSave}
          disabled={hook.loading}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );

  return Platform.OS === "ios" ? (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={80}>
      {content}
    </KeyboardAvoidingView>
  ) : (
    <View style={{ flex: 1 }}>{content}</View>
  );
};

export default UpdateMedicineScreen;
