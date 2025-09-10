import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PatientsDashboard from "../../../Screens/DoctorScreens/Patient/Patient";

const Stack = createNativeStackNavigator();

const PatientsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PatientsScreen" component={PatientsDashboard} />
  </Stack.Navigator>
);

export default PatientsStack;
