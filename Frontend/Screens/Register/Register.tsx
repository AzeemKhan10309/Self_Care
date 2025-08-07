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

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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

export default RegisterScreen;
