import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/Login/Login";
import Register from "../Screens/Register/Register";
import CollectInfoScreen from "../Screens/CollectInfo/CollectInfoScreen";
import DoctorCollect from "../Screens/CollectInfo/DoctoreCollect/DoctorCollect";
import TrainerCollectInfoScreen from "../Screens/CollectInfo/TrainerCollect/TrainerCollect";
import ForgotPassword from "../Screens/ForgotPassword/ForgotPassword";
import OTPCodeScreen from "../Screens/OTPCode/OTPCode";
import CreateNewPassword from "../Screens/CreateNewPassword/CreateNewPassword";
import PasswordChange from "../Screens/PasswordChanged/PasswordChanged";
import { RootStackParamList } from "../Types/navigation";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="CollectInfo" component={CollectInfoScreen} />
      <Stack.Screen name="DoctorCollectInfo" component={DoctorCollect} />
      <Stack.Screen name="TrainerCollectInfo" component={TrainerCollectInfoScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTPCode" component={OTPCodeScreen} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
      <Stack.Screen name="PasswordChanged" component={PasswordChange} />
    </Stack.Navigator>
  );
}
