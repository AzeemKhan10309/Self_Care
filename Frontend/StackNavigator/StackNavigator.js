import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../Screens/Splash/Splash";
import CollectInfoScreen from "../Screens/CollectInfo/CollectInfoScreen";
import Login from "../Screens/Login/Login";
import Dashboard from "../Screens/Dashoard/Dashboard";
import Register from "../Screens/Register/Register";
import ForgotPassword from "../Screens/ForgotPassword/ForgotPassword";
import OTPCodeScreen from "../Screens/OTPCode/OTPCode";
import CreateNewPassword from "../Screens/CreateNewPassword/CreateNewPassword";
import PasswordChange from "../Screens/PasswordChanged/PasswordChanged";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";
import Summary from "../Screens/Summary/Component/Summary";
import EditProfile from "../Screens/EditProfile/EditProfile";
import Alarm from "../Screens/Alarm/Alarm";
import HealthTracker from "../Screens/HealthTracker/HealthTracker";
const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        name="CollectInfo"
        component={CollectInfoScreen}
      />

      <Stack.Screen
        name="Login"
        component={Login}
      />

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
      />
      <Stack.Screen
        name="Register"
        component={Register}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />

      <Stack.Screen
        name="OTPCode"
        component={OTPCodeScreen}
      />

      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPassword}
      />

      <Stack.Screen
        name="PasswordChanged"
        component={PasswordChange}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />

        <Stack.Screen
        name="Summary"
        component={Summary}
      />

        <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: "EditProfile" }}
      />

   <Stack.Screen
        name="Alarm"
        component={Alarm}
      />
      <Stack.Screen
        name="HealthTracker"
        component={HealthTracker}
/>
    </Stack.Navigator>
  );
}

export default StackNavigator;
