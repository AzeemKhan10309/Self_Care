import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "././User/UserTabs";
import ForgotPassword from "../Screens/ForgotPassword/ForgotPassword";
import OTPCodeScreen from "../Screens/OTPCode/OTPCode";
import CreateNewPassword from "../Screens/CreateNewPassword/CreateNewPassword";
import PasswordChange from "../Screens/PasswordChanged/PasswordChanged";
import Login from "../Screens/Login/Login";
import Alarm from "../Screens/Alarm/Alarm";
import AddMedicineScreen from "../Screens/AddMedicine/AddMedicine";
import AddDependent from "../Screens/AddDependents/AddDependent";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="AddMedicine" component={AddMedicineScreen} />
      <Stack.Screen name="AddDependent" component={AddDependent} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTPCode" component={OTPCodeScreen} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
      <Stack.Screen name="PasswordChanged" component={PasswordChange} />
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="Alarm" component={Alarm} />
    </Stack.Navigator>
  );
}
