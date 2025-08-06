
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Types/navigation";

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRegister = () => {
    console.log('Registering:', { username, email, password });
    navigation.navigate('CollectInfo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#B0B0B0"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#B0B0B0"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#B0B0B0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or Sign Up with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialIcons}>
        <Image source={require('../../assets/apple.png')} style={styles.icon} />
        <Image source={require('../../assets/google.png')} style={styles.icon} />
        <Image source={require('../../assets/facebook.png')} style={styles.icon} />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  signUpButton: {
    backgroundColor: '#0B5FFF',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 30,
  },
  signUpText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D9D9D9',
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#333',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#000',
  },
  loginLink: {
    fontSize: 14,
    color: '#0B5FFF',
    fontWeight: '600',
  },
});

export default RegisterScreen;
