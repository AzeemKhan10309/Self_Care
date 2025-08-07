import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import styles from "./ForgetPassword.styles";

type RootStackParamList = {
  Login: undefined;
  OTPCode: undefined;
};

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OTPCode"
>;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const handleSendCode = () => {
    console.log("Send code to:", email);
    navigation.navigate("OTPCode");
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
              Don't worry! It occurs. Please enter the email address linked with
              your account.
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
