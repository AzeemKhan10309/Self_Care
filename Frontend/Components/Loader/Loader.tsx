import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import styles from "./Loader.styles";
const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2563EB" />
    </View>
  );
};

export default Loader;