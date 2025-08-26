import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import RootNavigator from "./Navigations/RootNavigator";
import {store} from "./Redux/Store"

const App: React.FC = () => {
  return (
 <Provider store={store}>
        <RootNavigator />
    </Provider>
  );
};
export default App;
