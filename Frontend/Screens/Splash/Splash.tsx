import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Types/navigation';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const scaleAnim = useRef(new Animated.Value(0.8)).current; 
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start (()=> {
      setTimeout(() => {
        navigation.navigate('CollectInfo')
        }, 2000); 
  })
}, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.logoText,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.selfText}>Self </Text>
        <Text style={styles.careText}>Care</Text>
      </Animated.Text>
      <Animated.Text
        style={[
          styles.tagline,
          { opacity: fadeAnim, transform: [{ translateY: scaleAnim.interpolate({
            inputRange: [0.8, 1],
            outputRange: [20, 0],
          }) }] },
        ]}
      >
        Where Health Meets Technology.
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 8,
  },
  selfText: {
    color: '#000000',
  },
  careText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
