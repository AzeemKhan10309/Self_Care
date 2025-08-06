import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../../Components/Button/Button';
import styles from './PasswordChange.styles';

type RootStackParamList = {
  Login: undefined;
};

type PasswordChangedScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function PasswordChanged() {
  const navigation = useNavigation<PasswordChangedScreenNavigationProp>();

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
        <Image
          source={require('../../assets/badge.png')}
          style={styles.badge}
          resizeMode="contain"
        />

        <Text style={styles.title}>Password Changed!!</Text>
        <Text style={styles.message}>
          Your password has been changed{'\n'}successfully.
        </Text>
    <View style={styles.buttonContainer}>
                  <Button title="Back to Login" onPress={handleBackToLogin} />
                  </View>



    </SafeAreaView>

  );
}
