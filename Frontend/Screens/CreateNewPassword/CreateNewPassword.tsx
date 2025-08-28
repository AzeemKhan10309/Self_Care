import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import styles from "./Reset.styles";
import { apiRequest } from "../../Services/api";

type RootStackParamList = {
  Login: undefined;
  PasswordChanged: undefined;
};

type CreateNewPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PasswordChanged"
>;

export default function CreateNewPassword() {
  const navigation = useNavigation<CreateNewPasswordScreenNavigationProp>();
  const route = useRoute<any>();
  const { email } = route.params || {};
console.log("Received email:", email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      console.log("🔑 Resetting password for:", email);
      console.log("Password:", password ? "****" : null); 
      const response = await apiRequest("/users/reset-password", "PUT", {
        email,
        newPassword: password,
      });

      console.log("🔑 Reset Password API Response:", response);

      if (!response || response.error) {
        Alert.alert("Error", response?.message || "Password reset failed");
        return;
      }

      Alert.alert("Success", response.message || "Password changed successfully", [
        {
          text: "OK",
          onPress: () => navigation.navigate("PasswordChanged"),
        },
      ]);
    } catch (error: any) {
      console.error("❌ Reset Password Error:", error);
      Alert.alert("Error", "Something went wrong, please try again later");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={60}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Create New Password</Text>
            <Text style={styles.subtitle}>
              Your new password must be unique from those previously used.
            </Text>
          </View>

          <Input
            placeholder="New Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Input
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <Button title="Reset Password" onPress={handleResetPassword} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
