import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

import MedicineInfo from "./Components/MedicineInfo/MedicineInfo";
import Reminder from "./Components/Reminder/Reminder";
import Schedule from "./Components/Schedule/Schedule";
import Input from "../../Components/Input/Input";
import styles from "./AddMedicine.styles";
import Button from "../../Components/Button/Button";
const AddMedicineScreen: React.FC = () => {
  const [medicine, setMedicine] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [dosage, setDosage] = useState(1);
  const [unit, setUnit] = useState("");

  const typeUnitMap: { [key: string]: string } = {
    Tablet: "Tablet",
    Syrup: "ml",
    Injection: "CC",
  };

  const handleTypeSelect = (selectedType: string) => {
    setType(selectedType);
    setUnit(typeUnitMap[selectedType] || "");
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [times, setTimes] = useState<Date[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddTime = () => {
    setCurrentIndex(times.length);
    setShowTimePicker(true);
  };

  const handleEditTime = (index: number) => {
    setCurrentIndex(index);
    setShowTimePicker(true);
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS !== "ios") setShowTimePicker(false);
    if (selectedTime && currentIndex !== null) {
      const newTimes = [...times];
      if (currentIndex === times.length) newTimes.push(selectedTime);
      else newTimes[currentIndex] = selectedTime;
      setTimes(newTimes);
      setCurrentIndex(null);
    } else {
      setShowTimePicker(false);
      setCurrentIndex(null);
    }
  };

  const removeTime = (index: number) => {
    setTimes(times.filter((_, i) => i !== index));
  };

  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderBefore, setReminderBefore] = useState(10);
  const [repeat, setRepeat] = useState(true);

  const [notes, setNotes] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSave = () => {
    const medicineData = {
      medicine,
      description,
      type,
      dosage,
      unit,
      startDate,
      endDate,
      times,
      reminderEnabled,
      reminderBefore,
      repeat,
      notes,
      image,
    };
    console.log("Saving Medicine:", medicineData);
    // TODO: send to backend API
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Medicine</Text>

      <MedicineInfo
        medicine={medicine}
        setMedicine={setMedicine}
        description={description}
        setDescription={setDescription}
        type={type}
        handleTypeSelect={handleTypeSelect}
        dosage={dosage}
        setDosage={setDosage}
        unit={unit}
      />

      <Schedule
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        times={times}
        handleAddTime={handleAddTime}
        handleEditTime={handleEditTime}
        removeTime={removeTime}
        showTimePicker={showTimePicker}
        currentIndex={currentIndex}
        handleTimeChange={handleTimeChange}
      />

      <Reminder
        reminderEnabled={reminderEnabled}
        setReminderEnabled={setReminderEnabled}
        reminderBefore={reminderBefore}
        setReminderBefore={setReminderBefore}
        repeat={repeat}
        setRepeat={setRepeat}
      />

      <Input placeholder="Notes" value={notes} onChangeText={setNotes} />
      <Button title="Select Image" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, marginTop: 10 }}
        />
      )}

      <Button title="Save Medicine" onPress={handleSave} />
    </View>
  );
};

export default AddMedicineScreen;
