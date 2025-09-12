import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PatientsDashboard from "../../../Screens/DoctorScreens/Patient/Patient";
import PatientProfile from "../../../Screens/DoctorScreens/Patient/PatientProfile/PatientProfile";
const Stack = createNativeStackNavigator();

const PatientsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PatientsScreen" component={PatientsDashboard} />
    <Stack.Screen name="PatientProfile" component={PatientProfile} />

  </Stack.Navigator>
);

export default PatientsStack;
