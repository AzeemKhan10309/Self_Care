import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorDashboard from "../../../Screens/DoctorScreens/DoctorDashboard/DoctorDashboard";

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DoctorDashboardScreen" component={DoctorDashboard} />
  </Stack.Navigator>
);

export default HomeStack;
