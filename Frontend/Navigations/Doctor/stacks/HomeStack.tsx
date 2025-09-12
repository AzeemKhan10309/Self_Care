import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorDashboard from "../../../Screens/DoctorScreens/DoctorDashboard/DoctorDashboard";

export type RootStackParamList = {
  DoctorDashboardScreen: undefined;
  AppointmentsScreen: { defaultTab?: "Upcoming" | "Pending" | "Favourites" };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DoctorDashboardScreen" component={DoctorDashboard} />
  </Stack.Navigator>
);

export default HomeStack;
