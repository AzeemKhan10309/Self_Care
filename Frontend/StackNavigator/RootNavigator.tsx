import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { navigationRef } from "../navigationService";

import SplashScreen from "../Screens/Splash/Splash";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

export default function RootNavigator() {
  const { user, loading,usernameAvailable } = useSelector((state: RootState) => state.auth);
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash || loading) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }
  console.log("Redux user:", user);
console.log("UsernameAvailable:", usernameAvailable);


  return (
    <NavigationContainer ref={navigationRef}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
