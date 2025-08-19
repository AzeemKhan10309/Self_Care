import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
} from "react-native";

// ✅ Extend TextInputProps so all RN TextInput props are supported
interface InputProps extends TextInputProps {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, style, ...rest }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]} // merge styles
        {...rest} // ✅ spread all props (value, onChangeText, onBlur, etc.)
      />
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    position: "absolute",
    right: 16,
    top: 18,
    fontSize: 14,
    color: "#999",
  },
});

export default Input;
