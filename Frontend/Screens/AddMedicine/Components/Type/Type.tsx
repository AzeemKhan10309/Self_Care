import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./Type.styles";

const TypeInputUnitRow: React.FC<{
  selectedType: string;
  onSelectType: (val: string) => void;
  value: string;
  onChangeValue: (val: string) => void;
  unit: string;
}> = ({ selectedType, onSelectType, value, onChangeValue, unit }) => {
  const [open, setOpen] = useState(false);
  const types = ["Tablet", "Syrup", "Injection"];

  return (
    <View style={styles.rowContainer}>
      {/* Dropdown */}
      <View style={{ width: 100, position: "relative", zIndex: 10 }}>
        <TouchableOpacity
          onPress={() => setOpen(!open)}
          style={styles.dropdownButton}
        >
          <Text>{selectedType || "Select Type"}</Text>
        </TouchableOpacity>

        {open && (
          <View style={styles.dropdownOverlay}>
            {types.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  onSelectType(item);
                  setOpen(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Input for Dosage */}
      <TextInput
        style={styles.inputField}
        value={value}
        onChangeText={onChangeValue}
        placeholder="Enter value"
        keyboardType="numeric"
      />

      {/* Unit Text */}
      <Text style={styles.unitText}>{unit}</Text>
    </View>
  );
};

export default TypeInputUnitRow;
