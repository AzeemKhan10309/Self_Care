import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import MedicationReminder from "../../Components/MedicineReminder/MedicineReminder";
import BottomTab from "../../Components/BottomNavbar/BottomNavbar";
import ProfileHeader from "../../Components/Profile/Profile";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../Types/navigation";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
import styles from "./Dashboard.styles";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home");
  const navigation = useNavigation<NavigationProp>();
  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    navigation.navigate(tabKey as keyof RootStackParamList);
  };
  const tabs = [
    {
      key: "Dashboard",
      label: "Home",
      icon: require("../../assets/Home.png"),
      focusedIcon: require("../../assets/Home-onclick.png"),
    },
    {
      key: "reminders",
      label: "Reminders",
      icon: require("../../assets/Today-medicine.png"),
      focusedIcon: require("../../assets/Today-medicine-onclick.png"),
    },
    {
      key: "health-tracker",
      label: "Health-Tracker",
      icon: require("../../assets/Health-tracker.png"),
      focusedIcon: require("../../assets/Health-tracker-onclick.png"),
    },
    {
      key: "ProfileScreen",
      label: "Profile",
      icon: require("../../assets/Profile-setting.png"),
      focusedIcon: require("../../assets/Profile-setting-onclick.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/Home-bg.png")}
          style={styles.headerBackground}
          resizeMode="cover"
        />
        <ProfileHeader
          name="Qasim"
          location="Lahore"
          profileImage={require("../../assets/Profile.png")}
        />{" "}
        <Text style={styles.feeling}>How are you feeling today?</Text>
      </View>

      <View style={styles.upcomingDoseContainer}>
        <Text style={styles.upcomingDose}>Upcoming Dose</Text>
        <View style={styles.doseCard}>
          <Image
            source={require("../../assets/pills.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.doseName}>Paracetamol</Text>
          <Text style={styles.doseDetails}>2 Pills</Text>
          <Text style={styles.doseDate}>8 Aug, 2025</Text>
          <View style={styles.bottomRow}>
            <View style={styles.timeBox}>
              <Text style={styles.timeText}>10:30 PM</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.todayReminderContainer}>
        <Text style={styles.reminderTitle}>Today's Reminders</Text>
                  <MedicationReminder
            name="panadol"
            time="10:30 PM"
            pills="2 Pills"
            onComplete={() => console.log("Completed")}
            onCancel={() => console.log("Cancelled")}
          />
     
      </View>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Image
            source={require("../../assets/Add.png")}
            style={styles.addicon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <BottomTab
        activeTab={activeTab}
        onTabPress={handleTabPress}
        tabs={tabs}
      />
    </View>
  );
};

export default Dashboard;
