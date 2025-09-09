import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

interface TabItem {
  key: string;
  label: string;
  icon: any;
  focusedIcon?: any;
}

interface BottomTabProps {
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  tabs: TabItem[];
}

const BottomTab: React.FC<BottomTabProps> = ({
  activeTab,
  onTabPress,
  tabs,
}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isFocused = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.key)}
          >
            <Image
              source={isFocused && tab.focusedIcon ? tab.focusedIcon : tab.icon}
              style={[styles.icon, isFocused && styles.focusedIcon]}
              resizeMode="contain"
            />
            <Text style={[styles.label, isFocused && styles.focusedLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

import styles from "./BottomNavbar.styles";

export default BottomTab;