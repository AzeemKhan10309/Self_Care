import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import MedicationReminder from "../../Components/MedicineReminder/MedicineReminder";
import BottomTab from "../../Components/BottomNavbar/BottomNavbar";
import ProfileHeader from "../../Components/Profile/Profile";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../Types/navigation";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
import styles from "./Dashboard.styles";
import UpComingDose from "./Component/UpcomingDose";
import { tabs } from "../../src/Constants/TabConfig";
const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const navigation = useNavigation<NavigationProp>();
    const handleTabPress = (tabKey: string) => {
        setActiveTab(tabKey);
        navigation.navigate(tabKey as keyof RootStackParamList);
    };


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    source={require("../../assets/Home-bg.png")}
                    style={styles.headerBackground}
                    resizeMode="cover"
                />
                <ProfileHeader/>
                <Text style={styles.feeling}>How are you feeling today?</Text>
            </View>

            <UpComingDose
                title="Upcoming Dose"
                image={require("../../assets/pills.png")}
                doseName="Panadol"
                doseDetails="2 Pills"
                doseDate="2023-10-01"
                doseTime="10:30 PM"
            />

            <View style={styles.todayReminderContainer}>
                <Text style={styles.reminderTitle}>Today's Reminders</Text>
                <MedicationReminder
                    name="Panadol"
                    time="10:30 PM"
                    pills="2 Pills"
                    onComplete={() => console.log("Completed")}
                    onCancel={() => console.log("Cancelled")}
                />

            </View>
            <View style={styles.addButtonContainer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('Alarm')}
                >
                    <Image
                        source={require("../../assets/Add.png")}
                        style={styles.addicon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            <BottomTab
                activeTab={activeTab}
                onTabPress={handleTabPress}
                tabs={tabs}
            />
        </View>
    );
};

export default Dashboard;
