import { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../Redux/Store";
import { fetchUserInfo } from "../../../Redux/AuthSlice";
import { apiRequest } from "../../../Services/api";
import { Alert } from "react-native";

const BACKEND_IP = "192.168.11.245:5000"; // Replace with your LAN IP

export const useEditProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const userId = user?.id;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [location, setLocation] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Load user info into state
  useEffect(() => {
    if (!user) return;
    setName(user.name || "");
    setPhone(user.phone || "");
    setEmail(user.email || "");
    setDob(user.dob ? new Date(user.dob) : null);
    setWeight(user.weight?.toString() || "");
    setHeight(user.height?.toString() || "");
    setProfileImage(user.profileImage || null);
  }, [user]);

  // Detect location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      if (address.length > 0) {
        setLocation(`${address[0].city}, ${address[0].country}`);
      }
    })();
  }, []);

  // Pick profile image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Update profile
  const handleUpdateProfile = async () => {
    if (!userId) return;
    try {
      setUpdating(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      if (dob) formData.append("dob", dob.toISOString());
      if (weight) formData.append("weight", weight);
      if (height) formData.append("height", height);
      formData.append("location", location);
      if (profileImage) {
        formData.append("profileImage", {
          uri: profileImage,
          name: "profile.jpg",
          type: "image/jpeg",
        } as any);
      }

      const res = await apiRequest(`/users/${userId}`, "PUT", formData);
      if ("error" in res) {
        Alert.alert("Error", res.message || "Failed to update profile");
        return;
      }

      await dispatch(fetchUserInfo(userId)).unwrap();
      Alert.alert("Success", "Profile updated successfully!");
    } catch (err: any) {
      Alert.alert("Error", err?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  // Return image URI (for display)
  const imageUri = profileImage
    ? profileImage.startsWith("http")
      ? profileImage
      : `http://${BACKEND_IP}/${profileImage.replace(/\\/g, "/")}`
    : null;

  return {
    user,
    loading,
    error,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    dob,
    setDob,
    weight,
    setWeight,
    height,
    setHeight,
    location,
    profileImage,
    imageUri,
    showDatePicker,
    setShowDatePicker,
    pickImage,
    updating,
    handleUpdateProfile,
  };
};
