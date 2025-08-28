import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import styles from "./Otp.styles";
import { apiRequest } from "../../Services/api"; // 👈 your API helper

const OTPCodeScreen = ({ route, navigation }: any) => {
  const { email } = route.params; 
    const [enteredOtp] = useState("");
  const numberOfDigits = 6;
  const [otp, setOtp] = useState<string[]>(Array(numberOfDigits).fill(""));
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < numberOfDigits - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    console.log("Entered OTP:", code);

    if (code.length !== numberOfDigits) {
      Alert.alert("Error", "Please enter the full OTP code");
      return;
    }

    try {
      const response = await apiRequest("/users/verify-otp", "POST", {
        email,
        otp: code,
      });

      if ("error" in response) {
        Alert.alert("Error", response.message);
        return;
      }

      Alert.alert("Success", response.message);
      navigation.navigate("CreateNewPassword", { email});
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleResend = async () => {
    try {
      const response = await apiRequest("/users/send-otp", "POST", { email });

      if ("error" in response) {
        Alert.alert("Error", response.message);
        return;
      }

      Alert.alert("Success", "OTP has been resent to your email");
    } catch (error) {
      Alert.alert("Error", "Failed to resend OTP");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Enter the verification code we just sent on your email address.
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <Input
            key={index}
            keyboardType="numeric"
            placeholder="5"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <Button title="Verify" onPress={handleVerify} />

      <TouchableOpacity onPress={handleResend}>
        <Text style={styles.resendText}>
          Didn’t receive the code? <Text style={styles.resendLink}>Resend</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default OTPCodeScreen;
