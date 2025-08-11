import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

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
  icon: {
    height: 50,
    width: 50,
    position: "absolute",
    left: 30,
    top: 18,
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
  }

})
export default styles;