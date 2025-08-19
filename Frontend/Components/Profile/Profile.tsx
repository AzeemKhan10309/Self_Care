import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/Store";
import { fetchUserInfo } from "../../Redux/AuthSlice";
import * as Location from "expo-location";
import styles from "./Profile.styles";

const ProfileHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [currentLocation, setCurrentLocation] = useState("Unknown");

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserInfo(user._id));
    }

    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLocation(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
    };

    getLocation();
  }, [dispatch, user?._id]);

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
