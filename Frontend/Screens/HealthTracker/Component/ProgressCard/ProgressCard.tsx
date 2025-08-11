import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './ProgressCard.styles';
interface Props {
  icon: string;
  title: string;
  subtitle: string;
  steps: number;
  distance: string;
  calories: string;
}

const ProgressCard: React.FC<Props> = ({ icon, title, subtitle, steps, distance, calories }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Icon name={icon} size={22} color="#fff" />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.circle}>
        <Text style={styles.steps}>{steps.toLocaleString()}</Text>
        <Text style={styles.stepsLabel}>Steps</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
        <Text style={styles.info}>Distance</Text>

          <Text style={styles.infoValue}>{distance}</Text>
          <Text style={styles.infoLabel}>Km</Text>
        </View>
        <View style={styles.infoItem}>
                      <Text style={styles.info}>Calories</Text>

          <Text style={styles.infoValue}>{calories}</Text>
          <Text style={styles.infoLabel}>Kcal</Text>
        </View>
      </View>
    </View>
  );
};
export default ProgressCard;