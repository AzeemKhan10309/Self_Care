import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

// Define your stack param list for type safety
type RootStackParamList = {
  Login: undefined;
  OTPCode: undefined;
};

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OTPCode'
>;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const handleSendCode = () => {
    console.log("Send code to:", email);
    navigation.navigate('OTPCode'); 
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={60}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              Don't worry! It occurs. Please enter the email address linked with your account.
            </Text>

            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#999"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleSendCode}>
              <Text style={styles.buttonText}>Send Code</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginLink} onPress={handleLogin}>
            <Text>
              <Text style={styles.loginLabel}>Remember Password? </Text>
              <Text style={styles.loginText}>Login</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  innerContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#8C8C8C',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  button: {
    width: '100%',
    backgroundColor: '#0066FF',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLabel: {
    color: '#000',
    fontSize: 14,
  },
  loginText: {
    color: '#0066FF',
    fontSize: 14,
    fontWeight: '600',
  },
});
