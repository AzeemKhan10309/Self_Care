import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { PatientsStackParamList } from "../../../Types/DoctorNavigation";

// Contact type
type Contact = {
  id: string;
  name: string;
  role: string;
  image: string;
};

// Dummy contacts
const contactData: Contact[] = Array.from({ length: 6 }, (_, i) => ({
  id: i.toString(),
  name: "David H. Brown",
  role: "Psychologists",
  image: "https://via.placeholder.com/50",
}));

const ChatScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<PatientsStackParamList>>();

  const renderItem = ({ item }: { item: Contact }) => (
    <View style={styles.contactItem}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.contactInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() =>
            navigation.navigate("InboxScreen", { userId: item.id })
          }
        >
          <Ionicons name="chatbubble-outline" size={22} color="#333" />
        </TouchableOpacity>
<TouchableOpacity
  style={styles.icon}
  onPress={() =>
    navigation.navigate("CallScreen", { userId: item.id })
  }
>
  <Ionicons name="call-outline" size={22} color="#333" />
</TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="videocam-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Call Logs</Text>
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput placeholder="Search" style={styles.input} />
      </View>
      <FlatList
        data={contactData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 12,
    padding: 10,
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  role: {
    color: "#888",
    fontSize: 14,
    marginTop: 2,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 12,
  },
});

export default ChatScreen;
