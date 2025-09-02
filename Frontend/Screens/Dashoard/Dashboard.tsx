import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../Types/navigation"; 
import { useDashboardData } from "./Hooks/useDashboardData";
import Dependents from "./Component/Dependent/Dependents";
import { MedicationReminder } from "./Component/MedicineReminder/MedicineReminder";
import UpComingDose from "./Component/UpComingDose/UpcomingDose";
import BottomTab from "../../Components/BottomNavbar/BottomNavbar";
import ProfileHeader from "../../Components/Profile/Profile";
import { tabs } from "../../src/Constants/TabConfig";
import styles from "./Dashboard.styles";

type Nav = NativeStackNavigationProp<RootStackParamList>;

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [openFloating, setOpenFloating] = useState(false);
  const navigation = useNavigation<Nav>();

  const { todayMedicines, nextDose, flatTimes, loading, markDose } =
    useDashboardData();

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    navigation.navigate(tabKey as keyof RootStackParamList); 
  };

  const toggleFloatingButtons = () => setOpenFloating(!openFloating);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/Home-bg.png")}
          style={styles.headerBackground}
          resizeMode="cover"
        />
        <ProfileHeader />
        <Text style={styles.feeling}>How are you feeling today?</Text>
      </View>

      <View style={{ marginVertical: 20, paddingHorizontal: 15 }}>
        <Dependents showTitle={true} showAddButton={true}  />
      </View>

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

      <View style={[styles.fabContainer, { bottom: 100 }]}>
        {openFloating && (
          <>
            <TouchableOpacity
              style={[styles.childButton, { bottom: 140 }]}
              onPress={() => navigation.navigate("AddMedicine")} // ✅ works
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

      <BottomTab activeTab={activeTab} onTabPress={handleTabPress} tabs={tabs} />
    </View>
  );
};

export default Dashboard;
