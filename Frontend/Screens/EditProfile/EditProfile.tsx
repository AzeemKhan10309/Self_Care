import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import styles, { phoneStyles } from "./EditProfile.styles";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import { fetchUserInfo, updateUserProfile } from "../../Redux/AuthSlice";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

interface EditProfileProps {
  userId: string;
}

const EditProfile: React.FC<EditProfileProps> = ({ userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserInfo(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setUsername(user.username || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setDob(user.dob ? new Date(user.dob) : null);
      setWeight(user.weight?.toString() || "");
      setHeight(user.height?.toString() || "");
      setProfileImage(user.profileImage || null);
    }
  }, [user]);

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

  const handleUpdateProfile = () => {
    if (!userId) return;

    const updatedData = {
      name,
      username,
      phone,
      email,
      dob: dob ? dob.toISOString() : null,
      weight: weight ? Number(weight) : null,
      height: height ? Number(height) : null,
      location,
      profileImage,
    };

    dispatch(updateUserProfile({ userId, data: updatedData }))
      .unwrap()
      .then(() => {
        Alert.alert("Success", "Profile updated successfully!");
      })
      .catch((err) => {
        Alert.alert("Error", err || "Failed to update profile");
      });
  };

  if (loading) return <Text>Loading user info...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../assets/Profile.png")
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.name}>{name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
            <Image
              source={require("../../assets/Location.png")}
              style={{ width: 16, height: 16, marginRight: 4 }}
              resizeMode="contain"
            />
            <Text style={styles.location}>{location || "Detecting..."}</Text>
          </View>
        </View>

        <Input placeholder="Enter your name?" value={name} onChangeText={setName} />
        <Input placeholder="Enter your username?" value={username} onChangeText={setUsername} />

        <View style={phoneStyles.container}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg",
            }}
            style={phoneStyles.flag}
          />
          <View style={phoneStyles.divider} />
          <TextInput
            style={phoneStyles.input}
            placeholder="Phone number"
            placeholderTextColor="#A0A0A0"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <Input
          placeholder="Change Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {dob ? dob.toDateString() : "Select date of birth"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dob || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDob(selectedDate);
            }}
          />
        )}

        <Input
          placeholder="Update weight"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        <Input
          placeholder="Update height"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />

        <View style={styles.updateBtn}>
          <Button title="Update Profile" onPress={handleUpdateProfile} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;
