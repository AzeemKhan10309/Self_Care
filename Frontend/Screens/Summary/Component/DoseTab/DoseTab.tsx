import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import styles from "./DoseTab.styles";
type DoseTabProps = {
  day: string; 
  weekday: string; 
  isActive: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

const DoseTab: React.FC<DoseTabProps> = ({ day, weekday, isActive, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tab,
        isActive ? styles.activeTab : styles.inactiveTab,
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.weekday, isActive && styles.activeText]}>
          {weekday}
        </Text>
        <Text style={[styles.day, isActive && styles.activeText]}>
          {day}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


export default DoseTab;
