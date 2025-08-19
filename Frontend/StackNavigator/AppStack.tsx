import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../Screens/Dashoard/Dashboard";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";
import Summary from "../Screens/Summary/Component/Summary";
import EditProfile from "../Screens/EditProfile/EditProfile";
import Alarm from "../Screens/Alarm/Alarm";
import HealthTracker from "../Screens/HealthTracker/HealthTracker";
import AddMedicineScreen from "../Screens/AddMedicine/AddMedicine";
const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Summary" component={Summary} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Alarm" component={Alarm} />
      <Stack.Screen name="HealthTracker" component={HealthTracker} />
      <Stack.Screen name="AddMedicine" component={AddMedicineScreen} />

    </Stack.Navigator>
  );
}
