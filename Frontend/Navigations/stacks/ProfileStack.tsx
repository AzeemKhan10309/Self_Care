import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../Screens/ProfileScreen/ProfileScreen";
import EditProfile from "../../Screens/EditProfile/EditProfile";
import MedicineScreen from "../../Screens/AddMedicine/UpdateMedicen/UpdateMedicineScreen";
export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  UpdateMedicineScreen: { medicineId: string; dependentId?: string };
};
const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="UpdateMedicineScreen" component={MedicineScreen} />

    </Stack.Navigator>
  );
}
