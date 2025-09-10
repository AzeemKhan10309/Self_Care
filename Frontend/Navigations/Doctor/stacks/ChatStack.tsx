import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "../../../Screens/DoctorScreens/Chat/Chat";

const Stack = createNativeStackNavigator();

const PatientsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ChatScreen" component={Chat} />
  </Stack.Navigator>
);

export default PatientsStack;