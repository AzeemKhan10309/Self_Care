import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import SplashScreen from "../Screens/Splash/Splash";
import Loader from "../Components/Loader/Loader";
import { RootState } from "../Redux/Store";

export default function RootNavigator() {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const checkSplash = async () => {
      try {
        const alreadyShown = await AsyncStorage.getItem("splashShown");
        if (!alreadyShown) {
          setShowSplash(true);
          await AsyncStorage.setItem("splashShown", "true");
        } else {
          setShowSplash(false);
        }
      } catch (err) {
        console.log("Splash check error:", err);
        setShowSplash(false);
      }
    };
    checkSplash();
  }, []);

  // 1️⃣ Splash Screen
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // 2️⃣ Loader while Redux auth is checking
  if (loading) {
    return <Loader />;
  }

  // 3️⃣ Main Navigation
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
