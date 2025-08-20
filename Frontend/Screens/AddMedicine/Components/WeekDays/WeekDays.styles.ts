import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 9,
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
    marginHorizontal: 11,
     marginVertical: 5,
    fontSize: 20,
    color: "#1F62E8",
    borderWidth: 2,
    borderColor: "#1F62E8",
    fontWeight:"bold"
  },
});

export default styles;
