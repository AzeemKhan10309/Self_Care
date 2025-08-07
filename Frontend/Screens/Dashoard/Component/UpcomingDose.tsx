import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import styles from '../Component/UpComingDose.styles';
interface DoseCardProps {
  title: string;
  image: ImageSourcePropType;
  doseName: string;
  doseDetails: string;
  doseDate: string;
  doseTime: string;
}

const UpComingDose: React.FC<DoseCardProps> = ({
  title,
  image,
  doseName,
  doseDetails,
  doseDate,
  doseTime,
}) => {
  return (
    <View style={styles.upcomingDoseContainer}>
      <Text style={styles.upcomingDose}>{title}</Text>
      <View style={styles.doseCard}>
        <Image source={image} style={styles.icon} resizeMode="contain" />
        <Text style={styles.doseName}>{doseName}</Text>
        <Text style={styles.doseDetails}>{doseDetails}</Text>
        <Text style={styles.doseDate}>{doseDate}</Text>
        <View style={styles.bottomRow}>
          <View style={styles.timeBox}>
            <Text style={styles.timeText}>{doseTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UpComingDose;