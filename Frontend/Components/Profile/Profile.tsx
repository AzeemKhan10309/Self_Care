import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./Profile.styles";
import { useProfileHeader } from "./Hooks/useProfileHeader";

const ProfileHeader: React.FC = () => {
  const { user, currentLocation } = useProfileHeader();

  return (
    <View style={styles.profileRow}>
      <Image
        source={
          user?.profileImage
            ? { uri: user.profileImage }
            : require("../../assets/Profile.png")
        }
        style={styles.profileImage}
      />

      <View style={styles.nameLocation}>
        <Text style={styles.greeting}>Hello, {user?.name || "User"}!</Text>

        <View style={styles.locationRow}>
          <Image
            source={require("../../assets/Location.png")}
            style={styles.locationIcon}
            resizeMode="contain"
          />
          <Text style={styles.location}>{currentLocation}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
