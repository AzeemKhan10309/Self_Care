import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAddDependent } from "./Hook/useAddDependent";
import { styles } from "./AddDependent.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  AddDependent: undefined;
  AddMedicine: undefined;
};

const AddDependent: React.FC = () => {
  const {
    name,
    setName,
    age,
    setAge,
    relationship,
    setRelationship,
    handleSubmit,
  } = useAddDependent();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Dependent</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Relationship"
        value={relationship}
        onChangeText={setRelationship}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Dependent</Text>
      </TouchableOpacity>

      {/* Add Medicine Button */}
      <TouchableOpacity
        style={[styles.button, { marginTop: 15, backgroundColor: "#2196F3" }]}
        onPress={() => navigation.navigate("AddMedicine")}
      >
        <Text style={styles.buttonText}>Add Medicine</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddDependent;
