import React from "react";
import { createBottomTabNavigator, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import DashboardStack from "./stacks/DashboardStack";
import SummaryStack from "./stacks/SummaryStack";
import HealthTrackerStack from "./stacks/HealthTrackerStack";
import ProfileStack from "./stacks/ProfileStack";

import BottomTab from "../Components/BottomNavbar/BottomNavbar";
import { tabs } from "../src/Constants/TabConfig";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
      tabBar={(props: BottomTabBarProps) => {
        // Currently active tab
        const activeRouteName = props.state.routeNames[props.state.index];

        return (
          <BottomTab
            activeTab={activeRouteName}
onTabPress={(key: string) => {
  if (activeRouteName === key) {
    props.navigation.navigate(key, { screen: undefined }); 
    return;
  }

  props.navigation.navigate(key);
}}

            tabs={tabs}
          />
        );
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Summary" component={SummaryStack} />
      <Tab.Screen name="HealthTracker" component={HealthTrackerStack} />
      <Tab.Screen name="ProfileScreen" component={ProfileStack} />
    </Tab.Navigator>
  );
}
