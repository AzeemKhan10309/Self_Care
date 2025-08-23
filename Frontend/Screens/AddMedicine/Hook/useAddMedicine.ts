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
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const toggleDay = (dayIndex: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayIndex) ? prev.filter((d) => d !== dayIndex) : [...prev, dayIndex]
    );
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

 const handleSave = async () => {
  try {
    const formData = new FormData();

    // Append all text fields
    formData.append("medicine", medicine);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("dosage", String(dosage));
    formData.append("unit", unit);
    formData.append("startDate", startDate.toISOString());
    if (endDate) formData.append("endDate", endDate.toISOString());
    formData.append("times", JSON.stringify(times.map((t) => t.toISOString())));
    formData.append("reminderEnabled", String(reminderEnabled));
    formData.append("reminderBefore", String(reminderBefore));
    formData.append("repeat", String(repeat));
    formData.append("notes", notes);
    formData.append("selectedDays", JSON.stringify(selectedDays));

    // Append image
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

console.log("FormData:", formData);
   const res = await apiRequest("/medicines/addMedicine", "POST", formData);
console.log("Response:", res);

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
    // state
    medicine, setMedicine,
    description, setDescription,
    type, handleTypeSelect,
    dosage, setDosage,
    unit,
    startDate, setStartDate,
    endDate, setEndDate,
    times, handleAddTime, handleEditTime, removeTime, handleTimeChange,
    showTimePicker, currentIndex,
    selectedDays, toggleDay,
    reminderEnabled, setReminderEnabled,
    reminderBefore, setReminderBefore,
    repeat, setRepeat,
    notes, setNotes,
    image, pickImage,
    handleSave
  };
};
