  import React, { useEffect, useRef } from "react";
  import { View, Text, StyleSheet, Animated } from "react-native";
  import { useNavigation } from "@react-navigation/native";
  import { NativeStackNavigationProp } from "@react-navigation/native-stack";
  import { RootStackParamList } from "../../Types/navigation";
  import styles from "./Splash.styles";
  type SplashScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Splash"
  >;
  interface SplashProps {
    onFinish: () => void; // 👈 yeh add karo
  }

const SplashScreen: React.FC<SplashProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

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
    ]).start(() => {
      setTimeout(() => {
  onFinish();
      }, 2000);
    });
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
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: scaleAnim.interpolate({
                    inputRange: [0.8, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          Where Health Meets Technology.
        </Animated.Text>
      </View>
    );
  };

  export default SplashScreen;

 
