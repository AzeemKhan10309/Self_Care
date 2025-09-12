import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./DoctorDashboard.styles";

type TabKey = "Pending" | "Completed" | "Favourite";

const DoctorDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabKey>("Pending");

  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = useState("");

  // ===== Favourite Popup State =====
  const [favPopupVisible, setFavPopupVisible] = useState(false);
  const [selectedFavItem, setSelectedFavItem] = useState<any>(null);

  // ===== Upcoming Appointments =====
  const upcomingAppointments = [
    {
      id: "1",
      name: "Dr. Sarah Khan",
      specialty: "Cardiologist",
      date: "12 Dec",
      time: "3:00 PM",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: "2",
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
      name: "Azeem Khan",
      issue: "Fatty Liver",
      date: "5 Oct",
      time: "10:30pm",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "2",
      name: "Sara Malik",
      issue: "Diabetes",
      date: "6 Oct",
      time: "9:00am",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    },
  ];

  // ===== Tabs Data =====
  const tabData: Record<TabKey, any[]> = {
    Pending: [
      {
        id: "1",
        name: "Azeem ur Rehman Khan",
        issue: "Fatty Liver",
        date: "2 May",
        time: "10:30am - 5:30pm",
        avatar: "https://randomuser.me/api/portraits/men/20.jpg",
      },
      {
        id: "2",
        name: "Ali Raza",
        issue: "Heart Checkup",
        date: "3 May",
        time: "9:00am - 1:30pm",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      },
    ],
    Completed: [
      {
        id: "3",
        name: "Ahmed Khan",
        issue: "Eye Checkup",
        date: "1 May",
        time: "1:00pm - 3:00pm",
        avatar: "https://randomuser.me/api/portraits/men/50.jpg",
        isFavourite: false,
      },
      {
        id: "4",
        name: "Sara Malik",
        issue: "Diabetes",
        date: "6 May",
        time: "11:00am - 2:00pm",
        avatar: "https://randomuser.me/api/portraits/women/30.jpg",
        isFavourite: true,
      },
    ],
    Favourite: [
      {
        id: "5",
        name: "Ali Aslam",
        issue: "General Checkup",
        date: "7 May",
        time: "2:00pm - 4:00pm",
        avatar: "https://randomuser.me/api/portraits/men/40.jpg",
      },
    ],
  };

  // ===== Pending & Favourite Card =====
  const renderTabItem = ({ item }: { item: any }) => (
    <View style={styles.requestCard}>
      {/* Top Row */}
      <View style={styles.requestRow}>
        <View style={styles.requestLeft}>
          <Image source={{ uri: item.avatar }} style={styles.requestAvatar} />
          <View>
            <Text style={styles.requestName}>{item.name}</Text>
            <Text style={styles.requestIssue}>{item.issue}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setSelectedFavItem(item);
            setFavPopupVisible(true);
          }}
        >
          <Ionicons
            name={selectedTab === "Favourite" ? "heart" : "heart-outline"}
            size={22}
            color="#2E6CF6"
          />
        </TouchableOpacity>
      </View>

      {/* Date and Time */}
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

      {/* Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.acceptBtn}>
          <Text style={styles.acceptText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectBtn}>
          <Text style={styles.rejectText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ===== Completed Card =====
  const renderCompletedItem = ({ item }: { item: any }) => (
    <View style={styles.completedCard}>
      {/* Left Section */}
      <View style={styles.completedLeft}>
        <Image source={{ uri: item.avatar }} style={styles.completedAvatar} />
        <View>
          <Text style={styles.completedName}>{item.name}</Text>
          <Text style={styles.completedIssue}>{item.issue}</Text>

          <View style={styles.completedDateTimeRow}>
            <View style={styles.completedDateBox}>
              <Ionicons name="calendar-outline" size={16} color="#0a66ff" />
              <Text style={styles.completedDateText}>{item.date}</Text>
            </View>
            <View style={styles.completedTimeBox}>
              <Ionicons name="time-outline" size={16} color="#0a66ff" />
              <Text style={styles.completedTimeText}>{item.time}</Text>
            </View>
          </View>
        </View>
      </View>

      <Ionicons
        name={item.isFavourite ? "heart" : "heart-outline"}
        size={22}
        color="#0a66ff"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ===== Header ===== */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
          style={styles.profileImage}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.doctorName}>Dr. AR Khan</Text>
        </View>
        <TouchableOpacity onPress={() => setSearchVisible(true)}>
          <Ionicons name="search" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* ===== Search Modal ===== */}
      <Modal
        visible={searchVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSearchVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setSearchVisible(false)}>
          <View style={styles.overlayContainer}>
            <View style={styles.topSearchBar}>
              <Ionicons
                name="search"
                size={20}
                color="#555"
                style={{ marginRight: 8 }}
              />
              <TextInput
                style={styles.overlayInput}
                placeholder="Search..."
                placeholderTextColor="#888"
                value={search}
                onChangeText={setSearch}
                autoFocus
              />
              <TouchableOpacity onPress={() => setSearchVisible(false)}>
                <Ionicons name="close" size={22} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== Upcoming Appointments ===== */}
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {upcomingAppointments.map((item) => (
            <View key={item.id} style={styles.upcomingCard}>
              <Image source={{ uri: item.avatar }} style={styles.upcomingAvatar} />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.upcomingName}>{item.name}</Text>
                <Text style={styles.upcomingIssue}>{item.issue}</Text>

                {/* Date & Time Row */}
                <View style={styles.infoRow}>
                  <Ionicons name="calendar-outline" size={16} color="#fff" />
                  <Text style={styles.upcomingInfo}>{item.date}</Text>
                  <Ionicons
                    name="time-outline"
                    size={16}
                    color="#fff"
                    style={{ marginLeft: 12 }}
                  />
                  <Text style={styles.upcomingInfo}>{item.time}</Text>
                </View>

                {/* Complete Button Below */}
                <TouchableOpacity style={styles.completeBtn}>
                  <Text style={styles.completeText}>Complete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* ===== Tabs ===== */}
        <View style={styles.tabRow}>
          {["Pending", "Completed", "Favourite"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab as TabKey)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ===== Tab Content ===== */}
        <FlatList
          data={tabData[selectedTab]}
          keyExtractor={(item) => item.id}
          renderItem={
            selectedTab === "Completed" ? renderCompletedItem : renderTabItem
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ScrollView>

      {/* ===== Favourite Popup Modal ===== */}
      <Modal
        visible={favPopupVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFavPopupVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setFavPopupVisible(false)}>
          <View style={styles.favPopupOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.favPopupContainer}>
                <Text style={styles.favPopupTitle}>
                  Remove from Favourites?
                </Text>

                {/* Selected Item Info */}
                {selectedFavItem && (
                  <View style={styles.favPopupCard}>
                    <Image
                      source={{ uri: selectedFavItem.avatar }}
                      style={styles.favPopupAvatar}
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.favPopupName}>
                        {selectedFavItem.name}
                      </Text>
                      <Text style={styles.favPopupIssue}>
                        {selectedFavItem.issue}
                      </Text>
                      <View style={styles.favPopupDateTime}>
                        <Ionicons name="calendar-outline" size={16} color="#555" />
                        <Text style={styles.favPopupDate}>
                          {selectedFavItem.date}
                        </Text>
                        <Ionicons
                          name="time-outline"
                          size={16}
                          color="#555"
                          style={{ marginLeft: 10 }}
                        />
                        <Text style={styles.favPopupTime}>
                          {selectedFavItem.time}
                        </Text>
                      </View>
                    </View>
                    <Ionicons name="heart" size={22} color="#2E6CF6" />
                  </View>
                )}

                {/* Actions */}
                <View style={styles.favPopupActions}>
                  <TouchableOpacity
                    style={styles.favCancelBtn}
                    onPress={() => setFavPopupVisible(false)}
                  >
                    <Text style={styles.favCancelText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.favRemoveBtn}
                    onPress={() => {
                      console.log("Removed from favorites:", selectedFavItem);
                      setFavPopupVisible(false);
                    }}
                  >
                    <Text style={styles.favRemoveText}>Yes, Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* ===== Bottom Navigation ===== */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home" size={24} color="#0a66ff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="medical" size={24} color="gray" />
          <Text style={styles.navText}>Today's Medicine</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart" size={24} color="gray" />
          <Text style={styles.navText}>Health Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={24} color="gray" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorDashboard;
