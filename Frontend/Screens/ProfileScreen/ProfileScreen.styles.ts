import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  helloText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  editProfileBtn: {
    backgroundColor: "#d1d9ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  editProfileText: {
    fontSize: 12,
    color: "#3A5BDE",
  },
  percentageCircle: {
    marginLeft: "auto",
    borderWidth: 2,
    borderColor: "#3A5BDE",
    borderRadius: 999,
    padding: 10,
  },
  percentageText: {
    color: "#3A5BDE",
    fontWeight: "bold",
  },
  descriptionBox: {
    borderWidth: 1,
    borderColor: "#3A5BDE",
    borderRadius: 10,
    padding: 10,
    position: "relative",
    marginBottom: 20,
  },
  descriptionText: {
    color: "#888",
    fontSize: 14,
  },
  penIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 18,
    color: "#3A5BDE",
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metricCard: {
    backgroundColor: "#3A5BDE",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  metricLabel: {
    color: "white",
    fontSize: 14,
    marginBottom: 5,
  },
  metricValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  profileSection: {
    marginBottom: 20,
  },
});
export default styles;
