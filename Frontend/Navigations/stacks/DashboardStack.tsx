import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../../Screens/Dashoard/Dashboard";
import AddMedicineScreen from "../../Screens/AddMedicine/AddMedicine";
import DependentEdit from "../../Screens/DependentEdit/DependentProfile";
import AddDependent from "../../Screens/AddDependents/AddDependent";
import UpdateMedicineScreen from "../../Screens/AddMedicine/UpdateMedicen/UpdateMedicineScreen";

export type DashboardStackParamList = {
  DashboardScreen: undefined; 
  AddDependent: undefined;
  DependentEdit: { id: string };
  AddMedicine: { dependent?: { id: string } };
  UpdateMedicineScreen: { medicineId: string; dependentId?: string }; 
};

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export default function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardScreen" component={Dashboard} />
      <Stack.Screen name="AddMedicine" component={AddMedicineScreen} />
      <Stack.Screen name="DependentEdit" component={DependentEdit} />
      <Stack.Screen name="AddDependent" component={AddDependent} />
      <Stack.Screen name="UpdateMedicineScreen" component={UpdateMedicineScreen} />
    </Stack.Navigator>
  );
}
