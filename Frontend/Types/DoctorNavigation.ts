// types/DoctorNavigation.ts
export type DoctorStackParamList = {
  DoctorDashboard: undefined;       
  DoctorTabs: { screen?: keyof DoctorTabParamList } | undefined;
};

export type DoctorTabParamList = {
  PatientsTab: undefined;
  AppointmentsTab: undefined;
  HealthMonitorTab: undefined;
  ProfileTab: undefined;
};
