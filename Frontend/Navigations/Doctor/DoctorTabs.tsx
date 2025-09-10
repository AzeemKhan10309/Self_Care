import React, { useState } from "react";
import { createBottomTabNavigator, BottomTabBarProps } from "@react-navigation/bottom-tabs";

import HomeStack from "./stacks/HomeStack"
import PatientsStack from "./stacks/PatientsStack";
import ChatStack from "./stacks/ChatStack";
import ProfileStack from "../Doctor/stacks/ProfileStack";
import BottomTab from "../../Components/BottomNavbar/BottomNavbar";

import { DoctorTabParamList } from "../../Types/DoctorNavigation";
import { doctorTabs } from "../../src/Constants/DocConfig";

const Tab = createBottomTabNavigator<DoctorTabParamList>();

export default function DoctorTabs() {
  const [activeTab, setActiveTab] = useState<keyof DoctorTabParamList>("Patients");

  const handleTabPress = (tabKey: keyof DoctorTabParamList) => {
    setActiveTab(tabKey);
  };

  return (
    <Tab.Navigator
      initialRouteName="Patients"
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
<Tab.Screen name="Home" component={HomeStack} />
<Tab.Screen name="Patients" component={PatientsStack} />
<Tab.Screen name="Chat" component={ChatStack} />
<Tab.Screen name="Profile" component={ProfileStack} />


    </Tab.Navigator>
  );
}
