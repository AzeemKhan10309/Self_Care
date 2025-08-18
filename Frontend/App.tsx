import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import RootNavigator from "./StackNavigator/RootNavigator";
import {store} from "./Redux/Store"
import { navigationRef } from "./navigationService";

const App: React.FC = () => {
  return (
 <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
