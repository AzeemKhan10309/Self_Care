import React, { useState } from "react";
import { View, Text, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../Types/navigation";
import { useRegister } from "../../Register/Hooks/useRegister";
import styles from "./TrainerCollect.styles";

// 1️⃣ Proper typing for props
type Props = NativeStackScreenProps<RootStackParamList, "TrainerCollectInfo">;

// 2️⃣ Plain function component (no React.FC)
export default function TrainerCollectInfoScreen({ route, navigation }: Props) {
  const { form } = route.params;
  const { handleRegister, loading } = useRegister();

  const [expertise, setExpertise] = useState("");
  const [certification, setCertification] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [experienceYears, setExperienceYears] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!expertise || !certification || !gymAddress || experienceYears === null) {
      alert("Please fill all fields");
      return;
    }

    handleRegister("trainer", form, { expertise, certification, gymAddress, experienceYears });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Trainer Profile</Text>

          <Input placeholder="Expertise" value={expertise} onChangeText={setExpertise} />
          <Input placeholder="Certification" value={certification} onChangeText={setCertification} />
          <Input placeholder="Gym Address" value={gymAddress} onChangeText={setGymAddress} />
          <Input
            placeholder="Experience in Years"
            value={experienceYears !== null ? experienceYears.toString() : ""}
            onChangeText={(text) => setExperienceYears(Number(text))}
            keyboardType="numeric"
          />

          <Button title={loading ? "Registering..." : "Register"} onPress={handleSubmit} disabled={loading} />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
