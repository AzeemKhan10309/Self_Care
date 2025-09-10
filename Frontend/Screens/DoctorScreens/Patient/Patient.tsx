import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const patients = [
  {
    id: "1",
    name: "Abdul Rehman",
    issue: "Kidney",
    date: "2 May",
    time: "10:30am - 5:30pm",
    favorite: true,
  },
  {
    id: "2",
    name: "M. Hayyat",
    issue: "Fatty Liver",
    date: "2 May",
    time: "10:30am - 5:30pm",
    favorite: false,
  },
  {
    id: "3",
    name: "Nabeel",
    issue: "Heart",
    date: "2 May",
    time: "10:30am - 5:30pm",
    favorite: false,
  },
];

export default function MyPatientsScreen() {
  const [patientList, setPatientList] = useState(patients);

  const toggleFavorite = (id: string) => {
    const updated = patientList.map((p) =>
      p.id === id ? { ...p, favorite: !p.favorite } : p
    );
    setPatientList(updated);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={item.avatar} style={styles.avatar} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.issue}>{item.issue}</Text>
        <View style={styles.row}>
          <Icon name="calendar-outline" size={width * 0.04} color="#555" />
          <Text style={styles.date}>{item.date}</Text>
          <Icon
            name="time-outline"
            size={width * 0.04}
            color="#555"
            style={styles.icon}
          />
          <Text style={styles.date}>{item.time}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Icon
          name={item.favorite ? "heart" : "heart-outline"}
          size={width * 0.06}
          color="#2e63e7"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Patients</Text>
      <FlatList
        data={patientList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: "600",
    marginTop: height * 0.02,
    alignSelf: "center",
  },
  list: {
    padding: width * 0.04,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f8f9ff",
    borderRadius: 12,
    padding: width * 0.03,
    marginBottom: height * 0.02,
    alignItems: "center",
    elevation: 2,
  },
  avatar: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    marginRight: width * 0.04,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: width * 0.045,
    fontWeight: "600",
  },
  issue: {
    fontSize: width * 0.04,
    color: "#8a8a8a",
  },
  row: {
    flexDirection: "row",
    marginTop: height * 0.007,
    alignItems: "center",
  },
  date: {
    marginLeft: 4,
    marginRight: 12,
    fontSize: width * 0.035,
    color: "#555",
  },
  icon: {
    marginLeft: 4,
  },
  
});
