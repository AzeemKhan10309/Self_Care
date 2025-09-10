import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles  from "./DoctorDashboard.styles";



const DoctorDashboard: React.FC = () => {



  const upcomingAppointments = [
    {
      id: "1",
      name: "Dr. Sarah Khan",
      specialty: "Cardiologist",
      date: "12 Dec",
      time: "3:00 PM",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  const pendingRequests = [
    {
      id: "1",
      name: "Ali Raza",
      specialty: "Dental Checkup",
      date: "15 Dec",
      time: "2:30 PM",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      id: "2",
      name: "Hina Malik",
      specialty: "Eye Specialist",
      date: "16 Dec",
      time: "11:00 AM",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.doctorName}>Dr. Ahmad</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Upcoming Section */}
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {upcomingAppointments.map((item) => (
            <View key={item.id} style={styles.upcomingCard}>
              <Image source={{ uri: item.avatar }} style={styles.upcomingAvatar} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.upcomingName}>{item.name}</Text>
                <Text style={styles.upcomingSpecialty}>{item.specialty}</Text>
                <View style={styles.row}>
                  <Ionicons name="calendar-outline" size={16} color="white" />
                  <Text style={styles.upcomingDate}>{item.date}</Text>
                </View>
                <View style={styles.row}>
                  <Ionicons name="time-outline" size={16} color="white" />
                  <Text style={styles.upcomingDate}>{item.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Pending Requests */}
        <View style={styles.requestsHeader}>
          <Text style={styles.sectionTitle}>Pending Requests</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>

        {pendingRequests.map((item) => (
          <View key={item.id} style={styles.requestCard}>
            {/* Top Row */}
            <View style={styles.requestRow}>
              <View style={styles.requestLeft}>
                <Image source={{ uri: item.avatar }} style={styles.requestAvatar} />
                <View>
                  <Text style={styles.requestName}>{item.name}</Text>
                  <Text style={styles.requestSpecialty}>{item.specialty}</Text>
                </View>
              </View>
              <Ionicons name="heart" size={20} color="#2E6CF6" />
            </View>

            {/* Date + Time */}
            <View style={styles.dateTimeRow}>
              <View style={styles.dateBox}>
                <Ionicons name="calendar-outline" size={16} color="gray" />
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <View style={styles.timeBox}>
                <Ionicons name="time-outline" size={16} color="gray" />
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.acceptBtn}>
                <Text style={styles.acceptText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rejectBtn}>
                <Text style={styles.rejectText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

 
    </View>
  );
};

export default DoctorDashboard;