import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
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

  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((loggedInUser) => {
      
        if (loggedInUser?._id) {
          dispatch(fetchUserInfo(loggedInUser._id));
        }
      })
      .catch(() => {
       
      });
  };

  useEffect(() => {
    if (user) {
      navigation.navigate("Dashboard");
    }

    if (error) {
      Alert.alert("Login Failed", error, [{ text: "OK" }]);
    }
  }, [user, error, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login your account</Text>

      <Input value={email} placeholder="Email" onChangeText={setEmail} />
      <Input
        value={password}
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} />

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
    </View>
  );
};

export default LoginScreen;
