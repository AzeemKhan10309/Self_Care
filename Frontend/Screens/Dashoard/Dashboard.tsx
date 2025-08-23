import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
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

interface TodayMedicine {
  _id: string;
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
  const [upcomingDoses, setUpcomingDoses] = useState<UpcomingDose[]>([]);
  const [nextDose, setNextDose] = useState<UpcomingDose | null>(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProp>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    navigation.navigate(tabKey as keyof RootStackParamList);
  };

const handleMarkDose = async (
  id: string,
  time: string, // expected format: "HH:mm AM/PM"
  status: "Taken" | "Missed"
) => {
  if (!user) return;

  try {
    // Parse "HH:mm AM/PM" into Date object
    const now = new Date();
    const timeParts = time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)?/i);

    if (!timeParts) throw new Error("Invalid time format");

    let hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    const meridiem = timeParts[3]?.toUpperCase();

    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    const doseTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    // Send payload to backend
    await apiRequest("/dose-log/create", "POST", {
      medicineId: id,
      dependentId: null,
      status,       // "Taken" or "Missed"
      time: doseTime.toISOString(), // send ISO string
    });

    // Update local state after marking
    setTodayMedicines((prev) =>
      prev
        .map((med) => ({
          ...med,
          times: med.times?.filter((t) => t.time !== time),
        }))
        .filter((med) => (med.times?.length ?? 0) > 0)
    );
  } catch (err) {
    console.error("Error logging dose:", err);
  }
};




useEffect(() => {
  const fetchData = async () => {
    setLoading(true);

    try {
      // Fetch data from API
      const data = await apiRequest<
        | { error: true; message: string }
        | {
            todayMedicines: any[];
            upcomingDoses: any[];
            nextDose: any | null;
          }
      >("/medicines/today", "GET");

      console.log("Fetched data:", data);

      // Handle API error
      if ("error" in data) {
        console.error("API Error:", data.message);
        setTodayMedicines([]);
        setUpcomingDoses([]);
        setNextDose(null);
        return;
      }

      // 1️⃣ Group todayMedicines by medId and create `times` array
      const groupedMeds: TodayMedicine[] = data.todayMedicines.reduce(
        (acc: TodayMedicine[], med) => {
          const existing = acc.find((m) => m._id === med.medId);
          if (existing) {
            existing.times.push({ time: med.time, status: med.status });
          } else {
            acc.push({
              _id: med.medId,
              name: med.name,
              dosage: med.dosage,
              unit: med.unit,
              times: [{ time: med.time, status: med.status }],
            });
          }
          return acc;
        },
        []
      );

      setTodayMedicines(groupedMeds);

      // 2️⃣ Set upcoming doses as-is
      setUpcomingDoses(data.upcomingDoses || []);

      // 3️⃣ Set nextDose with formatted time
      if (data.nextDose) {
        const doseTimeParts = data.nextDose.time.match(/(\d{1,2}):(\d{2})/);
        let formattedTime = data.nextDose.time;

        if (doseTimeParts) {
          let hours = parseInt(doseTimeParts[1], 10);
          const minutes = parseInt(doseTimeParts[2], 10);
          const meridiem = data.nextDose.time.match(/AM|PM/i)?.[0]?.toUpperCase();

          if (meridiem === "PM" && hours !== 12) hours += 12;
          if (meridiem === "AM" && hours === 12) hours = 0;

          const date = new Date();
          date.setHours(hours, minutes);
          formattedTime = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
        }

        setNextDose({
          name: data.nextDose.name,
          dosage: data.nextDose.dosage,
          unit: data.nextDose.unit,
          time: formattedTime,
        });
      } else {
        setNextDose(null);
      }
    } catch (err) {
      console.error("Error fetching medicines:", err);
      setTodayMedicines([]);
      setUpcomingDoses([]);
      setNextDose(null);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);




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

      {/* Today’s Reminders */}
      <View style={styles.todayReminderContainer}>
        <Text style={styles.reminderTitle}>Today's Reminders</Text>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : todayMedicines.length === 0 ? (
          <Text>No medicines for today</Text>
        ) : (
          todayMedicines.flatMap((med) =>
  (med.times ?? []).map((t) => (
    <MedicationReminder
      key={`${med._id}-${t.time}`}
      id={med._id}
      name={med.name}
      time={t.time || "Invalid Time"}
      pills={`${med.dosage} ${med.unit}`}
      status={t.status}
      onComplete={() => handleMarkDose(med._id, t.time, "Taken")}
      onCancel={() => handleMarkDose(med._id, t.time, "Missed")}
    />
  ))
)
        )}
      </View>

      {/* Add Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddMedicine")}
        >
          <Image
            source={require("../../assets/Add.png")}
            style={styles.addicon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Tabs */}
      <BottomTab
        activeTab={activeTab}
        onTabPress={handleTabPress}
        tabs={tabs}
      />
    </View>
  );
};

export default Dashboard;
