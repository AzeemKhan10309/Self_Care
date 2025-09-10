// types/DoctorNavigation.ts
export type DoctorStackParamList = {
  DoctorDashboard: undefined;       
  DoctorTabs: { screen?: keyof DoctorTabParamList } | undefined;
};

export type DoctorTabParamList = {
  Home: undefined;           
  Patients: undefined;       
  Chat: undefined;           
  Profile: undefined;        
};
