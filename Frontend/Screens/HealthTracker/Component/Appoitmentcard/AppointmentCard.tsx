// AppointmentCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import styles from "./AppointmentCard.styles";
type Appointment = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  date: string;
  time: string;
  image: string;
};

type Props = {
  item: Appointment;
};

export default function AppointmentCard({ item }: Props) {
  return (
    <View style={styles.appointmentCard}>
      <Image source={{ uri: item.image }} style={styles.appointmentImage} />
      <View style={styles.cardText}>
        <Text style={{ fontWeight: "600" }}>{item.name}</Text>
        <Text>{item.specialty}</Text>
        <Text>{item.date} • {item.time}</Text>
      </View>
    </View>
  );
}

