import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import DateTab from "./Component/DoseTab/DoseTab";
import DoseItem from "./Component/DoesItem/DoesItem";
import BottomTab from "../../Components/BottomNavbar/BottomNavbar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../Types/navigation";
import { tabs } from "../../src/Constants/TabConfig";
import NotificationCard from "./Component/NotificationCard/NotificationCard";
import styles from "./Summary.styles";
import { apiRequest } from "../../Services/api";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const getWeekday = (dateString: string) => {
  const d = new Date(dateString);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
};

const generateMonthDates = (year: number, month: number) => {
  const dates: string[] = [];
  const d = new Date(year, month, 1);

  while (d.getMonth() === month) {
    dates.push(d.toISOString().split("T")[0]);
    d.setDate(d.getDate() + 1);
  }

  return dates;
};

const formatTime = (isoTime: string) => {
  const date = new Date(isoTime);
  if (isNaN(date.getTime())) return "N/A"; 
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};


const sortLogsByTime = (logs: any[]) => {
  return logs.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
};

const Summary: React.FC = () => {
  const today = new Date();
  const [activeTab, setActiveTab] = useState("Summary");
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]);
  const [doseLogs, setDoseLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProp>();
  const dateRange = generateMonthDates(today.getFullYear(), today.getMonth());
  const flatListRef = useRef<FlatList<string>>(null);

  const fetchDoseLogs = async (date: string) => {
    setLoading(true);
    try {
      const res = await apiRequest(`/dose-log/logs/?date=${date}`, "GET");
          console.log("API Response:", res);
      const sorted = sortLogsByTime(res || []);
      setDoseLogs(sorted);
    } catch (err) {
      console.error("Failed to fetch dose logs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoseLogs(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    const todayIndex = dateRange.findIndex(d => d === today.toISOString().split("T")[0]);
    if (todayIndex !== -1 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: todayIndex,
          animated: true,
          viewPosition: 0.01,
        });
      }, 200);
    }
  }, []);

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    navigation.navigate(tabKey as keyof RootStackParamList);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.summary}>Daily Summary</Text>

        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateTabs}
          data={dateRange}
          keyExtractor={day => day}
          renderItem={({ item: day }) => (
            <DateTab
              day={day.split("-")[2]}
              weekday={getWeekday(day)}
              isActive={selectedDate === day}
              onPress={() => {
                setSelectedDate(day);
                const index = dateRange.findIndex(d => d === day);
                if (index !== -1) {
                  flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
                }
              }}
            />
          )}
          getItemLayout={(_, index) => ({ length: 80, offset: 80 * index, index })}
        />

        <Text style={styles.TodaysDose}>
          {selectedDate === today.toISOString().split("T")[0]
            ? "Today’s Dose"
            : `Doses on ${selectedDate}`}
        </Text>

        {doseLogs.some(log => log.status === "Missed") && (
          <NotificationCard
            date={selectedDate}
            weekday={getWeekday(selectedDate)}
            message="You’ve skipped one or more doses!"
          />
        )}

        {loading ? (
          <ActivityIndicator size="large" />
        ) : doseLogs.length > 0 ? (
          doseLogs.map((log, index) => (
          <DoseItem
  key={index}
  time={log.time} 
  taken={log.status === "Taken"}
  medicine={log.medicineId?.name || "Unknown"}
  quantity={log.quantity || 0}
  showPillLabel
/>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20, color: "gray" }}>
            No doses scheduled for {selectedDate}
          </Text>
        )}
      </ScrollView>

      <View style={styles.line}>
        <BottomTab activeTab={activeTab} onTabPress={handleTabPress} tabs={tabs} />
      </View>
    </View>
  );
};

export default Summary;
