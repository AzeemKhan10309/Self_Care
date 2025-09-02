import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
    textAlign: "center",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007AFF",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    maxWidth: 200,
    textAlign: "center",
  },
  info: {
    marginTop: 4,
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    maxWidth: 220,
  },
  label: {
    color: "#007AFF",
    fontWeight: "600",
  },
});

export default styles;