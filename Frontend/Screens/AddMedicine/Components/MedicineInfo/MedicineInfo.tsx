import React from "react";
import { View, StyleSheet } from "react-native";
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
}) => {
  return (
    <View style={styles.section}>
      <Input placeholder="Name" value={medicine} onChangeText={setMedicine} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginVertical: 10 },
});

export default MedicineInfo;
