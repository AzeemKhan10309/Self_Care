import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MedicationReminder from "./Component/MedicineReminder/MedicineReminder";
import BottomTab from "../../Components/BottomNavbar/BottomNavbar";
import ProfileHeader from "../../Components/Profile/Profile";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../Types/navigation";
import styles from "./Dashboard.styles";
import UpComingDose from "./Component/UpComingDose/UpcomingDose";
import { tabs } from "../../src/Constants/TabConfig";
import { apiRequest } from "../../Services/api";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Medicine {
  _id: string;
  name: string;
  dosage: number;
  unit: string;
  status: "Taken" | "Missed";
  times: (string | { $date: string })[];
  startDate?: string;
  endDate?: string;
  repeat?: boolean;
  selectedDays?: number[];
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProp>();

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    navigation.navigate(tabKey as keyof RootStackParamList);
  };

  const handleComplete = (id: string) => {
    setMedicines((prev) =>
      prev.map((m) => (m._id === id ? { ...m, status: "Taken" } : m))
    );
  };

  const handleCancel = (id: string) => {
    setMedicines((prev) =>
      prev.map((m) => (m._id === id ? { ...m, status: "Missed" } : m))
    );
  };

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const data = await apiRequest<Medicine[]>("/medicines/", "GET");
        if (!("error" in data)) {
          setMedicines(data);
        } else {
          console.error("API Error:", data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReminders();
  }, []);

  // ----------------------
  // Next Dose Calculation
  // ----------------------
  const now = new Date();
  const nowTS = now.getTime();

  const allDoses: { doseDate: Date; med: Medicine }[] = [];

  medicines.forEach((med) => {
    med.times.forEach((t: string | { $date: string }) => {
      const timeStr = typeof t === "string" ? t : t.$date;
      let doseDate = new Date(timeStr);

      if (med.repeat && med.selectedDays?.length) {
        const today = now.getDay(); // 0=Sun, 1=Mon ...
        let nextDoseDate = new Date(doseDate);

        if (med.selectedDays.includes(today) && nextDoseDate.getTime() > nowTS) {
          doseDate = nextDoseDate;
        } else {
          // Find next selected day
          let daysAhead = 1;
          while (!med.selectedDays.includes((today + daysAhead) % 7)) {
            daysAhead++;
          }
          doseDate.setDate(now.getDate() + daysAhead);
          doseDate.setHours(nextDoseDate.getHours());
          doseDate.setMinutes(nextDoseDate.getMinutes());
          doseDate.setSeconds(0);
        }
      }

      allDoses.push({ doseDate, med });
    });
  });

  // Filter future doses
  const futureDoses = allDoses.filter((d) => d.doseDate.getTime() > nowTS);

  // Nearest dose
  const sortedDoses = futureDoses.sort(
    (a, b) => a.doseDate.getTime() - b.doseDate.getTime()
  );
  const nextDose = sortedDoses[0];

  // Label for next day
  let doseDayLabel = "";
  if (nextDose) {
    const doseDate = nextDose.doseDate;
    if (
      doseDate.getDate() !== now.getDate() ||
      doseDate.getMonth() !== now.getMonth() ||
      doseDate.getFullYear() !== now.getFullYear()
    ) {
      const options: Intl.DateTimeFormatOptions = { weekday: "long" };
      doseDayLabel = ` (Next: ${doseDate.toLocaleDateString(undefined, options)})`;
    }
  }

  // ----------------------
  // Today's Upcoming Medicines
  // ----------------------
  const todayUpcomingMedicines = medicines
    .filter((med) =>
      med.times.some((t: string | { $date: string }) => {
        const medTime = new Date(typeof t === "string" ? t : t.$date);
        return (
          medTime.getDate() === now.getDate() &&
          medTime.getMonth() === now.getMonth() &&
          medTime.getFullYear() === now.getFullYear() &&
          medTime.getTime() >= nowTS
        );
      })
    )
    .sort((a, b) => {
      const timeA = new Date(
        typeof a.times[0] === "string" ? a.times[0] : a.times[0].$date
      ).getTime();
      const timeB = new Date(
        typeof b.times[0] === "string" ? b.times[0] : b.times[0].$date
      ).getTime();
      return timeA - timeB;
    });

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/Home-bg.png")}
          style={styles.headerBackground}
          resizeMode="cover"
        />
        <ProfileHeader />
        <Text style={styles.feeling}>How are you feeling today?</Text>
      </View>

      {/* Upcoming Dose */}
      {nextDose && (
        <UpComingDose
          title="Upcoming Dose"
          image={require("../../assets/pills.png")}
          doseName={nextDose.med.name}
          doseDetails={`${nextDose.med.dosage} ${nextDose.med.unit}${doseDayLabel}`}
          doseDate={nextDose.doseDate.toLocaleDateString()}
          doseTime={nextDose.doseDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      )}

      {/* Today's Reminders */}
      <View style={styles.todayReminderContainer}>
        <Text style={styles.reminderTitle}>Today's Reminders</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : todayUpcomingMedicines.length === 0 ? (
          <Text>No medicines for today</Text>
        ) : (
          todayUpcomingMedicines.map((med) => (
            <MedicationReminder
              key={med._id}
              id={med._id}
              name={med.name}
              time={
                med.times[0]
                  ? new Date(
                      typeof med.times[0] === "string" ? med.times[0] : med.times[0].$date
                    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  : ""
              }
              pills={`${med.dosage} ${med.unit}`}
              status={med.status}
              onComplete={handleComplete}
              onCancel={handleCancel}
            />
          ))
        )}
      </View>

      {/* Add Medicine Button */}
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

      {/* Bottom Tab */}
      <BottomTab activeTab={activeTab} onTabPress={handleTabPress} tabs={tabs} />
    </View>
  );
};

export default Dashboard;
