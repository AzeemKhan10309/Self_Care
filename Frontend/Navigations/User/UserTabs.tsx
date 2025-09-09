import React from "react";
import { createBottomTabNavigator, BottomTabBarProps } from "@react-navigation/bottom-tabs";

import DashboardStack from "../User/stacks/DashboardStack";
import SummaryStack from "../User/stacks/SummaryStack";
import HealthTrackerStack from "../User/stacks/HealthTrackerStack";
import ProfileStack from "../User/stacks/ProfileStack";

import BottomTab from "../../Components/BottomNavbar/BottomNavbar";
import { tabs } from "../../src/Constants/TabConfig";

const Tab = createBottomTabNavigator();

export default function UserTabs() {
  return (
    <Tab.Navigator
      initialRouteName="DashboardTab"
      screenOptions={{ headerShown: false }}
      tabBar={(props: BottomTabBarProps) => {
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
      <Tab.Screen name="DashboardTab" component={DashboardStack} />
      <Tab.Screen name="SummaryTab" component={SummaryStack} />
      <Tab.Screen name="DoctorTab" component={HealthTrackerStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  );
}
