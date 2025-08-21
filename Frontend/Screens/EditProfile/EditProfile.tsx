// Frontend/Screens/EditProfile/EditProfile.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/Store";
import styles, { phoneStyles } from "./EditProfile.styles";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import ProfileHeader from "../../Components/Profile/Profile";
import { apiRequest } from "../../Services/api";
import { fetchUserInfo } from "../../Redux/AuthSlice";

const EditProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("user from redux:", user);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name || "");
    setUsername(user.username || "");
    setPhone(user.phone || "");
    setEmail(user.email || "");
    setDob(user.dob ? new Date(user.dob) : null);
    setWeight(user.weight?.toString() || "");
    setHeight(user.height?.toString() || "");
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    if (!name || !username || !email) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        username,
        phone,
        email,
        dob: dob || null,
        weight: weight ? Number(weight) : null,
        height: height ? Number(height) : null,
      };

      const response = await apiRequest(`/users/${user.id}`, "PUT", payload);
      if ("error" in response) {
        alert(response.message);
      } else {
        alert("Profile updated successfully!");
        dispatch(fetchUserInfo(user.id));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
      dispatch(fetchUserInfo(user.id));

  };

  return (
    <View style={styles.container}>
      <ProfileHeader />

      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input placeholder="Username" value={username} onChangeText={setUsername} />

      <View style={phoneStyles.container}>
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg" }}
          style={phoneStyles.flag}
        />
        <View style={phoneStyles.divider} />
        <TextInput
          style={phoneStyles.input}
          placeholder="Phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

      <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>{dob ? dob.toDateString() : "Select date of birth"}</Text>
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

      <Input placeholder="Weight" value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <Input placeholder="Height" value={height} onChangeText={setHeight} keyboardType="numeric" />

      <View style={styles.updateBtn}>
        <Button
          title={loading ? "Updating..." : "Update Profile"}
          onPress={handleUpdateProfile}
          disabled={loading}
        />
      </View>
    </View>
  );
};

export default EditProfile;
