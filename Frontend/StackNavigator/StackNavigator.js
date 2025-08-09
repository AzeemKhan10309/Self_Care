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
const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CollectInfo"
        component={CollectInfoScreen}
        options={{ title: "Your Info" }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: "Dashboard" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register" }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ title: "ForgotPassword" }}
      />

      <Stack.Screen
        name="OTPCode"
        component={OTPCodeScreen}
        options={{ title: "OTPCode" }}
      />

      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPassword}
        options={{ title: "Create New Password" }}
      />

      <Stack.Screen
        name="PasswordChanged"
        component={PasswordChange}
        options={{ title: "ChangePassword" }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Profile Screen" }}
      />

        <Stack.Screen
        name="Summary"
        component={Summary}
        options={{ title: "Summary" }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
