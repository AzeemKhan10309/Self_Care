import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../Types/navigation";
import { useDashboardData } from "./Hooks/useDashboardData";

import { MedicationReminder } from "./Component/MedicineReminder/MedicineReminder";
import UpComingDose from "./Component/UpComingDose/UpcomingDose";
import BottomTab from "../../Components/BottomNavbar/BottomNavbar";
import ProfileHeader from "../../Components/Profile/Profile";
import { tabs } from "../../src/Constants/TabConfig";
import styles from "./Dashboard.styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Example dependents data
const dependentsSample = [
  { id: "1", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: "2", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [openFloating, setOpenFloating] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const { todayMedicines, nextDose, flatTimes, loading, markDose } =
    useDashboardData();

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    navigation.navigate(tabKey as keyof RootStackParamList);
  };

  const toggleFloatingButtons = () => setOpenFloating(!openFloating);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/Home-bg.png")}
          style={styles.headerBackground}
          resizeMode="cover"
        />
        <ProfileHeader />
        <Text style={styles.feeling}>How are you feeling today?</Text>
      </View>

      {/* Dependents Section */}
      <View style={{ marginVertical: 20, paddingHorizontal: 15 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: "#1F62E8",
            marginBottom: 10,
          }}
        >
          Dependents
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* + Button */}
          <TouchableOpacity
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
            onPress={() => navigation.navigate("AddDependent")}
          >
            <Text style={{ fontSize: 30, color: "#1976D2" }}>+</Text>
          </TouchableOpacity>

          {/* Existing dependents */}
          {dependentsSample.map((dep) => (
            <View
              key={dep.id}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
                borderWidth: 1,
                borderColor: "#ddd",
              }}
            >
              <Image
                source={{ uri: dep.avatar }}
                style={{ width: 65, height: 65, borderRadius: 32.5 }}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Upcoming Dose Section */}
      {nextDose ? (
        <UpComingDose
          title="Upcoming Dose"
          image={require("../../assets/pills.png")}
          doseName={nextDose.name}
          doseDetails={`${nextDose.dosage} ${nextDose.unit}`}
          doseDate={new Date().toLocaleDateString()}
          doseTime={nextDose.time}
        />
      ) : (
        <View style={styles.upcomingDoseContainer}>
          <Text style={styles.upcomingDose}>Upcoming Dose</Text>
          <View style={styles.doseCard}>
            <Text style={styles.doseDetails}>No medicine scheduled</Text>
          </View>
        </View>
      )}

      {/* Today's Reminders */}
      <View style={styles.todayReminderContainer}>
        <Text style={styles.reminderTitle}>Today's Reminders</Text>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : flatTimes.length === 0 ? (
          <Text>No medicines for today</Text>
        ) : (
          <FlatList
            data={flatTimes}
            keyExtractor={(item) => item.scheduledId}
            renderItem={({ item }) => (
              <MedicationReminder
                id={item.scheduledId}
                name={item.med.name}
                time={item.time}
                pills={`${item.med.dosage} ${item.med.unit}`}
                status={item.status}
                onComplete={() => markDose(item.scheduledId, "Taken")}
                onCancel={() => markDose(item.scheduledId, "Missed")}
              />
            )}
          />
        )}
      </View>

      {/* Floating Buttons */}
      <View style={[styles.fabContainer, { bottom: 100 }]}>
        {openFloating && (
          <>
            <TouchableOpacity
              style={[styles.childButton, { bottom: 140 }]}
              onPress={() => navigation.navigate("AddMedicine")}
            >
              <Image
                source={require("../../assets/Plus.png")}
                style={styles.childIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.childButton, { bottom: 70 }]}
              onPress={() => {
                const phoneNumber = "03054369480";
                Linking.openURL(`tel:${phoneNumber}`);
              }}
            >
              <Image
                source={require("../../assets/Call.png")}
                style={styles.childIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.mainButton} onPress={toggleFloatingButtons}>
          <Image
            source={require("../../assets/OpenClose.png")}
            style={styles.mainIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Tab */}
      <BottomTab activeTab={activeTab} onTabPress={handleTabPress} tabs={tabs} />
    </View>
  );
};

export default Dashboard;
