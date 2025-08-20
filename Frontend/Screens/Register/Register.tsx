import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import styles from "./Register.styles";
import { useRegister } from "./Hooks/useRegister";

const RegisterScreen: React.FC = () => {
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
    handleRegister
  } = useRegister();

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Register your account</Text>

        <Input placeholder="Name" value={name} onChangeText={setName} />

        <Input
          placeholder="Username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            checkUsername(text);
          }}
        />

     {usernameMessage ? (
  <Text
    style={
      usernameAvailable
        ? styles.usernameMessageSuccess
        : styles.usernameMessageError
    }
  >
    {usernameMessage}
  </Text>
) : null}


      {usernameAvailable === false && suggestions.length > 0 && (
  <View style={styles.suggestions}>
    <Text style={styles.suggestionText}>Try one of these:</Text>
    {suggestions.map((sug, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => handleSelectSuggestion(sug)}
        style={styles.suggestionButton}
      >
        <Text style={styles.suggestionButtonText}>{sug}</Text>
      </TouchableOpacity>
    ))}
  </View>
)}


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
  );
};

export default RegisterScreen;
