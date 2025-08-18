import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/Store";
import { clearCollectInfo } from "../../Redux/CollectInfoSlice";
import { registerUser } from "../../Redux/AuthSlice";

const RegisterScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const collectInfo = useSelector((state: RootState) => state.collectInfo);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await dispatch(registerUser({ name, username, email, password, phone, collectInfo })
).unwrap();

      dispatch(clearCollectInfo());
      Alert.alert("Success", "Registration successful!");
    } catch (err: any) {
      Alert.alert("Registration Error", err || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Register your account</Text>

        <Input placeholder="Name" value={name} onChangeText={setName} />
        <Input placeholder="Username" value={username} onChangeText={setUsername} />

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input placeholder="Phone" value={phone} onChangeText={setPhone} />

        <Button
          title={loading ? "Registering..." : "Register"}
          onPress={handleRegister}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#F9F9F9",
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default RegisterScreen;
