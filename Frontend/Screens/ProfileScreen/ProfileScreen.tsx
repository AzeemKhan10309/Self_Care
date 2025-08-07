import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./ProfileScreen.styles";
import ProfileHeader from "../../Components/Profile/Profile";
import BottomTab from "../../Components/BottomNavbar/BottomNavbar";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../Types/navigation";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
import { useNavigation } from "@react-navigation/native";

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

const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("ProfileScreen");
  const navigation = useNavigation<NavigationProp>();
  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    navigation.navigate(tabKey as keyof RootStackParamList);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProfileHeader
          name="Qasim"
          location="Lahore"
          profileImage={require("../../assets/Profile.png")}
        />

        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.percentageCircle}>
          <Text style={styles.percentageText}>80%</Text>
        </View>

        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Text style={styles.penIcon}>✎</Text>
        </View>

        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Weight</Text>
            <Text style={styles.metricValue}>50kg</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Age</Text>
            <Text style={styles.metricValue}>28 year</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Height</Text>
            <Text style={styles.metricValue}>160 cm</Text>
          </View>
        </View>
      </ScrollView>
      <View>
        <BottomTab
          activeTab={activeTab}
          onTabPress={handleTabPress}
          tabs={tabs}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
