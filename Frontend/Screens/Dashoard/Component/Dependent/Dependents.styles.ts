import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    padding: 4,
    marginTop: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 1,
  },
  card: {
    alignItems: "center",
    marginRight: 16,
    width: 100,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40, // circular
    borderWidth: 2,
    borderColor: "#ddd",
  },
  name: {
    marginTop: 1,
    fontSize: 12,
    textAlign: "center",
  },
  addCard: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  plus: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#888",
  },
});

export default styles;
