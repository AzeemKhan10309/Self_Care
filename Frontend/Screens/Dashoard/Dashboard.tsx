import React, { useState, useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
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

interface Medicine {
  _id: string;
  name: string;
  dosage: number;
  unit: string;
  status: "Taken" | "Missed" | "Pending";
  times: (string | { $date: string })[];
  repeat?: boolean;
  selectedDays?: number[];
}

interface DoseLog {
  _id: string;
  name: string;
  dosage: number;
  unit: string;
  status: "Taken" | "Missed";
  time: Date;
}

const parseTime = (t: string | { $date: string }): Date => {
  return new Date(typeof t === "string" ? t : t.$date);
};

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [doseLog, setDoseLog] = useState<DoseLog[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProp>();
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.id;

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    navigation.navigate(tabKey as keyof RootStackParamList);
  };

  // Log dose for the specific scheduled time
  const logDose = async (med: Medicine, status: "Taken" | "Missed", scheduledTime: Date) => {
    if (!userId) return;

    // Add to local log
    setDoseLog(prev => [
      ...prev,
      {
        _id: med._id,
        name: med.name,
        dosage: med.dosage,
        unit: med.unit,
        status,
        time: scheduledTime,
      },
    ]);

    // Remove the specific time from medicine times
    setMedicines(prev =>
      prev
        .map(m =>
          m._id === med._id
            ? { ...m, times: m.times.filter(t => parseTime(t).getTime() !== scheduledTime.getTime()) }
            : m
        )
        .filter(m => m.times.length > 0)
    );

    // Send log to backend
    try {
      await apiRequest("/doselog/", "POST", {
        medicineId: med._id,
        userId,
        dependentId: null,
        status,
        time: scheduledTime.toISOString(),
      });
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  const handleComplete = (med: Medicine, scheduledTime: Date) => {
    logDose(med, "Taken", scheduledTime);
  };

  const handleCancel = (med: Medicine, scheduledTime: Date) => {
    logDose(med, "Missed", scheduledTime);
  };

  useEffect(() => {
    const fetchTodaysMedicines = async () => {
      try {
   
        const data = await apiRequest<Medicine[]>("/medicines/today", "GET");
        if (!("error" in data)) {
          setMedicines(data.map(m => ({ ...m, status: "Pending" })));
        } else {
          console.error("API Error:", data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodaysMedicines();
  }, []);

  const now = new Date();
  const nowTS = now.getTime();

  // Flatten all upcoming times for today
  const upcomingDoses = useMemo(() => {
    return medicines
      .flatMap(med => {
        const medTimesToday = med.times
          .map(t => parseTime(t))
          .filter(t => t.getTime() >= nowTS); // only future times
        return medTimesToday.map(time => ({ med, time }));
      })
      .sort((a, b) => a.time.getTime() - b.time.getTime());
  }, [medicines, nowTS]);

  const nextDoseEntry = upcomingDoses[0];
  const nextDose = nextDoseEntry?.med;
  let doseDayLabel = "";
  if (nextDoseEntry) {
    const doseDate = nextDoseEntry.time;
    if (
      doseDate.getDate() !== now.getDate() ||
      doseDate.getMonth() !== now.getMonth() ||
      doseDate.getFullYear() !== now.getFullYear()
    ) {
      const options: Intl.DateTimeFormatOptions = { weekday: "long" };
      doseDayLabel = ` (Next: ${doseDate.toLocaleDateString(undefined, options)})`;
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image source={require("../../assets/Home-bg.png")} style={styles.headerBackground} resizeMode="cover" />
        <ProfileHeader />
        <Text style={styles.feeling}>How are you feeling today?</Text>
      </View>

      {/* Next Dose */}
      {nextDoseEntry ? (
        <UpComingDose
          title="Upcoming Dose"
          image={require("../../assets/pills.png")}
          doseName={nextDose.name}
          doseDetails={`${nextDose.dosage} ${nextDose.unit}${doseDayLabel}`}
          doseDate={nextDoseEntry.time.toLocaleDateString()}
          doseTime={nextDoseEntry.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
          <Text>Loading...</Text>
        ) : upcomingDoses.length === 0 ? (
          <Text>No medicines for today</Text>
        ) : (
          upcomingDoses.map(({ med, time }) => {
            const medTimeStr = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            return (
              <MedicationReminder
                key={`${med._id}-${time.getTime()}`}
                id={med._id}
                name={med.name}
                time={medTimeStr}
                pills={`${med.dosage} ${med.unit}`}
                status={med.status}
                onComplete={() => handleComplete(med, time)}
                onCancel={() => handleCancel(med, time)}
              />
            );
          })
        )}
      </View>

      {/* Add Medicine Button */}
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
