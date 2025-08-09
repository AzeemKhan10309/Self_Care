import React,{useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import DateTab from '../Component/DoseTab/DoseTab';
import DoseItem from '../Component/DoesItem/DoesItem';
import BottomTab from '../../../Components/BottomNavbar/BottomNavbar';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../Types/navigation";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
import { tabs } from '../../../src/Constants/TabConfig';
import NotificationCard from './NotificationCard/NotificationCard';
import styles from '../Summary.styles';

const Summary: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Summary");
    const navigation = useNavigation<NavigationProp>();
      const doseData = [
    { time: '8am', taken: false, medicine: 'Paracetamol 250mg', quantity: 2 },
    { time: '8am', taken: true, medicine: 'Paracetamol 250mg', quantity: 1, showPillLabel: true },
    { time: '7pm', taken: true, medicine: 'Paracetamol 250mg', quantity: 2, showPillLabel: true },
    { time: '8pm', taken: true, medicine: 'Paracetamol 250mg', quantity: 1, showPillLabel: true },
  ];
  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);   
    navigation.navigate(tabKey as keyof RootStackParamList);
  };    
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.summary}>Today’s Summary</Text>

      <View style={styles.dateTabs}>
        {['27', '28', '29', '30', '1'].map((day, idx) => (
          <DateTab
            key={day}
            day={day}
            weekday={['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][idx]}
            isActive={idx === 2}
            
          />
        ))}
      </View>
   
   
   <Text style={styles.TodaysDose}>Today’s Dose</Text>
  <NotificationCard
        date="Sep 14th"
        weekday="Thu"
        message="You’ve skipped one dose of your medicine!"
      />
        {doseData.map((item, index) => (
        <DoseItem
          key={index}
          time={item.time}
          taken={item.taken}
          medicine={item.medicine}
          quantity={item.quantity}
          showPillLabel={item.showPillLabel}
        />
      ))}
      <View style={styles.line} >
       <BottomTab
                activeTab={activeTab}
                onTabPress={handleTabPress}
                tabs={tabs}
            />
      </View>
    

    </View>
  );
};

export default Summary;
