import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { apiRequest } from "../../../../Services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store";

interface UseUpdateMedicineProps {
  medicineId: string;
  dependentId?: string;
}

export const useUpdateMedicine = ({ medicineId, dependentId }: UseUpdateMedicineProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.id;

  const [medicine, setMedicine] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<"Tablet" | "Capsule" | "Syrup" | "Other">("Tablet");
  const [dosage, setDosage] = useState<number>(0);
  const [unit, setUnit] = useState<string>("mg");

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [times, setTimes] = useState<Date[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [reminderEnabled, setReminderEnabled] = useState<boolean>(false);
  const [reminderBefore, setReminderBefore] = useState<number>(10);
  const [repeat, setRepeat] = useState<"Daily" | "Weekly" | "None">("Daily");

  const [notes, setNotes] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const ownerType = dependentId ? "dependent" : "user";
        const ownerId = dependentId || userId;

        const response = await apiRequest(
          `/medicines/getallmedicinebyid?ownerType=${ownerType}&ownerId=${ownerId}&medicineId=${medicineId}`
        );

        const data = response.medicine;
        if (!data) throw new Error("Medicine data not found");

        setMedicine(data.name);
        setDescription(data.description);
        setType(data.type as "Tablet" | "Capsule" | "Syrup" | "Other");
        setDosage(data.dosage);
        setUnit(data.unit);

        setStartDate(new Date(data.startDate));
        setEndDate(new Date(data.endDate));

        setTimes(
          data.times.map((t: string) => {
            const [hours, minutes] = t.split(":").map(Number);
            const d = new Date();
            d.setHours(hours, minutes, 0, 0);
            return d;
          })
        );

        setSelectedDays(data.selectedDays);

        setReminderEnabled(data.reminderEnabled);
        setReminderBefore(data.reminderBefore);
        setRepeat(data.repeat ? "Daily" : "None");

        setNotes(data.notes);
        setImage(data.image || null);
      } catch (error) {
        console.log("Failed to fetch medicine:", error);
        Alert.alert("Error", "Failed to load medicine data");
      }
    };

    fetchMedicine();
  }, [medicineId, dependentId, userId]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleDay = (dayIndex: number) => {
    setSelectedDays(prev =>
      prev.includes(dayIndex)
        ? prev.filter(d => d !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  const handleAddTime = (time: Date) => setTimes([...times, time]);
  const handleEditTime = (index: number, time: Date) => {
    const updated = [...times];
    updated[index] = time;
    setTimes(updated);
  };
  const removeTime = (index: number) => setTimes(times.filter((_, i) => i !== index));
  const handleTimeChange = (time: Date) => {
    if (currentIndex !== null) handleEditTime(currentIndex, time);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const payload = {
        name: medicine,
        description,
        type,
        dosage,
        unit,
        startDate,
        endDate,
        times: times.map(t => t.toTimeString().slice(0, 5)), 
        selectedDays,
        reminderEnabled,
        reminderBefore,
        repeat: repeat === "Daily",
        notes,
        image,
      };

      await apiRequest(`/medicines/${medicineId}`, "PUT", payload);

      Alert.alert("Success", "Medicine updated successfully!");
      setLoading(false);
      return true;
    } catch (error) {
      console.log("Update failed:", error);
      Alert.alert("Error", "Failed to update medicine");
      setLoading(false);
      return false;
    }
  };

  return {
    medicine,
    setMedicine,
    description,
    setDescription,
    type,
    handleTypeSelect: (val: string) => setType(val as "Tablet" | "Capsule" | "Syrup" | "Other"),
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
    showTimePicker,
    setShowTimePicker,
    currentIndex,
    setCurrentIndex,
    handleTimeChange,
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
    pickImage,
    image,
    errors,
    loading,
    handleUpdate,
  };
};
