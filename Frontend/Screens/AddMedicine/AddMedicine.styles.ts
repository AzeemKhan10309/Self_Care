import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 23,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 16,
  },
  section: {
    marginBottom: 0,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",

  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
   
  dosageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  unitInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#1F62E8",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  smallButton: {
    backgroundColor: "#1F62E8",
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
    alignSelf: "flex-start",
    marginVertical: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
   pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  rowDatesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: -25,

  },
  rowDate: {
    flex: 1,
    marginHorizontal: 5,
  },
  Timesection:{
marginTop:35
  },
  Text:{
    fontSize:25,
    marginLeft:10,
    color:"#1E60FF",
    fontWeight:"700"
  },
  buttonTime:{
    borderRadius: 12,
    alignItems: "center",
    alignSelf: "flex-start",
    marginVertical: 4,
  },

});

export default styles;
