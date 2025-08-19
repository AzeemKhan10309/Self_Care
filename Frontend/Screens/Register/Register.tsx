<<<<<<< Updated upstream
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Types/navigation";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;
=======
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/Store";
import { clearCollectInfo } from "../../Redux/CollectInfoSlice";
import { registerUser, checkUsername } from "../../Redux/AuthSlice";
import styles from "./Register.styles";
import { debounce } from "lodash"; // ✅
>>>>>>> Stashed changes

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

<<<<<<< Updated upstream
  const handleRegister = () => {
    navigation.navigate('Login'); 
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>

      <Input
        placeholder="Username"
        placeholderTextColor="#B0B0B0"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="E-mail"
        placeholderTextColor="#B0B0B0"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        placeholderTextColor="#B0B0B0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Sign Up" onPress={handleRegister} />

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or Sign Up with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialIcons}>
        <Image source={require("../../assets/apple.png")} style={styles.icon} />
        <Image
          source={require("../../assets/google.png")}
          style={styles.icon}
        />
        <Image
          source={require("../../assets/facebook.png")}
          style={styles.icon}
        />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

import styles from "./Register.styles";

=======
  // Redux auth state
  const { usernameAvailable, loading } = useSelector(
    (state: RootState) => state.auth
  );

  // local form state
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const debouncedCheck = useCallback(
    debounce((value: string) => {
      if (value.trim().length > 2) {
        dispatch(checkUsername(value));
      }
    }, 500), // wait 500ms after last keystroke
    [dispatch]
  );

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    debouncedCheck(value);
  };

  const handleRegister = async () => {
    if (!name || !username || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (usernameAvailable === false) {
      Alert.alert("Error", "Username is already taken. Please choose another.");
      return;
    }

    setRegisterLoading(true);
    try {
      await dispatch(
        registerUser({ name, username, email, password, phone, collectInfo })
      ).unwrap();

      dispatch(clearCollectInfo());
      Alert.alert("Success", "Registration successful!");
    } catch (err: any) {
      Alert.alert("Registration Error", err || "Something went wrong");
    } finally {
      setRegisterLoading(false);
    }
    
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Register your account</Text>

            {/* Name */}
            <Input placeholder="Name" value={name} onChangeText={setName} />

            {/* Username with immediate check */}
            <Input
              placeholder="Username"
              value={username}
              onChangeText={handleUsernameChange} // ✅ triggers API in real-time
            />

            {/* Username response */}
         {loading && username.length > 2 && (
  <Text style={{ color: "orange" }}>Checking...</Text>
)}
{usernameAvailable === true && (
  <Text style={{ color: "green" }}>✅ Username available</Text>
)}
{usernameAvailable === false && !loading && (
  <Text style={{ color: "red" }}>❌ Username taken</Text>
)}
{!loading && username.length > 2 && usernameAvailable === null && (
  <Text style={{ color: "gray" }}>⚠️ Could not check username</Text>
)}

            {/* Email */}
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            {/* Password */}
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Phone */}
            <Input placeholder="Phone" value={phone} onChangeText={setPhone} />

            {/* Register Button */}
            <Button
              title={registerLoading ? "Registering..." : "Register"}
              onPress={handleRegister}
              disabled={registerLoading}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

>>>>>>> Stashed changes
export default RegisterScreen;
