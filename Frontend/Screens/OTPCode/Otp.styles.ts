import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 150,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
  },
  resendText: {
    marginTop: 250,
    textAlign: "center",
    color: "#666",
  },
  resendLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
});
