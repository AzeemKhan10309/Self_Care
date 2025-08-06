import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardTypeOptions } from 'react-native';

interface InputProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  editable?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions; 
   placeholderTextColor?: string;
autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
 maxLength?: number;}


const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  onChangeText,
  label,
  editable = true,
  secureTextEntry,
  keyboardType, 
  placeholderTextColor = '#B0B0B0',

}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        editable={editable}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType} 
        placeholderTextColor="#B0B0B0"
      />
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    position: 'absolute',
    right: 16,
    top: 18,
    fontSize: 14,
    color: '#999',
  },
});

export default Input;
