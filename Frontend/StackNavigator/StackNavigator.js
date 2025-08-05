import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../Screens/Splash/Splash";
import CollectInfoScreen from "../Screens/CollectInfo/CollectInfoScreen";

const Stack = createNativeStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen 
                name="Splash" 
                component={SplashScreen} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="CollectInfo" 
                component={CollectInfoScreen} 
                options={{ title: "Your Info" }} 
            />
        </Stack.Navigator>
    );
}

export default StackNavigator;
