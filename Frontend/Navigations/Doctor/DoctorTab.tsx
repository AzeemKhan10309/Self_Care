import React from "react";
import { createBottomTabNavigator, BottomTabBarProps } from "@react-navigation/bottom-tabs";

import HomeStack from "./stacks/HomeStack";
import PatientsStack from "./stacks/PatientsStack";
import DoctorProfile from "../Doctor/stacks/ProfileStack";

import BottomTab from "../../Components/BottomNavbar/BottomNavbar";
import { doctorTabs } from "../../src/Constants/DocConfig";

const Tab = createBottomTabNavigator();

export default function DoctorTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
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
            tabs={doctorTabs}
          />
        );
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="PatientsTab" component={PatientsStack} />
      <Tab.Screen name="DoctorProfileTab" component={DoctorProfile} />
    </Tab.Navigator>
  );
}
