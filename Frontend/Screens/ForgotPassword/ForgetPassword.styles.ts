import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: "#F9F9F9",
  },
  innerContainer: {
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",

    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#8C8C8C",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 20,
    paddingHorizontal: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loginLink: {
    alignSelf: "center",
    marginTop: 260,
  },
  loginLabel: {
    color: "#666",
  },
  loginText: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default styles;
