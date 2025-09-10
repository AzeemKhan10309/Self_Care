import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorProfile from "../../../Screens/DoctorScreens/DoctorProfile/DoctorProfile";

const Stack = createNativeStackNavigator();

const PatientsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DoctorProfileScreen" component={DoctorProfile} />
  </Stack.Navigator>
);

export default PatientsStack;
