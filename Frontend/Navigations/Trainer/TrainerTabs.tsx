import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ClientsStack from "../Trainer/stacks/ClientsStack";
import WorkoutsStack from "../Trainer/stacks/WorkoutsStack";
import NutritionStack from "../Trainer/stacks/NutritionStack";
import ProfileStack from "../Trainer/stacks/ProfileStack";

const Tab = createBottomTabNavigator();

export default function TrainerTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="ClientsTab" component={ClientsStack} />
      <Tab.Screen name="WorkoutsTab" component={WorkoutsStack} />
      <Tab.Screen name="NutritionTab" component={NutritionStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  );
}
