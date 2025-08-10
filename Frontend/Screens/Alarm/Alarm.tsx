import React from 'react';
import { View, Text, Image, Dimensions, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../Alarm/Alram.styles';
import SwipeToStop from './Component/SwipeButton/SwipeToStop';

const { width } = Dimensions.get('window');

const MedicineAlarmScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E5BFF" />

      <Icon name="bell" size={40} color="white" style={{ marginBottom: 10 }} />

      <Text style={styles.medicineName}>Panadol</Text>
      <Text style={styles.medicineDose}>250 mg</Text>
      <Text style={styles.dayText}>DAY 01</Text>

      <Image
        source={require('../../assets/Alarm.png')}
        style={styles.pillImage}
        resizeMode="contain"
      />

      <Text style={styles.timeText}>08:00 AM</Text>
      <Text style={styles.instruction}>Take 1 Pill</Text>
      <Text style={styles.instruction}>Before Breakfast</Text>

      <View style={{ width: width * 0.85, marginTop: 30 }}>
        <SwipeToStop onSwipe={() => alert('Alarm Stopped')} />
      </View>
    </View>
  );
};

export default MedicineAlarmScreen;