export type DoctorStackParamList = {
  Home: undefined;
  Patients: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type DoctorTabParamList = {
  HomeTab: undefined;
  PatientsTab: undefined;
  ChatTab: undefined;
  ProfileTab: undefined;
};
export type PatientsStackParamList = {
  MyPatients: undefined;
  PatientProfile: { patient: any };
  ChatScreen: undefined;
  InboxScreen: { userId: string };
  CallScreen: { userId: string }; };
