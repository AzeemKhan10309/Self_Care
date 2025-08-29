import { useState } from "react";
import { Alert } from "react-native";

export const useAddDependent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [relationship, setRelationship] = useState("");

  const handleSubmit = () => {
    if (!name || !age || !relationship) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const dependentData = {
      name,
      age,
      relationship,
    };

    console.log("Dependent Added:", dependentData);
    Alert.alert("Success", "Dependent added successfully");

    // Reset form
    setName("");
    setAge("");
    setRelationship("");
  };

  return {
    name,
    setName,
    age,
    setAge,
    relationship,
    setRelationship,
    handleSubmit,
  };
};
