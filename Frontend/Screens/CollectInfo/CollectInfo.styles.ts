import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#F9F9F9",
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  pickerBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: "60%",
  },
  pickerList: {
    paddingBottom: 20,
  },
  pickerItem: {
    paddingVertical: 14,
    alignItems: "center",
  },
  pickerItemText: {
    fontSize: 18,
    color: "#808080",
    fontWeight: "400",
  },
  selectedItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
  },
  selectedItemText: {
    color: "#000000",
    fontWeight: "800",
    fontSize: 20,
  },
})
export default styles;