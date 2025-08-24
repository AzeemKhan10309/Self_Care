import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../Types/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";

import { MedicationReminder } from "./Component/MedicineReminder/MedicineReminder";
import UpComingDose from "./Component/UpComingDose/UpcomingDose";
import BottomTab from "../../Components/BottomNavbar/BottomNavbar";
import ProfileHeader from "../../Components/Profile/Profile";

import { tabs } from "../../src/Constants/TabConfig";
import { apiRequest } from "../../Services/api";
import styles from "./Dashboard.styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Types
interface TodayMedicine {
  _id: string; // ScheduledDose ID
  name: string;
  dosage: number;
  unit: string;
  times: { time: string; status: "Pending" | "Taken" | "Missed" }[];
}

interface UpcomingDose {
  name: string;
  dosage: number;
  unit: string;
  time: string;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [todayMedicines, setTodayMedicines] = useState<TodayMedicine[]>([]);
  const [nextDose, setNextDose] = useState<UpcomingDose | null>(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProp>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    navigation.navigate(tabKey as keyof RootStackParamList);
  };

  const fetchTodayDoses = async () => {
    setLoading(true);
    try {
      const todayRes = await apiRequest<{ todayDoses?: any[]; error?: true; message?: string }>("/dose-log/doses/today", "GET");
      if ("error" in todayRes) {
        console.error("API Error (today):", todayRes.message);
        setTodayMedicines([]);
      } else {
        const todayDoses: TodayMedicine[] = (todayRes.todayDoses ?? []).map(dose => ({
          _id: dose._id,
          name: dose.name,
          dosage: dose.dosage,
          unit: dose.unit,
          times: [{ time: dose.time, status: "Pending" }]
        }));
        setTodayMedicines(todayDoses);
      }
    } catch (err) {
      console.error("Error fetching today doses:", err);
      setTodayMedicines([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextDose = async () => {
    try {
      const nextRes = await apiRequest<{ nextDose?: any; error?: true; message?: string }>("/dose-log/doses/next", "GET");
      if ("error" in nextRes) {
        console.error("API Error (next):", nextRes.message);
        setNextDose(null);
      } else if (nextRes.nextDose) {
        const dose = nextRes.nextDose;
        const medInfo = dose.medicine;
        if (medInfo) {
          setNextDose({
            name: medInfo.name,
            dosage: medInfo.dosage,
            unit: medInfo.unit,
            time: dose.formattedTime || new Date(dose.dateTime).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }),
          });
        }
      } else {
        setNextDose(null);
      }
    } catch (err) {
      console.error("Error fetching next dose:", err);
      setNextDose(null);
    }
  };

  useEffect(() => {
    fetchTodayDoses();
    fetchNextDose();
  }, []);

  const handleMarkDose = async (id: string, time: string, status: "Taken" | "Missed") => {
    if (!user) return;
    try {
      const endpoint = status === "Taken" ? `/dose-log/doses/${id}/taken` : `/dose-log/doses/${id}/missed`;
      await apiRequest(endpoint, "PATCH");

      // Immediately remove the dose from the list
      setTodayMedicines(prev =>
        prev
          .map(med => ({
            ...med,
            times: med.times.filter(t => t.time !== time) // remove only this time
          }))
          .filter(med => med.times.length > 0) // remove medicine if no times left
      );

      // Fetch fresh data from API
      fetchTodayDoses();
      fetchNextDose();
    } catch (err) {
      console.error(`Error marking dose ${status}:`, err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image source={require("../../assets/Home-bg.png")} style={styles.headerBackground} resizeMode="cover" />
        <ProfileHeader />
        <Text style={styles.feeling}>How are you feeling today?</Text>
      </View>

      {/* Next Dose */}
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
        ) : todayMedicines.length === 0 ? (
          <Text>No medicines for today</Text>
        ) : (
          <ScrollView>
            {todayMedicines.flatMap(med =>
              med.times.map(t => (
                <MedicationReminder
                  key={`${med._id}-${t.time}`}
                  id={med._id}
                  name={med.name}
                  time={t.time}
                  pills={`${med.dosage} ${med.unit}`}
                  status={t.status}
                  onComplete={(id, time) => handleMarkDose(id, time, "Taken")}
                  onCancel={(id, time) => handleMarkDose(id, time, "Missed")}
                />
              ))
            )}
          </ScrollView>
        )}
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddMedicine")}>
          <Image source={require("../../assets/Add.png")} style={styles.addicon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* Bottom Tabs */}
      <BottomTab activeTab={activeTab} onTabPress={handleTabPress} tabs={tabs} />
    </View>
  );
};

export default Dashboard;
