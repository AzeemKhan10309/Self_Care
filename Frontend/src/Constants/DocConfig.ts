import type { DoctorTabParamList } from "../../Types/DoctorNavigation";

export const doctorTabs: { 
  key: keyof DoctorTabParamList; 
  label: string; 
  icon: any; 
  focusedIcon: any; 
}[] = [
  {
    key: "HomeTab",   
    label: "Home",
     icon: require("../../assets/Home.png"),
    focusedIcon: require("../../assets/Home-onclick.png"),
  },
  {
    key: "PatientsTab",   
    label: "Patients",
     icon: require("../../assets/Patient.png"),
    focusedIcon: require("../../assets/patientFocus.png"),
  },
  {
    key: "Chat",   
    label: "Chat",
     icon: require("../../assets/Chat.png"),
    focusedIcon: require("../../assets/Chat Focus.png"),
  },
  {
    key: "ProfileTab",   
    label: "Profile",
    icon: require("../../assets/Home.png"),
    focusedIcon: require("../../assets/Home-onclick.png"),
  },
];
