import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./Type.styles";

interface Props {
  selectedType: string;
  onSelectType: (val: string) => void;
  value: string;
  onChangeValue: (val: string) => void;
  unit: string;
  errorType?: string;
  errorDosage?: string;
}

const TypeInputUnitRow: React.FC<Props> = ({
  selectedType,
  onSelectType,
  value,
  onChangeValue,
  unit,
  errorType,
  errorDosage,
}) => {
  const [open, setOpen] = useState(false);
  const types = ["Tablet", "Syrup", "Injection"];

  return (
    <View style={styles.rowContainer}>
      <View style={{ width: 100, position: "relative", zIndex: 10 }}>
        <TouchableOpacity onPress={() => setOpen(!open)} style={styles.dropdownButton}>
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
        {errorType && <Text style={styles.errorText}>{errorType}</Text>}
      </View>

      <TextInput
        style={styles.inputField}
        value={value}
        onChangeText={onChangeValue}
        placeholder="Enter value"
        keyboardType="numeric"
      />
      <Text style={styles.unitText}>{unit}</Text>
      {errorDosage && <Text style={styles.errorText}>{errorDosage}</Text>}
    </View>
  );
};

export default TypeInputUnitRow;
