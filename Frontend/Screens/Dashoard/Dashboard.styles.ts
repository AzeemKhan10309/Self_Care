import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: 0,
  },

  headerContainer: {
    position: "relative",
    height: 200,
  },

  headerBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  feeling: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 25,
    color: "#333",
  },

  upcomingDoseContainer: {
    padding: 20,
    borderRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
  },

  upcomingDose: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
    color: "#1F62E8",
  },

  doseCard: {
    backgroundColor: "#1F62E8",
    padding: 20,
    borderRadius: 10,
    marginBottom: 0,
  },

  doseDetails: {
    fontSize: 21,
    color: "#FFFFFF",
    marginTop: 5,
    fontWeight: "600",
  },

  todayReminderContainer: {
    marginTop: 0,
    paddingHorizontal: 20,
  },

  reminderTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 15,
    color: "#1F62E8",
  },

  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 0,
  },

  

  addicon: {
    width: 85,
    height: 85,
  },

  // ------------------- Floating Buttons -------------------
fabContainer: {
  position: "absolute",
  bottom: 100, // raised slightly above the bottom tabs
  right: 20,
  alignItems: "center",
  zIndex: 10, // ensure buttons appear above other content
},

mainButton: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#1F62E8", // optional: give it a green background
  justifyContent: "center",
  alignItems: "center",
  elevation: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
},

mainIcon: {
  width: 25,
  height: 25,
},

childButton: {
  position: "absolute",
  width: 55,
  height: 55,
  borderRadius: 27,
  backgroundColor: "#fff", // white background for secondary buttons
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 5,
},

childIcon: {
  width: 20,
  height: 20,
},

});

export default styles;
