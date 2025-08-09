import React from 'react';
import { View, Text } from 'react-native';
import styles from './DoseTab.styles';
interface Props {
  day: string;
  weekday: string;
  isActive?: boolean;
}

const DateTab: React.FC<Props> = ({ day, weekday, isActive }) => {
  return (
  <View
      style={[
        styles.dateTab,
        isActive ? styles.activeTab : styles.inactiveTab,
      ]}
    >
      <Text
        style={[
          styles.dateNumber,
          isActive ? styles.activeText : styles.inactiveTab,
        ]}
      >
        {day}
      </Text>
      <Text
        style={[
          styles.dayText,
          isActive ? styles.activeText : styles.inactiveTab,
        ]}
      >
        {weekday}
      </Text>
    </View>
  );
};



export default DateTab;
