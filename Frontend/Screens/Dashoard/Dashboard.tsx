import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import MedicationReminder from '../../Components/MedicineReminder/MedicineReminder';
const Dashboard: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hello, Qasim!</Text>
                <Text style={styles.location}>Lahore</Text>
                <Text style={styles.feeling}>How Are You Feeling Today?</Text>
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