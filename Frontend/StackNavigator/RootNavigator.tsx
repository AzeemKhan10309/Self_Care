import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { navigationRef } from "../navigationService";

import SplashScreen from "../Screens/Splash/Splash";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import SplashScreen from "../Screens/Splash/Splash";
import Loader from "../Components/Loader/Loader";

export default function RootNavigator() {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const checkSplash = async () => {
      const alreadyShown = await AsyncStorage.getItem("splashShown");
      if (!alreadyShown) {
        setShowSplash(true);
        await AsyncStorage.setItem("splashShown", "true");
      } else {
        setShowSplash(false);
      }
    };
    checkSplash();
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      {loading ? (
        <Loader />
      ) : user ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}

    </NavigationContainer>
  );
}
