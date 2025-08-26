import React, { useEffect } from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import * as Notifications from 'expo-notifications';
import styles from "./UpComingDose.styles";

interface DoseCardProps {
  title: string;
  image: ImageSourcePropType;
  doseName: string;
  doseDetails: string;
  doseDate: string; // format: "YYYY-MM-DD"
  doseTime: string; // format: "HH:mm"
}

const UpComingDose: React.FC<DoseCardProps> = ({
  title,
  image,
  doseName,
  doseDetails,
  doseDate,
  doseTime,
}) => {

  useEffect(() => {
    const scheduleNotification = async () => {
      // Ask for notification permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn("Notification permission not granted");
        return;
      }

      // Parse date + time from props
      const [year, month, day] = doseDate.split('-').map(Number);
      const [hour, minute] = doseTime.split(':').map(Number);

      const triggerDate = new Date(year, month - 1, day, hour, minute, 0);

      // Only schedule if it's in the future
      if (triggerDate > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Dose Reminder',
            body: `Time to take ${doseName}`,
          },
          trigger: {
            type: "date",     // ✅ required for DateTriggerInput
            date: triggerDate // the exact Date
          } as Notifications.DateTriggerInput,
        });
      }
    };

    scheduleNotification();
  }, [doseDate, doseTime, doseName]);

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
