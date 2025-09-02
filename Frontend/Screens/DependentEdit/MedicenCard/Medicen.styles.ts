import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  details: {
    flexDirection: "row",
    marginTop: 6,
    gap: 16,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
  },
  buttons: {
    flexDirection: "row",
    gap: 1,
    marginLeft: 20,
  },
  updateButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 80,
    height: 35,
    marginLeft: 0.01,

  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    width: 80,
    height: 35,
  },
 
  actions: {
    flexDirection: "row",
    gap: 0,
    marginLeft: 5,
  },
  icon: {
    width:  26,
    height: 27,
  },
  deleteIcon: {
    width: 24,
    height: 27,
  }
 
});
export default styles;