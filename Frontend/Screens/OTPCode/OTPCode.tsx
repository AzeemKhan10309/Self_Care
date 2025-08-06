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

const OTPCodeScreen = ({ navigation }: any) => {
    const numberOfDigits = 6;
    const [otp, setOtp] = useState(Array(numberOfDigits).fill(''));
    const inputs = useRef<TextInput[]>([]);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < numberOfDigits - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleVerify = () => {
        const code = otp.join('');
        console.log('Entered OTP:', code);
        // Add your verification logic here
        navigation.navigate('CreateNewPassword'); // Example
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
                    <TextInput
                        key={index}
                        style={styles.otpInput}
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        ref={(ref: TextInput | null) => {
    if (ref) {
        inputs.current[index] = ref;
    }
}}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleVerify}>
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('Resend Code')}>
                <Text style={styles.resendText}>
                    Didn’t receive the code? <Text style={styles.resendLink}>Resend</Text>
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default OTPCodeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        alignSelf: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#7e7e7e',
        textAlign: 'center',
        marginBottom: 40,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    otpInput: {
        width: 48,
        height: 58,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#2563eb',
        paddingVertical: 14,
        borderRadius: 25,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    resendText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#7e7e7e',
    },
    resendLink: {
        color: '#2563eb',
        fontWeight: '600',
    },
});
