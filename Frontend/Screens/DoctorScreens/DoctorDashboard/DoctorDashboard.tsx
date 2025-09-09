import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import BottomTab from "../../../Components/BottomNavbar/BottomNavbar";
import { doctorTabs } from "../../../src/Constants/DocConfig";
import { DoctorStackParamList, DoctorTabParamList } from "../../../Types/DoctorNavigation";

// Navigation type
type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList, "DoctorDashboard">;

const DoctorDashboard: React.FC = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  const [activeTab, setActiveTab] = useState<keyof DoctorTabParamList>("PatientsTab");

  // Typed handler
  const handleTabPress = (tabKey: keyof DoctorTabParamList) => {
    setActiveTab(tabKey);
    navigation.navigate("DoctorTabs", { screen: tabKey });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Doctor Dashboard</Text>
        <Text style={styles.subtitle}>Current tab: {activeTab}</Text>
      </View>

      {/* Type cast here fixes TS error */}
      <BottomTab
        activeTab={activeTab}
        onTabPress={(tabKey: string) => handleTabPress(tabKey as keyof DoctorTabParamList)}
        tabs={doctorTabs}
      />
    </View>
  );
};

export default DoctorDashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
  subtitle: { fontSize: 16, marginTop: 8 },
});
