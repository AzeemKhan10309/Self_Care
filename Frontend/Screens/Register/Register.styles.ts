import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 24,
    paddingTop: 150,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
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
    marginBottom: 30,
    marginTop: 40,
  },
  signUpText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 40,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D9D9D9",
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: "#333",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 40,
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  loginText: {
    fontSize: 14,
    color: "#000",
  },
  loginLink: {
    fontSize: 14,
    color: "#0B5FFF",
    fontWeight: "600",
  },
<<<<<<< Updated upstream
=======

  // 👇 New styles for username validation
  successText: {
    color: "green",
    fontSize: 14,
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
  suggestionText: {
    color: "#0B5FFF",
    fontSize: 14,
    marginVertical: 4,
  },
  suggestionContainer: {
    marginBottom: 12,
  },

scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
  usernameAvailable: {
    color: "green",
    fontSize: 14,
    marginVertical: 5,
  },
  usernameTaken: {
    color: "red",
    fontSize: 14,
    marginVertical: 5,
  },

  suggestionTag: {
    backgroundColor: "#eee",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 4,
  },
 

>>>>>>> Stashed changes
});

export default styles;
