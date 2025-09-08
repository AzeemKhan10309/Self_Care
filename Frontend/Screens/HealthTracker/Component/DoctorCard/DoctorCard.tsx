import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "./DoctorCard.styles";
interface DoctorProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    hospital: string;
    rating: number;
    time: string;
    image: string;
  };
}

const DoctorCard: React.FC<DoctorProps> = ({ doctor }) => (
  <View style={styles.doctorCard}>
<Image
  source={require("../../../../assets/Doctor.png")}
  style={styles.docImage}
/>
    
      <View style={styles.container}>
      <View style={styles.box}>
      <Text style={styles.docName}>{doctor.name}</Text>
      <Text style={styles.docSpecialty}>
        {doctor.specialty} | {doctor.hospital}
      </Text>
      <View style={styles.ratingRow}>
        <Text style={styles.rating}>{doctor.rating}</Text>
        <MaterialIcons name="star" size={16} color="gold" />
        <Ionicons name="time-outline" size={16} color="gray" />
        <Text style={styles.time}>{doctor.time}</Text>
      </View>
      </View>
      <TouchableOpacity style={styles.bookBtn}>
        <Text style={styles.bookBtnText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.heart}>
    <Ionicons name="heart-outline" size={22} color="#1F62E8" />
    </View>
  </View>
);

export default DoctorCard;