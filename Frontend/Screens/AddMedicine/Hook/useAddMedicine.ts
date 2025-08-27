import { useState } from "react";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { apiRequest } from "../../../Services/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../Types/navigation";

export const useAddMedicine = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "AddMedicine">>();

  const [medicine, setMedicine] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [dosage, setDosage] = useState(1);
  const [unit, setUnit] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [times, setTimes] = useState<Date[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderBefore, setReminderBefore] = useState(10);
  const [repeat, setRepeat] = useState(true);

  const [notes, setNotes] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({}); 

  const typeUnitMap: { [key: string]: string } = {
    Tablet: "Tablet",
    Syrup: "ml",
    Injection: "CC",
  };

  const handleTypeSelect = (selectedType: string) => {
    setType(selectedType);
    setUnit(typeUnitMap[selectedType] || "");
    setErrors((prev) => ({ ...prev, type: "" })); 
  };

  const toggleDay = (dayIndex: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayIndex) ? prev.filter((d) => d !== dayIndex) : [...prev, dayIndex]
    );
    setErrors((prev) => ({ ...prev, selectedDays: "" })); 
  };

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
      setErrors((prev) => ({ ...prev, times: "" })); 
    } else {
      setShowTimePicker(false);
      setCurrentIndex(null);
    }
  };

  const removeTime = (index: number) => {
    setTimes(times.filter((_, i) => i !== index));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

const validate = () => {
  const newErrors: { [key: string]: string } = {};

  if (!medicine.trim()) newErrors.medicine = "Medicine name is required";
  if (!type) newErrors.type = "Medicine type is required";
  if (dosage <= 0) newErrors.dosage = "Dosage must be greater than 0";

  if (!startDate) {
    newErrors.startDate = "Start date is required";
  }

  if (endDate && startDate && endDate < startDate) {
    newErrors.endDate = "End date cannot be before start date";
  }

  if (times.length === 0) newErrors.times = "Add at least one time";
  if (selectedDays.length === 0) newErrors.selectedDays = "Select at least one day";

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


  const handleSave = async () => {
    if (!validate()) return; 

    try {
      const formData = new FormData();

      formData.append("name", medicine);
      formData.append("description", description || "");
      formData.append("type", type);
      formData.append("dosage", String(dosage));
      formData.append("unit", unit);
      formData.append("startDate", startDate.toISOString());
      if (endDate) formData.append("endDate", endDate.toISOString());
      formData.append("reminderEnabled", String(reminderEnabled));
      formData.append("reminderBefore", String(reminderBefore));
      formData.append("repeat", String(repeat));
      formData.append("notes", notes || "");

      formData.append("times", JSON.stringify(times.map((t) => t.toISOString())));
      formData.append("selectedDays", JSON.stringify(selectedDays));

      if (image) {
        const filename = image.split("/").pop() || "photo.jpg";
        const ext = filename.split(".").pop();
        const mimeType = ext ? `image/${ext}` : "image/jpeg";
        const uri = Platform.OS === "ios" ? image.replace("file://", "") : image;

        formData.append("image", {
          uri,
          name: filename,
          type: mimeType,
        } as any);
      }

      const res = await apiRequest("/medicines/addMedicine", "POST", formData);

      if ("error" in res) {
        alert("Failed: " + res.message);
      } else {
        alert("✅ Medicine saved successfully!");
        navigation.navigate("Dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    }
  };

  return {
    medicine,
    setMedicine,
    description,
    setDescription,
    type,
    handleTypeSelect,
    dosage,
    setDosage,
    unit,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    times,
    handleAddTime,
    handleEditTime,
    removeTime,
    handleTimeChange,
    showTimePicker,
    currentIndex,
    selectedDays,
    toggleDay,
    reminderEnabled,
    setReminderEnabled,
    reminderBefore,
    setReminderBefore,
    repeat,
    setRepeat,
    notes,
    setNotes,
    image,
    pickImage,
    errors,          
    handleSave,
  };
};
