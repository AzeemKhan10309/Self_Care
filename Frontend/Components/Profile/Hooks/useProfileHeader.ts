import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../Redux/Store";
import { fetchUserInfo } from "../../../Redux/AuthSlice";
import * as Location from "expo-location";

export const useProfileHeader = () => {
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
      setCurrentLocation(
        `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`
      );
    };

    getLocation();
  }, [dispatch, user?._id]);

  return { user, currentLocation };
};
