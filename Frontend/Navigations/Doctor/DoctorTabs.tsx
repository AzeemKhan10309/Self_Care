import React, { useState } from "react";
import { createBottomTabNavigator, BottomTabBarProps } from "@react-navigation/bottom-tabs";

import PatientsStack from "../Doctor/stacks/PatientsStack";
import AppointmentsStack from "../Doctor/stacks/AppointmentsStack";
import HealthMonitorStack from "../Doctor/stacks/HealthMonitorStack";
import ProfileStack from "../Doctor/stacks/ProfileStack";
import BottomTab from "../../Components/BottomNavbar/BottomNavbar";

import { DoctorTabParamList } from "../../Types/DoctorNavigation";
import { doctorTabs } from "../../src/Constants/DocConfig";

const Tab = createBottomTabNavigator<DoctorTabParamList>();

export default function DoctorTabs() {
  const [activeTab, setActiveTab] = useState<keyof DoctorTabParamList>("PatientsTab");

  const handleTabPress = (tabKey: keyof DoctorTabParamList) => {
    setActiveTab(tabKey);
  };

  return (
    <Tab.Navigator
      initialRouteName="PatientsTab"
      screenOptions={{ headerShown: false }}
      tabBar={(props: BottomTabBarProps) => {
        const activeRouteName = props.state.routeNames[props.state.index] as keyof DoctorTabParamList;
        return (
       <BottomTab
  activeTab={activeRouteName}
  onTabPress={(tabKey: string) => handleTabPress(tabKey as keyof DoctorTabParamList)}
  tabs={doctorTabs}
/>
        );
      }}
    >
      <Tab.Screen name="PatientsTab" component={PatientsStack} />
      <Tab.Screen name="AppointmentsTab" component={AppointmentsStack} />
      <Tab.Screen name="HealthMonitorTab" component={HealthMonitorStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  );
}
