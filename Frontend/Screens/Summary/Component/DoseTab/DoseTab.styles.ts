import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tab: {
    width: 80,
    marginHorizontal: 4,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#1F62E8",
  },
  inactiveTab: {
    backgroundColor: "#f0f0f0",
  },
  content: {
    alignItems: "center",
  },
  weekday: {
    fontSize: 14,
    color: "#555",
  },
  day: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  activeText: {
    color: "#fff",
  },
});


export default styles;
