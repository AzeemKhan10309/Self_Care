    import React, { useState } from "react";
    import { Modal, View, Text, TouchableOpacity} from "react-native";
    import { Picker } from "@react-native-picker/picker";
    import styles from "./CustomTimePicker.styles";
    interface Props {
    visible: boolean;
    initialTime: Date;
    onConfirm: (time: Date) => void;
    onCancel: () => void;
    }

    const CustomTimePicker: React.FC<Props> = ({ visible, initialTime, onConfirm, onCancel }) => {
    const initialHour = initialTime.getHours();
    const isPM = initialHour >= 12;
    const [hour, setHour] = useState(isPM ? initialHour - 12 || 12 : initialHour || 12);
    const [minute, setMinute] = useState(initialTime.getMinutes());
    const [ampm, setAmPm] = useState(isPM ? "PM" : "AM");

    const handleConfirm = () => {
        let h = ampm === "PM" ? (hour % 12) + 12 : hour % 12;
        const updatedDate = new Date(initialTime);
        updatedDate.setHours(h);
        updatedDate.setMinutes(minute);
        updatedDate.setSeconds(0);
        onConfirm(updatedDate);
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
            <View style={styles.container}>
            <Text style={styles.label}>SELECT TIME</Text>

            <View style={styles.timeRow}>
                <Picker
                selectedValue={hour}
                onValueChange={setHour}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode="dropdown"
                >
                {Array.from({ length: 12 }, (_, i) => (
                    <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
                ))}
                </Picker>

                <Text style={styles.colon}>:</Text>

                <Picker
                selectedValue={minute}
                onValueChange={setMinute}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode="dropdown"
                >
                {Array.from({ length: 60 }, (_, i) => (
                    <Picker.Item key={i} label={i.toString().padStart(2, "0")} value={i} />
                ))}
                </Picker>

                <View style={styles.ampmContainer}>
                <TouchableOpacity
                    onPress={() => setAmPm("AM")}
                    style={[styles.ampmButton, ampm === "AM" && styles.ampmSelected]}
                >
                    <Text style={[styles.ampmText, ampm === "AM" && styles.ampmTextSelected]}>AM</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setAmPm("PM")}
                    style={[styles.ampmButton, ampm === "PM" && styles.ampmSelected]}
                >
                    <Text style={[styles.ampmText, ampm === "PM" && styles.ampmTextSelected]}>PM</Text>
                </TouchableOpacity>
                </View>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={onCancel} style={styles.actionButton}>
                <Text style={styles.cancelText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirm} style={styles.actionButton}>
                <Text style={styles.okText}>OK</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>
    );
    };



    export default CustomTimePicker;
