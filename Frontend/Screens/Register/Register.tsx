import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import styles from "./Register.styles";
import { useRegister } from "./Hooks/useRegister";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../Types/navigation";

type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, "Register">;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterNavigationProp>();
  const {
    name, setName,
    username, setUsername,
    usernameAvailable, usernameMessage, suggestions,
    email, setEmail,
    password, setPassword,
    phone, setPhone,
    loading,
    checkUsername,
    handleSelectSuggestion,
    handleRegister,
  } = useRegister();

  const [role, setRole] = useState<"doctor" | "trainer" | "">("");

  const handleNext = () => {
    const form = { name, username, email, password, phone };

    if (!role) {
      // Normal user registration
      handleRegister("user", form);
      return;
    }

    // Role-specific registration
    if (role === "doctor") {
      navigation.navigate("DoctorCollectInfo", { form, role: "doctor" });
    } else if (role === "trainer") {
      navigation.navigate("TrainerCollectInfo", { form, role: "trainer" });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register your account</Text>

      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input
        placeholder="Username"
        value={username}
        onChangeText={(text) => { setUsername(text); checkUsername(text); }}
      />
      {usernameMessage && (
        <Text style={usernameAvailable ? styles.usernameMessageSuccess : styles.usernameMessageError}>
          {usernameMessage}
        </Text>
      )}
      {usernameAvailable === false && suggestions.length > 0 && (
        <View style={styles.suggestions}>
          <Text style={styles.suggestionText}>Try one of these:</Text>
          {suggestions.map((sug, i) => (
            <TouchableOpacity key={i} onPress={() => handleSelectSuggestion(sug)} style={styles.suggestionButton}>
              <Text style={styles.suggestionButtonText}>{sug}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Input placeholder="Phone" value={phone} onChangeText={setPhone} />

      <View style={{ flexDirection: "row", marginVertical: 15 }}>
        <TouchableOpacity
          style={[styles.radioButton, role === "doctor" && styles.radioSelected]}
          onPress={() => setRole("doctor")}
        >
          <Text style={styles.radioLabel}>Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, role === "trainer" && styles.radioSelected]}
          onPress={() => setRole("trainer")}
        >
          <Text style={styles.radioLabel}>Trainer</Text>
        </TouchableOpacity>
      </View>

      <Button
        title={loading ? "Processing..." : role ? "Create Profile" : "Register"}
        onPress={handleNext}
        disabled={loading}
      />
    </View>
  );
};

export default RegisterScreen;
