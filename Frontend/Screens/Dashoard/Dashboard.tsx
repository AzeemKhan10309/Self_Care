import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import MedicationReminder from '../../Components/MedicineReminder/MedicineReminder';
const Dashboard: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../../assets/Home-bg.png')}
                    style={styles.headerBackground}
                    resizeMode="cover"
                />
                <View style={styles.profileRow}>
                    <Image
                        source={require('../../assets/Profile.png')}
                        style={styles.profileImage}
                    />
                    <View style={styles.nameLocation}>
                        <Text style={styles.greeting}>Hello, Qasim!</Text>
                        <View style={styles.locationRow}>
                            <Image
                                source={require('../../assets/Location.png')}
                                style={styles.locationIcon}
                                resizeMode="contain"
                            />
                            <Text style={styles.location}>Lahore</Text>
                        </View>

                    </View>



                </View>
                <Text style={styles.feeling}>How are you feeling today?</Text>

            </View>


            <View style={styles.upcomingDoseContainer}>
                <Text style={styles.upcomingDose}>Upcoming Dose</Text>
                <View style={styles.doseCard}>
                    <Image
                        source={require('../../assets/pills.png')}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                    <Text style={styles.doseName}>Paracetamol</Text>
                    <Text style={styles.doseDetails}>2 Pills</Text>
                    <Text style={styles.doseDate}>8 Aug, 2025</Text>
                    <View style={styles.bottomRow}>
                        <View style={styles.timeBox}>
                            <Text style={styles.timeText}>10:30 PM</Text>
                        </View>
                    </View>
                </View>


            </View>

            <View style={styles.todayReminderContainer}>
                <Text style={styles.reminderTitle}>Today's Reminders</Text>

                <MedicationReminder
                    name="panadol"
                    time="10:30 PM"
                    pills="2 Pills"
                    onComplete={() => console.log('Completed')}
                    onCancel={() => console.log('Cancelled')}
                />


            </View>
            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton}>
                    <Image
                        source={require('../../assets/Add.png')}
                        style={styles.addicon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

import styles from './Dashboard.styles';

export default Dashboard;