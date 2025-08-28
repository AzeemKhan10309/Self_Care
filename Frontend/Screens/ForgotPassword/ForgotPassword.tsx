import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import styles from "./ForgetPassword.styles";
import { apiRequest } from "../../Services/api";

type RootStackParamList = {
  Login: undefined;
  OTPCode: { email: string };
};

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OTPCode"
>;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

 const handleSendCode = async () => {
  console.log("Sending OTP to:", email);

  if (!email) {
    Alert.alert("Error", "Please enter your email");
    return;
  }

  if (!validateEmail(email)) {
    Alert.alert("Error", "Please enter a valid email address");
    return;
  }

  try {
    const response = await apiRequest("/users/send-otp", "POST", { email });
    console.log("Send OTP response:", response);

    if (response.status === 404) {
      Alert.alert("Error", "No account found with this email");
      return;
    }

    if (response.error) {
      Alert.alert("Error", response.message || "Failed to send code");
      return;
    }

    Alert.alert("Success", response.message || "OTP sent successfully");
    navigation.navigate("OTPCode", { email });

  } catch (error: any) {
    console.error("handleSendCode error:", error);
    Alert.alert("Error", "Something went wrong. Please try again.");
  }
};


  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={60}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              Don&apos;t worry! It occurs. Please enter the email address linked
              with your account.
            </Text>

            <Input
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Button title="Send Code" onPress={handleSendCode} />
          </View>

          <TouchableOpacity style={styles.loginLink} onPress={handleLogin}>
            <Text>
              <Text style={styles.loginLabel}>Remember Password? </Text>
              <Text style={styles.loginText}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
