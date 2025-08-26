import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Summary from "../../Screens/Summary/Summary";

const Stack = createNativeStackNavigator();

export default function SummaryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Summary" component={Summary} />
    </Stack.Navigator>
  );
}
