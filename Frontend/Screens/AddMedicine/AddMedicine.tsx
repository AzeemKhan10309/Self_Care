import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Switch,
} from "react-native";
import Input from "../../Components/Input/Input";
import styles from "./AddMedicine.styles";
import TimePicker from "./Components/TimePicker/TimePicker";
import WeekDays from "./Components/WeekDays/WeekDays";

const AddMedicineScreen: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [medicine, setMedicine] = useState("");
    const [dose, setDose] = useState(1);
    const [alarm, setAlarm] = useState(true);
    const [vibration, setVibration] = useState(true);
    const [snooze, setSnooze] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Medicine</Text>

            <View style={styles.timepicker}>

                <TimePicker value={time} onChange={setTime} />
            </View>


            {/* Date & Days */}
      
<WeekDays
  selectedDay={5} // Saturday
  onSelectDay={(i) => console.log("Selected Day:", i)}
  showDate="Today - Sat, 4 Dec"
/>
            {/* Medicine Name */}
            <Input
                placeholder="Add Medicine Name"
                value={medicine}
                onChangeText={setMedicine}
            />

            {/* Dose */}
            <View style={styles.doseContainer}>
                <TouchableOpacity
                    onPress={() => setDose(Math.max(1, dose - 1))}
                    style={styles.doseButton}
                >
                    <Text style={styles.doseButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.doseValue}>{dose}</Text>
                <TouchableOpacity
                    onPress={() => setDose(dose + 1)}
                    style={styles.doseButton}
                >
                    <Text style={styles.doseButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Alarm Toggle */}
<View style={styles.row}>
  <Text style={styles.label}>
    Alarm sound{"\n"}
    <Text style={styles.subLabel}>Homecoming</Text>
  </Text>
  <Switch
    value={snooze}
    onValueChange={setSnooze}
    trackColor={{ false: "#F6F6F6", true: "#2563eb" }}
    thumbColor={snooze ? "#f4f3f4" : "#f4f3f4"}
    ios_backgroundColor="#F6F6F6"
  />
</View>

{/* Vibration Toggle */}
<View style={styles.row}>
  <Text style={styles.label}>
    Vibration{"\n"}
    <Text style={styles.subLabel}>Basic call</Text>
  </Text>
  <Switch
    value={snooze}
    onValueChange={setSnooze}
    trackColor={{ false: "#F6F6F6", true: "#2563eb" }}
    thumbColor={snooze ? "#f4f3f4" : "#f4f3f4"}
    ios_backgroundColor="#F6F6F6"
  />
</View>

{/* Snooze Toggle */}
<View style={styles.row}>
  <Text style={styles.label}>
    Snooze{"\n"}
    <Text style={styles.subLabel}>5 minutes, 3 times</Text>
  </Text>
  <Switch
    value={snooze}
    onValueChange={setSnooze}
    trackColor={{ false: "#F6F6F6", true: "#2563eb" }}
    thumbColor={snooze ? "#f4f3f4" : "#f4f3f4"}
    ios_backgroundColor="#F6F6F6"
  />
</View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add Medicine</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddMedicineScreen;
