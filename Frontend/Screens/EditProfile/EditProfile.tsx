import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styles, { phoneStyles } from "./EditProfile.styles";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditProfile: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleUpdateProfile = () => {
    console.log({
      firstName,
      lastName,
      phone,
      email,
      dob,
      weight,
      height,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/Profile.png")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Qasim</Text>
        <Text style={styles.location}>📍 Lahore</Text>
        <Text style={styles.email}>qasimjamal@gmail.com</Text>
      </View>


      <Input
        placeholder="What's your first name?"
        value={firstName}
        onChangeText={setFirstName}
      />
      <Input
        placeholder="What's your last name?"
        value={lastName}
        onChangeText={setLastName}
      />

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
  );
};

export default EditProfile;
