import React, { useEffect, useState } from "react";
import { View, Text, Image, ImageSourcePropType, PermissionsAndroid, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/Store";
import { fetchUserInfo } from "../../Redux/AuthSlice";
import Geolocation from "react-native-geolocation-service";
import styles from "./Profile.styles";

interface ProfileHeaderProps {
  name: string;
  profileImage: ImageSourcePropType;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, profileImage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?._id;
  const [currentLocation, setCurrentLocation] = useState("Unknown");

  useEffect(() => {
    if (!user) {
dispatch(fetchUserInfo(userId));
    }

    const getLocation = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission denied");
          return;
        }
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
        },
        (error) => {
          console.log(error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    getLocation();
  }, [dispatch, user]);

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
          <Text style={styles.location}>{currentLocation}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
