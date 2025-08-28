import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "../../../../Components/Input/Input";
import TypeInputUnitRow from "../Type/Type";

interface Props {
  medicine: string;
  setMedicine: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  type: string;
  handleTypeSelect: (val: string) => void;
  dosage: number;
  setDosage: (val: number) => void;
  unit: string;
  errors?: { [key: string]: string };
}

const MedicineInfo: React.FC<Props> = ({
  medicine,
  setMedicine,
  description,
  setDescription,
  type,
  handleTypeSelect,
  dosage,
  setDosage,
  unit,
  errors = {},
}) => {
  return (
    <View style={styles.section}>
      <Input placeholder="Name" value={medicine} onChangeText={setMedicine} />
      {errors.medicine && <Text style={styles.error}>{errors.medicine}</Text>}

      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TypeInputUnitRow
        selectedType={type}
        onSelectType={handleTypeSelect}
        value={dosage.toString()}
        onChangeValue={(val) => setDosage(Number(val))}
        unit={unit}
      />
      {errors.type && <Text style={styles.error}>{errors.type}</Text>}
      {errors.dosage && <Text style={styles.error}>{errors.dosage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginVertical: 10 },
  error: { color: "red", marginTop: 2 },
});

export default MedicineInfo;
