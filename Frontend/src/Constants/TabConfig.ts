import type { RootStackParamList } from "../../Types/navigation";

export const tabs: { 
  key: keyof RootStackParamList; 
  label: string; 
  icon: any; 
  focusedIcon: any; 
}[] = [
  {
    key: "DashboardTab",   
    label: "Home",
    icon: require("../../assets/Home.png"),
    focusedIcon: require("../../assets/Home-onclick.png"),
  },
  {
    key: "SummaryTab",     
    label: "Summary",
    icon: require("../../assets/Today-medicine.png"),
    focusedIcon: require("../../assets/Today-medicine-onclick.png"),
  },
  {
    key: "HealthTrackerTab",
    label: "Health Tracker",
    icon: require("../../assets/Health-tracker.png"),
    focusedIcon: require("../../assets/Health-tracker-onclick.png"),
  },
  {
    key: "ProfileTab",     
    label: "Profile",
    icon: require("../../assets/Profile-setting.png"),
    focusedIcon: require("../../assets/Profile-setting-onclick.png"),
  },
];
