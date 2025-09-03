import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  loader: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  medicinesContainer: {
    marginTop: 24,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    borderRadius: 30,
    padding: 12,
    elevation: 5,
  },
  addButtonImage: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
});

export default styles;
    