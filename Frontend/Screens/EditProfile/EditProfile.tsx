import React from "react";
import { View, Text, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles, { phoneStyles } from "./EditProfile.styles";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useEditProfile } from "./Hook/useEditProfile";

// ✅ React Navigation
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  EditProfile: undefined;
  ForgotPassword: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "EditProfile">;

const EditProfile: React.FC = () => {
  const {
    name, setName, phone, setPhone, email, setEmail,
    dob, setDob, weight, setWeight, height, setHeight,
    location, imageUri, showDatePicker, setShowDatePicker,
    pickImage, updating, handleUpdateProfile,
    loading, error,
  } = useEditProfile();

  const navigation = useNavigation<NavigationProp>();

  if (loading) return <Text>Loading user info...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  const handleChangePassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={imageUri ? { uri: imageUri } : require("../../assets/Profile.png")}
            style={styles.profileImage}
          />
          <Text style={{ textAlign: "center", marginTop: 4 }}>Change Picture</Text>
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

        <Input placeholder="Name" value={name} onChangeText={setName} />

        <View style={phoneStyles.container}>
          <View style={phoneStyles.divider} />
          <Input
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
            title={updating ? "Updating..." : "Update Profile"}
            onPress={handleUpdateProfile}
            disabled={updating}
          />
        </View>

        {/* Change Password Button */}
        <View style={{ marginTop: 12 }}>
          <Button
            title="Change Password"
            onPress={handleChangePassword}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;
