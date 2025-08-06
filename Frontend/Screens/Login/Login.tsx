import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Types/navigation";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const LoginScreen: React.FC = () => {
  const navigation = useNavigation<DashboardNavigationProp>();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    console.log('Logging in with:', { email, password });
    navigation.navigate('Dashboard'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input
        value={email}
        placeholder="Enter your email"
        onChangeText={setEmail}
        label="Email"
      />
      <Input
        value={password}
        placeholder="Enter your password"
        onChangeText={setPassword}
        secureTextEntry
        label="Password"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;