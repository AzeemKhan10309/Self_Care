import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
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
    image,
    pickImage,
    handleSubmit,
    errors
  } = useAddDependent();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Dependent</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={{ color: "#777" }}>Select Picture</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
 {errors.name ? <Text style={{ color: "red" }}>{errors.name}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
{errors.name ? <Text style={{ color: "red" }}>{errors.name}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Relationship"
        value={relationship}
        onChangeText={setRelationship}
      />
{errors.relationship ? <Text style={{ color: "red" }}>{errors.relationship}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Dependent</Text>
      </TouchableOpacity>

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
