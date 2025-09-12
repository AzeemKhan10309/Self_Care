import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SectionList,
} from "react-native";
import { Checkbox, FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const records = [
  {
    date: "Sep 11th, 2025",
    day: "Thursday",
    entries: [
      { time: "8am", medicine: "Paracetamol 250mg", pills: "2 Pill", checked: false },
      { time: "8am", medicine: "Paracetamol 250mg", pills: "1 Pill", checked: true },
      { time: "7pm", medicine: "Paracetamol 250mg", pills: "2 Pill", checked: true },
      { time: "8pm", medicine: "Paracetamol 250mg", pills: "1 Pill", checked: true },
    ],
  },
  { date: "Sep 9th, 2025", day: "Wednesday", entries: [] },
  { date: "Sep 8th, 2025", day: "Tuesday", entries: [] },
  { date: "Sep 7th, 2025", day: "Monday", entries: [] },
  { date: "Sep 6th, 2025", day: "Sunday", entries: [] },
];

const PatientProfile = () => {
  const [activeTab, setActiveTab] = useState<"info" | "medical" | "review">("info");
  const [expanded, setExpanded] = useState<string | null>("Sep 11th, 2025");

  const toggleExpand = (date: string) => {
    setExpanded((prev) => (prev === date ? null : date));
  };

  const renderEntry = ({ item }: any) => (
    <View style={styles.entryRow}>
      <Text style={styles.time}>{item.time}</Text>
      <Checkbox status={item.checked ? "checked" : "unchecked"} />
      <View style={styles.medDetails}>
        <Text>{item.medicine}</Text>
        <Text style={styles.pillText}>{item.pills}</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <ScrollView style={styles.contentBox}>
            <Text style={styles.sectionTitle}>Abdul Rehman | Kidney</Text>
            <Text style={styles.subText}>📍 Indus Hospital, Lhr</Text>

            <View style={styles.row}>
              <View style={styles.infoBox}>
                <Text style={styles.bold}>23</Text>
                <Text style={styles.muted}>Age</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.bold}>75</Text>
                <Text style={styles.muted}>Weight</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.bold}>5.8</Text>
                <Text style={styles.muted}>Height</Text>
              </View>
            </View>

            <Text style={styles.label}>Appointment Days</Text>
            <Text style={styles.tag}>Monday</Text>

            <Text style={styles.label}>Appointment Time</Text>
            <Text style={styles.tag}>10:30am - 5:30pm</Text>
          </ScrollView>
        );

      case "medical":
        return (
          <View style={styles.contentBox}>
            <SectionList
              sections={records.map((r) => ({
                title: r.date,
                data: expanded === r.date ? r.entries : [],
              }))}
              keyExtractor={(_, idx) => idx.toString()}
              renderSectionHeader={({ section }) => (
                <View style={styles.card}>
                  <TouchableOpacity
                    onPress={() => toggleExpand(section.title)}
                    style={styles.cardHeader}
                  >
                    <Text style={styles.cardTitle}>
                      {section.title === "Sep 11th, 2025"
                        ? "Today's Record"
                        : section.title}
                    </Text>
                    <Icon
                      name={expanded === section.title ? "chevron-up" : "chevron-down"}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              )}
              renderItem={renderEntry}
              contentContainerStyle={{ paddingBottom: 80 }}
            />

            <FAB
              icon="plus"
              style={styles.fab}
              onPress={() => console.log("Add new record")}
            />
          </View>
        );

      case "review":
        return (
          <ScrollView style={styles.contentBox}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <Text style={styles.bold}>Emily Anderson ⭐⭐⭐⭐⭐</Text>
            <Text style={styles.reviewText}>
              Dr. Patel is a true professional who genuinely cares about his
              patients. I highly recommend Dr. Patel to anyone seeking exceptional
              cardiac care.
            </Text>
          </ScrollView>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Blue Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
          }}
          style={styles.avatar}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "info" && styles.activeTab]}
          onPress={() => setActiveTab("info")}
        >
          <Text style={activeTab === "info" ? styles.activeText : styles.inactiveText}>
            Info
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "medical" && styles.activeTab]}
          onPress={() => setActiveTab("medical")}
        >
          <Text
            style={activeTab === "medical" ? styles.activeText : styles.inactiveText}
          >
            Medical Record
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "review" && styles.activeTab]}
          onPress={() => setActiveTab("review")}
        >
          <Text
            style={activeTab === "review" ? styles.activeText : styles.inactiveText}
          >
            Review
          </Text>
        </TouchableOpacity>
      </View>

      {/* Screen Content */}
      <View style={styles.contentContainer}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 90,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -20,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 20,
    paddingVertical: 8,
    elevation: 3,
  },
  tab: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  activeTab: { backgroundColor: "#f3f4f6" },
  activeText: { color: "#000", fontWeight: "bold" },
  inactiveText: { color: "#777" },
  contentContainer: { flex: 1, padding: 20 },
  contentBox: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 13,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  subText: { color: "#666", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 10 },
  infoBox: { alignItems: "center", flex: 1 },
  bold: { fontWeight: "bold", fontSize: 16 },
  muted: { color: "#666" },
  label: { fontWeight: "bold", marginTop: 15 },
  tag: {
    backgroundColor: "#e5e7eb",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  reviewText: { marginTop: 8, color: "#444", lineHeight: 20 },

  // MedicationLog styles
  card: {
    backgroundColor: "#f2f7ff",
    borderRadius: 10,
    margin: 8,
    padding: 10,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#2d5eff" },
  entryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginVertical: 6,
  },
  time: { width: 50, fontWeight: "600", color: "#444" },
  medDetails: { marginLeft: 10 },
  pillText: { fontSize: 12, color: "#666" },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#2d5eff",
  },
});

export default PatientProfile;
