import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HealthTracker from "../../Screens/HealthTracker/HealthTracker";

const Stack = createNativeStackNavigator();

export default function HealthTrackerStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HealthTracker" component={HealthTracker} />
    </Stack.Navigator>
  );
}
