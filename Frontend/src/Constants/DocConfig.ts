import type { DoctorTabParamList } from "../../Types/DoctorNavigation";

export const doctorTabs: { 
  key: keyof DoctorTabParamList; 
  label: string; 
  icon: any; 
  focusedIcon: any; 
}[] = [
  {
    key: "PatientsTab",   
    label: "Patients",
     icon: require("../../assets/Home.png"),
    focusedIcon: require("../../assets/Home-onclick.png"),
  },
  {
    key: "AppointmentsTab",   
    label: "Appointments",
     icon: require("../../assets/Home.png"),
    focusedIcon: require("../../assets/Home-onclick.png"),
  },
  {
    key: "HealthMonitorTab",   
    label: "Health",
     icon: require("../../assets/Home.png"),
    focusedIcon: require("../../assets/Home-onclick.png"),
  },
  {
    key: "ProfileTab",   
    label: "Profile",
    icon: require("../../assets/Home.png"),
    focusedIcon: require("../../assets/Home-onclick.png"),
  },
];
