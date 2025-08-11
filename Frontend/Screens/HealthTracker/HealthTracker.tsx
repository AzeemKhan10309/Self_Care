import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ProgressCard from '../HealthTracker/Component/ProgressCard/ProgressCard';
import StatCard from '../HealthTracker/Component/StatCard/Statcard';
import ActivityItem from '../HealthTracker/Component/ActivityItem/ActivityItem';
import BottomTab from '../../Components/BottomNavbar/BottomNavbar';
import { tabs } from '../../src/Constants/TabConfig';
export default function HomeScreen() {
const [activeTab, setActiveTab] = React.useState("HealthTracker");
const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
};

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 12 }}>
      
      <ProgressCard
        icon="walk"
        title="Daily Walking"
        subtitle="Calories consumption in a day"
        steps={7495}
        distance="3,5"
        calories="195"
      />

      <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 8 }}>3 days ago</Text>
      <View style={{ flexDirection: 'row' }}>
        <StatCard icon="heart" label="Heart Rate" value="78" unit="bpm" />
        <StatCard icon="lightning-bolt" label="Exercise" value="24" unit="min" />
        <StatCard icon="walk" label="Walking" value="3" unit="km" />
      </View>

      <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 8 }}>Other Activities</Text>
      <ActivityItem name="Jogging" distance="1 mile" calories="100 cal" image={require('../../assets/jogging.png')} />
      <ActivityItem name="Cycling" distance="1 mile" calories="50-60 cal" image={require('../../assets/cycling.png')} />
      <ActivityItem name="Hiking" distance="1 mile" calories="150 cal" image={require('../../assets/hiking.png')} />

    

       <BottomTab
                activeTab={activeTab}
                onTabPress={handleTabPress}
                tabs={tabs}
            />
    </View>
  );
}
