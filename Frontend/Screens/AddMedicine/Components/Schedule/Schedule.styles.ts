import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },

  rowContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10, 
    marginVertical: 10,
    marginTop: 0,
  },

  dateContainer: {
    flex: 1,
    marginBottom: 15
  },

  dateLabel: {
    marginBottom: 5,
    fontWeight: "500",
    marginLeft: 15,
  },

  addButton: {
    padding: 8,
    backgroundColor: "#1F62E8",
    height: 40,
    width: 90,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "500",
  },

  timesContainer: {
    marginTop: 10,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  timeText: {
    flex: 1,
    fontSize: 16,
  },

  editButton: {
    padding: 5,
    backgroundColor: "blue",
    borderRadius: 5,
    marginRight: 5,
  },

  removeButton: {
    padding: 5,
    backgroundColor: "red",
    borderRadius: 5,
  },
});

export default styles;
