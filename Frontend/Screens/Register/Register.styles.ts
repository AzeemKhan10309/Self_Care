import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F9F9F9",

  },
  container: {
    flex: 1,
    padding: 16,
    marginTop:200

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  signUpButton: {
    backgroundColor: "#0B5FFF",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  signUpText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // ✅ Suggestions styles
  suggestions: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  suggestionText: {
    color: "gray",
    width: "100%",
    marginBottom: 4,
  },
  suggestionButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  suggestionButtonText: {
    color: "#007bff",
  },

  // ✅ Username message colors
  usernameMessageSuccess: {
    color: "green",
    marginTop: 4,
    marginBottom: 4,
  },
  usernameMessageError: {
    color: "red",
    marginTop: 4,
    marginBottom: 4,
  },
});

export default styles;
