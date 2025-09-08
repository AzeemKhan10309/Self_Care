import React from "react";
import { ScrollView, Text, View, FlatList, StyleSheet } from "react-native";
import AppointmentCard from "./Component/Appoitmentcard/AppointmentCard";
import DoctorCard from "./Component/DoctorCard/DoctorCard";
import BottomTab from "../../Components/BottomNavbar/BottomNavbar";
import { tabs } from "../../src/Constants/TabConfig";
import type { RootStackParamList } from "../../Types/navigation";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import styles from "./Doctor.styles";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const upcomingAppointments = [
  {
    id: "1",
    name: "Smith Jhon",
    specialty: "Fatty Liver",
    rating: 4.8,
    date: "5 Oct",
    time: "10:30pm",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    name: "Lady Bird",
    specialty: "Kidney",
    rating: 4.8,
    date: "6 Oct",
    time: "10:30pm",
    image: "https://via.placeholder.com/50",
  },
];

const doctors = [
  {
    id: "1",
    name: "Robert Johnson",
    specialty: "Neurologist",
    hospital: "ABC hospital",
    rating: 4.8,
    time: "10:30am – 5:30pm",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    name: "Robert Johnson",
    specialty: "Neurologist",
    hospital: "ABC hospital",
    rating: 4.8,
    time: "10:30am – 5:30pm",
    image: "https://via.placeholder.com/50",
  },
];

export default function Doctor() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = React.useState("HealthTracker");

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    navigation.navigate(tabKey as keyof RootStackParamList);
  };

  return (
    <View style={styles.container}>
      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Upcoming Appointments */}
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <FlatList
          horizontal
          data={upcomingAppointments}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <AppointmentCard item={item} />}
        />

        {/* Find Doctors */}
        <View style={styles.findDoctorsHeader}>
          <Text style={styles.findDoctorsTitle}>Find Doctors</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        {doctors.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </ScrollView>

      {/* Fixed Bottom Navbar */}
      <BottomTab activeTab={activeTab} onTabPress={handleTabPress} tabs={tabs} />
    </View>
  );
}