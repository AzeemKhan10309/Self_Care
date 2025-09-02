export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  OTPCode: undefined;
  CreateNewPassword: undefined;
  PasswordChanged: undefined;
  Splash: undefined;
};

export type AppStackParamList = {
  Dashboard: undefined;
  ProfileScreen: undefined;
  Summary: undefined;
  EditProfile: undefined;
  Alarm: undefined;
  HealthTracker: undefined;
  CollectInfo: undefined;
  AddMedicine: undefined;
  DashboardTab: undefined;
  SummaryTab: undefined;
  HealthTrackerTab: undefined;
  AddDependent: undefined;
  ProfileTab: undefined;
  
};



export type RootStackParamList = AuthStackParamList & AppStackParamList;
