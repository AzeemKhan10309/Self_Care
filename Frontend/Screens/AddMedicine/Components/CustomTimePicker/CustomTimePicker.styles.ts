import { StyleSheet , Platform} from "react-native";
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    width: 360, 
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  picker: {
    width: 90,
    height: Platform.OS === "ios" ? 150 : 50,
  },
  pickerItem: {
    color: "#000",
    fontSize: 18,
  },
  colon: {
    fontSize: 24,
    marginHorizontal: 5,
    fontWeight: "600",
  },
  ampmContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  ampmButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginVertical: 4,
    borderWidth: 0,
    borderRadius: 6,
    alignItems: "center",
  },
  ampmSelected: {
    backgroundColor: "#e7e7e7ff",
  },
  ampmText: {
    fontWeight: "600",
    color: "#0c0808ff",
    fontSize: 16,
  },
  ampmTextSelected: {
    color: "#18101bff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    width: "100%",
    paddingHorizontal: 20,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  cancelText: {
    color: "#050101ff",
    fontWeight: "bold",
    fontSize: 16,
  },
  okText: {
    color: "#050101ff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default styles;
