import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  appointmentCard: {
    backgroundColor: "#2F80ED",
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    width: 160,
  },
  appointmentImage: { width: 50, height: 50, borderRadius: 25 },
  doctorName: { color: "white", fontWeight: "bold", marginTop: 5 },
  specialty: { color: "white", fontSize: 12 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  rating: { color: "white", marginRight: 5 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
  cardText: { color: "white", fontSize: 12, marginHorizontal: 5 },
});
export default styles;