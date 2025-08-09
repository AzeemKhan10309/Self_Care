// components/NotificationCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import styles from './Notification.styles';
interface Props {
  date: string;
  weekday: string;
  message: string;
}

const NotificationCard: React.FC<Props> = ({ date, weekday, message }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.weekdayText}> {weekday}</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.iconWrapper}>
        <Icon name="bell-ring-outline" size={22} color="#fff" />
      </View>
    </View>
  );
};

export default NotificationCard;


