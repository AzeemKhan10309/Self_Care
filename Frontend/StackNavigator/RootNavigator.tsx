import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RootState } from "../Redux/Store";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import SplashScreen from "../Screens/Splash/Splash";

export default function RootNavigator() {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const checkSplash = async () => {
      const alreadyShown = await AsyncStorage.getItem("splashShown");
      if (!alreadyShown) {
        await AsyncStorage.setItem("splashShown", "true");
      }
      setShowSplash(false);
    };
    checkSplash();
  }, []);

 if (showSplash || loading) {
  return <SplashScreen onFinish={() => setShowSplash(false)} />;
}

   return user ? <AppStack /> : <AuthStack />;

}
