import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorDashboard from "../../Screens/DoctorScreens/DoctorDashboard/DoctorDashboard";
import DoctorTabs from "./DoctorTabs";

const Stack = createNativeStackNavigator();

export default function DoctorStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* First screen after login */}
      <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />

      {/* Bottom tabs for further navigation */}
      <Stack.Screen name="DoctorTabs" component={DoctorTabs} />
    </Stack.Navigator>
  );
}
