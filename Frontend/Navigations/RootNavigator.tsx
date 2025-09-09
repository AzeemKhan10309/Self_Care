import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthStack from "./AuthStack";
import UserTabs from "./User/UserTabs";
import DoctorStack from "./Doctor/DoctorStack";
import TrainerTabs from "./Doctor/DoctorTabs";

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

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthStack />
      ) : user.role === "doctor" ? (
        <DoctorStack />
      ) : user.role === "trainer" ? (
        <TrainerTabs />
      ) : (
        <UserTabs />
      )}
    </NavigationContainer>
  );
}
