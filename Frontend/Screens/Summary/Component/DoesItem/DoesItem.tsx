// components/DoseItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import styles from './DoesItem.styles';
interface Props {
  time: string;
  taken: boolean;
  medicine: string;
  quantity: number;
  showPillLabel?: boolean;
}

const DoseItem: React.FC<Props> = ({ time, taken, medicine, quantity, showPillLabel }) => {
  return (
    <View style={styles.doseRow}>
      <Text style={styles.timeText}>{time}</Text>
      <Icon
        name={taken ? 'check-bold' : 'close-thick'}
        size={18}
        color={taken ? '#2979FF' : '#000'}
        style={styles.statusIcon}
      />
      <View style={styles.doseInfo}>
        <Text style={styles.medicineText}>
          {showPillLabel && <Text style={styles.pillText}>Pill </Text>}
          {medicine}
        </Text>
        <View style={styles.pillRow}>
          <Icon name="pill" size={16} color="#aaa" />
          <Text style={styles.quantityText}> {quantity}</Text>
        </View>
      </View>
    </View>
  );
};

export default DoseItem;

