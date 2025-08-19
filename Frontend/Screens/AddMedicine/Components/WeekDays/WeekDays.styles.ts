// WeekDays.styles.ts
import { StyleSheet } from "react-native";
import BottomTab from "../../../../Components/BottomNavbar/BottomNavbar";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 13,
    textAlign: "center",
    color: "#030303ff",
  },
  daysRow: {
    flexDirection: "row",
  },
  day: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",  
     lineHeight: 35,
    marginHorizontal: 10.5,
     marginVertical: 10.5,
    fontSize: 20,
    color: "#2563eb",
    borderWidth: 2,
    borderColor: "#2563eb",
    fontWeight:"bold"
  },
});

export default styles;
