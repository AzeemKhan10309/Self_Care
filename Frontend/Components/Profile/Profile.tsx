import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import styles from "./Profile.styles";

interface ProfileHeaderProps {
  name: string;
  location: string;
  profileImage: ImageSourcePropType;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  location,
  profileImage,
}) => {
  return (
    <View style={styles.profileRow}>
      <Image source={profileImage} style={styles.profileImage} />

      <View style={styles.nameLocation}>
        <Text style={styles.greeting}>Hello, {name}!</Text>

        <View style={styles.locationRow}>
          <Image
            source={require("../../assets/Location.png")}
            style={styles.locationIcon}
            resizeMode="contain"
          />
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
