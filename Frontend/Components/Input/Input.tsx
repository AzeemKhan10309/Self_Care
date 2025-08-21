import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardTypeOptions,
  ViewStyle,
} from "react-native";

interface InputProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  editable?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholderTextColor?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  maxLength?: number;
  containerStyle?: ViewStyle; // <-- Added
}

const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  onChangeText,
  label,
  editable = true,
  secureTextEntry,
  keyboardType,
  placeholderTextColor = "#B0B0B0",
  containerStyle, // <-- Added
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        editable={editable}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={placeholderTextColor}
          underlineColorAndroid="transparent" 
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

  // Shadow (iOS)
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 6,

  // Shadow (Android)
  elevation: 4,

  // 🔑 Ye dono add karo taake white border na aaye
  borderWidth: 0, 
  borderColor: "transparent",
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
