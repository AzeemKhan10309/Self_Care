import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "././MainTabs";
import ForgotPassword from "../Screens/ForgotPassword/ForgotPassword";
import Alarm from "../Screens/Alarm/Alarm";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main Tabs */}
      <Stack.Screen name="Main" component={MainTabs} />
      
      {/* Global / modal screens */}
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Alarm" component={Alarm} />
    </Stack.Navigator>
  );
}
