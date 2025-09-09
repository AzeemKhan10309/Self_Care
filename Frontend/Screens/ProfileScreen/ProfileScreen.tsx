import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import ProfileHeader from "../../Components/Profile/Profile";
import MedicineCard from "../DependentEdit/MedicenCard/MedicenCard";
import { RootState } from "../../Redux/Store";
import { useUserMedicines } from "./Hook/ProfileHook";
import { ProfileStackParamList } from "../../Navigations/User/stacks/ProfileStack";
import { logout } from "../../Redux/AuthSlice";
import styles from "./ProfileScreen.styles";
export default function ProfileScreen() {
  const navigation =
    useNavigation<NavigationProp<ProfileStackParamList, "Profile">>();

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.id;

  const { medicines, loading, deleteMedicine } = useUserMedicines(userId || "");

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => dispatch(logout()),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <ProfileHeader />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.aboutText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Reminders</Text>

        {loading ? (
          <Text>Loading...</Text>
        ) : medicines.length === 0 ? (
          <Text>No medicines found.</Text>
        ) : (
          <FlatList
            data={medicines}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <MedicineCard
                name={item.name}
                dose={item.dose}
                time={item.time}
                quantity={item.quantity}
                onUpdate={() =>
                  navigation.navigate("UpdateMedicineScreen", {
                    medicineId: item._id,
                  })
                }
                onDelete={() => deleteMedicine(item._id)}
              />
            )}
          />
        )}
      </View>

     
    </View>
  );
}


