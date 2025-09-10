import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./DoctorProfile.styles";

const DoctorProfile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
          }}
          style={styles.doctorImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Ionicons name="create-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View style={styles.infoCard}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>Dr. AR Khan</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>4.8</Text>
            <Ionicons name="star" size={16} color="#FFD700" />
          </View>
        </View>
        <Text style={styles.specialization}>Psychologists</Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#888" />
          <Text style={styles.locationText}>
            Apollo Hospital | Indus Hospital, Lhr
          </Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsRow}>
          <View style={styles.statsItem}>
            <Text style={styles.statsValue}>15yr</Text>
            <Text style={styles.statsLabel}>Experience</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsValue}>50+</Text>
            <Text style={styles.statsLabel}>Treated</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsValue}>3000/Pkr</Text>
            <Text style={styles.statsLabel}>Fee</Text>
          </View>
        </View>

        {/* About Section */}
        <Text style={styles.sectionTitle}>About me</Text>
        <Text style={styles.aboutText}>
          Dr. David Patel, a dedicated cardiologist, brings a wealth of
          experience to Golden Gate Cardiology Center in Golden Gate, CA.{" "}
          <Text style={styles.viewMore}>view more</Text>
        </Text>

        {/* Working Days */}
        <Text style={styles.sectionTitle}>Working Days</Text>
        <View style={styles.daysRow}>
          {["Monday", "Thursday", "Friday", "Saturday"].map((day, index) => (
            <View key={index} style={styles.dayChip}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Clinic Time */}
        <Text style={styles.sectionTitle}>Clinic Time</Text>
        <View style={styles.timeRow}>
          <View style={styles.timeChipActive}>
            <Text style={styles.timeTextActive}>10:30am - 11:30am</Text>
          </View>
          <View style={styles.timeChipActive}>
            <Text style={styles.timeTextActive}>11:30am - 12:30pm</Text>
          </View>
          <View style={styles.timeChip}>
            <Text style={styles.timeText}>12:30am - 1:30pm</Text>
          </View>
          <View style={styles.timeChipActive}>
            <Text style={styles.timeTextActive}>2:30am - 3:30pm</Text>
          </View>
          <View style={styles.timeChipActive}>
            <Text style={styles.timeTextActive}>3:30am - 4:30pm</Text>
          </View>
          <View style={styles.timeChip}>
            <Text style={styles.timeText}>4:30am - 5:30pm</Text>
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewHeader}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.reviewCard}>
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/women/44.jpg",
            }}
            style={styles.reviewerImage}
          />
          <View style={styles.reviewContent}>
            <Text style={styles.reviewerName}>Emily Anderson</Text>
            <View style={styles.starsRow}>
              {[...Array(5)].map((_, i) => (
                <Ionicons key={i} name="star" size={14} color="#FFD700" />
              ))}
              <Text style={styles.reviewRating}>5.0</Text>
            </View>
            <Text style={styles.reviewText}>
              Dr. Patel is a true professional who genuinely cares about his
              patients. I highly recommend Dr. Patel to anyone seeking
              exceptional cardiac care.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DoctorProfile;
