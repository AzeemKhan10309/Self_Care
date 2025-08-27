import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../../Screens/Dashoard/Dashboard";
import AddMedicineScreen from "../../Screens/AddMedicine/AddMedicine";

const Stack = createNativeStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardScreen" component={Dashboard} />
      <Stack.Screen name="AddMedicineScreen" component={AddMedicineScreen} />
    </Stack.Navigator>
  );
}
