import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../../Types/navigation";
import { RootState, AppDispatch } from "../../Redux/Store";
import { loginUser, fetchUserInfo } from "../../Redux/AuthSlice";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import styles from "./Login.styles";

type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<DashboardNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((loggedInUser) => {
        const userId = loggedInUser?._id || loggedInUser?.id;
        if (userId) {
          dispatch(fetchUserInfo(userId));
        }

        
      })
      .catch((err) => {
        console.error("Login API Error:", err);
        Alert.alert("Login Failed", err?.message || "Something went wrong");
      });
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Login Failed", error, [{ text: "OK" }]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Login to your account</Text>

          <Input
            value={email}
            placeholder="Email"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />
          <Input
            value={password}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title={loading ? "Logging in..." : "Login"}
            onPress={handleLogin}
          />

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or Login with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialIcons}>
            <Image source={require("../../assets/apple.png")} style={styles.icon} />
            <Image source={require("../../assets/google.png")} style={styles.icon} />
            <Image source={require("../../assets/facebook.png")} style={styles.icon} />
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("CollectInfo")}>
              <Text style={styles.signupLink}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
