import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './StatCard.styles';
interface Props {
  icon: string;
  label: string;
  value: string;
  unit: string;
}

const StatCard: React.FC<Props> = ({ icon, label, value, unit }) => {
  return (
    <View style={styles.card}>
      <Icon name={icon} size={20} color="#1a73e8" />
      <Text style={styles.value}>{value} <Text style={styles.unit}>{unit}</Text></Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};
export default StatCard;