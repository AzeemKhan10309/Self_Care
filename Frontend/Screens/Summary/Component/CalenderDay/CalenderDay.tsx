import React from 'react';
import { View, Text} from 'react-native';
import styles from './CalenderDay.styles';
interface Props {
  day: string;
  weekday: string;
  isActive?: boolean;
}

const CalendarDay: React.FC<Props> = ({ day, weekday, isActive }) => {
  return (
    <View style={[styles.container, isActive && styles.active]}>
      <Text>{weekday}</Text>
      <Text>{day}</Text>
    </View>
  );
};



export default CalendarDay;
