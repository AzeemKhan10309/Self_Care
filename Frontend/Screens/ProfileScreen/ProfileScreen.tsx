import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./ProfileScreen.styles";
import ProfileHeader from "../../Components/Profile/Profile";
import BottomTab from "../../Components/BottomNavbar/BottomNavbar";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../Types/navigation";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
import { useNavigation } from "@react-navigation/native";
import { tabs } from "../../src/Constants/TabConfig";

const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("ProfileScreen");
  const navigation = useNavigation<NavigationProp>();

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    navigation.navigate(tabKey as keyof RootStackParamList);
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile"); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedContent}>
        <ProfileHeader/>

        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={handleEditProfile}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
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
      </View>

      {/* Bottom Tab */}
      <BottomTab
        activeTab={activeTab}
        onTabPress={handleTabPress}
        tabs={tabs}
      />
    </View>
  );
};

export default HomeScreen;
