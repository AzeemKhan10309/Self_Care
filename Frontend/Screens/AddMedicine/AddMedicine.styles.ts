
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F6F6F6" },
  title: { fontSize: 18, fontWeight: "600", textAlign: "center", marginVertical: 15 },
  day: { fontSize: 16, padding: 8, borderRadius: 20, textAlign: "center" },
  doseContainer: { flexDirection: "row", alignItems: "center",justifyContent: "center", marginVertical: 20 },
  doseButton: { backgroundColor: "#ffffffff", fontSize: 10, textAlign: "center",
    justifyContent: "center",
    alignItems: "center",  
     lineHeight: 28, gap: 50, height:30, width:30,  borderRadius: 15,flexDirection: "row",
   marginHorizontal: 130,     },
  doseButtonText: { fontSize: 18, fontWeight: "bold" },
  doseValue: { fontSize: 18, fontWeight: "600", marginHorizontal: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "500" },
  subLabel: { fontSize: 14, color: "gray" },
  button: { backgroundColor: "#2563eb", padding: 15, borderRadius: 30, marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 18, textAlign: "center", fontWeight: "600" },
    text: {
    fontSize: 18,
    marginBottom: 20,
  },
  timepicker:{
    marginLeft:40
  }
});

export default styles