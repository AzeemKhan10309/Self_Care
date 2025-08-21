import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginTop: 15,
  },
  dateText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: "#eee",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDay: {
    backgroundColor: "#1F62E8",
  },
  dayText: {
    fontSize: 14,
    color: "#333",
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
