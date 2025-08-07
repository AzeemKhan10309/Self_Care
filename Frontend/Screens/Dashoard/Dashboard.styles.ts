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
