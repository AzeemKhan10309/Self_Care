import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { apiRequest } from "../../../Services/api"; 
import { useSelector} from "react-redux";
import { RootState } from "../../../Redux/Store";


export const useAddDependent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [relationship, setRelationship] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { user } = useSelector((state: RootState) => state.auth);

  const userId = user?.id;

  const validateField = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = "Name should only contain letters";
        }
        break;

      case "age":
        if (!value.trim()) {
          error = "Age is required";
        } else {
          const numericAge = Number(value);
          if (isNaN(numericAge) || numericAge <= 0 || numericAge > 120) {
            error = "Age must be between 1 and 120";
          }
        }
        break;

      case "relationship":
        if (!value.trim()) {
          error = "Relationship is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = "Relationship should only contain letters";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === "";
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

 const handleSubmit = async () => {
  const isNameValid = validateField("name", name);
  const isAgeValid = validateField("age", age);
  const isRelationshipValid = validateField("relationship", relationship);

  if (!isNameValid || !isAgeValid || !isRelationshipValid) {
    Alert.alert("Validation Error", "Please fix the errors before submitting");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", name.trim());
    formData.append("age", String(Number(age))); 
    formData.append("relation", relationship.trim()); 

    if (image) {
      formData.append("Dependentpicture", {
        uri: image,
        name: "dependent.jpg",
        type: "image/jpeg",
      } as any);
    }

    console.log("Submitting Dependent with data:", {
      userId,
      name: name.trim(),
      age: Number(age),
      relation: relationship.trim(),
    });

    const res = await apiRequest("/dependents/", "POST", formData);

    if ("error" in res) {
      Alert.alert("Error", res.message);
      return;
    }

    Alert.alert("Success", "Dependent added successfully");
    console.log("✅ Dependent Added:", res);

    setName("");
    setAge("");
    setRelationship("");
    setImage(null);
    setErrors({});
  } catch (error) {
    console.error("❌ Submit Error:", error);
    Alert.alert("Error", "Failed to add dependent");
  }
};


  return {
    name,
    setName: (val: string) => {
      setName(val);
      validateField("name", val);
    },
    age,
    setAge: (val: string) => {
      setAge(val);
      validateField("age", val);
    },
    relationship,
    setRelationship: (val: string) => {
      setRelationship(val);
      validateField("relationship", val);
    },
    image,
    pickImage,
    handleSubmit,
    errors, 
  };
};
