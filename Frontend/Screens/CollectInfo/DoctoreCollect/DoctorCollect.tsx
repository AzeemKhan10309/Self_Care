import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";
import styles from "./Doctor.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/Store";
import { setCollectInfo } from "../../../Redux/CollectInfoSlice";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useRegister } from "../../Register/Hooks/useRegister";

interface DoctorRouteParams {
  form: {
    name: string;
    username: string;
    email: string;
    password: string;
    phone: string;
  };
  role: "doctor";
}

const DoctorCollectInfoScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as DoctorRouteParams | undefined;

  if (!routeParams || !routeParams.form || !routeParams.role) {
    console.error("Missing route params in DoctorCollectInfoScreen");
    return null; // prevent screen from rendering
  }

  const { form, role } = routeParams;

  const collectInfo = useSelector((state: RootState) => state.collectInfo);

  const [specialization, setSpecialization] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [qualifications, setQualifications] = useState("");

  const { loading, handleRegister } = useRegister();

  const handleSubmit = () => {
    const fullCollectInfo = {
      ...collectInfo,
      specialization,
      clinicAddress,
      experienceYears: Number(experienceYears),
      qualifications,
    };

    dispatch(setCollectInfo(fullCollectInfo));

    // Always pass role explicitly
    handleRegister(role, form, fullCollectInfo);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Doctor Profile Information</Text>

      <Input placeholder="Specialization" value={specialization} onChangeText={setSpecialization} />
      <Input placeholder="Clinic Address" value={clinicAddress} onChangeText={setClinicAddress} />
      <Input placeholder="Years of Experience" value={experienceYears} onChangeText={setExperienceYears} keyboardType="numeric" />
      <Input placeholder="Qualifications" value={qualifications} onChangeText={setQualifications} />

      <Button
        title={loading ? "Registering Doctor..." : "Complete Registration"}
        onPress={handleSubmit}
        disabled={loading}
      />
    </ScrollView>
  );
};

export default DoctorCollectInfoScreen;
