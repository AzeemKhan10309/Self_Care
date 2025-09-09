import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardTypeOptions,
  ViewStyle,
  TextInputProps,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
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
  containerStyle,
  ...rest   // ✅ forward remaining props
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
        {...rest}   // ✅ VERY IMPORTANT
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
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,

    elevation: 4,

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
