import React, { useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, FlatList } from "react-native";
import DateTab from "./Component/DoseTab/DoseTab";
import DoseItem from "./Component/DoesItem/DoesItem";
import BottomTab from "../../Components/BottomNavbar/BottomNavbar";
import NotificationCard from "./Component/NotificationCard/NotificationCard";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../Types/navigation";
import { tabs } from "../../src/Constants/TabConfig";
import styles from "./Summary.styles";
import { useSummary } from "./Hooks/useSummary";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Summary: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState("Summary");

  const {
    today,
    selectedDate,
    setSelectedDate,
    doseLogs,
    loading,
    dateRange,
    flatListRef,
    getWeekday,
  } = useSummary();

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
              onPress={() => setSelectedDate(day)}
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
