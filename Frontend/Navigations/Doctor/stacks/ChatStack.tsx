import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "../../../Screens/DoctorScreens/Chat/Chat";
import Inbox from "../../../Screens/DoctorScreens/Chat/Inbox/Inbox";
import Call from "../../../Screens/DoctorScreens/Chat/Call/Call"
import type { PatientsStackParamList } from "../../../Types/DoctorNavigation"; 


const Stack = createNativeStackNavigator<PatientsStackParamList>();

const ChatStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ChatScreen" component={Chat} />
    <Stack.Screen name="InboxScreen" component={Inbox} />
    <Stack.Screen name="CallScreen" component={Call} />

  </Stack.Navigator>
);

export default ChatStack;
