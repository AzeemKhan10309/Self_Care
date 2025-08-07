import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

const OTPCodeScreen = ({ navigation }: any) => {
  const numberOfDigits = 6;
  const [otp, setOtp] = useState<string[]>(Array(numberOfDigits).fill(''));
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < numberOfDigits - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    console.log('Entered OTP:', code);
    navigation.navigate('CreateNewPassword');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Enter the verification code we just sent on your email address.
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <Input
            key={index}
            keyboardType="numeric"
            placeholder='5'
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
           
          />
        ))}
      </View>

     <Button title="Verify" onPress={handleVerify} />

      <TouchableOpacity onPress={() => console.log('Resend Code')}>
        <Text style={styles.resendText}>
          Didn’t receive the code? <Text style={styles.resendLink}>Resend</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default OTPCodeScreen;

import styles from './Otp.styles';