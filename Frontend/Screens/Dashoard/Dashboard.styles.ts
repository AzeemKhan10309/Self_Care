import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  doseName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    paddingLeft: 100,
  },
  doseDetails: {
    fontSize: 14,
    color: "#ffffff",
    paddingLeft: 100,
  },
  doseDate: {
    fontSize: 14,
    color: "#ffffff",
    paddingLeft: 100,
  },
  doseTime: {
    fontSize: 14,
    color: "#ffffff",
  },
  bottomRow: {
    marginTop: -10,
    alignItems: "flex-end",
    position: "absolute",
    right: 20,
    bottom: 23,
  },
  timeBox: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 60,
  },
  timeText: {
    color: "#1976D2",
    fontWeight: "bold",
    fontSize: 16,
  },
  icon: {
    height: 50,
    width: 50,
    position: "absolute",
    left: 30,
    top: 18,
  },
  addButton: {
    backgroundColor: "#2f21f0ff",
    paddingVertical: 4,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    alignSelf: "flex-start",
  },
  addButtonText: {
    fontSize: 20,
    color: "#ffffff",
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
    marginTop: 680,
    left: 355,
    zIndex: 0,
  },
  addicon: {
    width: 85,
    height: 85,
  },

  headerContainer: {
    position: "relative",
    height: 200,
    marginTop: 0,
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
});

export default styles;
