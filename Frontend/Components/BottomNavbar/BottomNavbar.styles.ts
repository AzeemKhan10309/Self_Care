import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",   // fixed at bottom
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
=======
    marginTop: 370,
    height: 75,
  },
  tabItem: {
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: "#ccc",
  },
  focusedIcon: {
    tintColor: "#2962FF",
    width: 30,
    height: 30,
  },
  label: {
    fontSize: 15,
    color: "#ccc",
    marginTop: 4,
    fontWeight: "500",
  },
  focusedLabel: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default styles;
