import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
    marginTop: 70,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    marginLeft: 160,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  updateBtn: {
    marginTop: 20,
  },
});


export const phoneStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#3B82F6",
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  flag: {
    width: 24,
    height: 16,
    resizeMode: "contain",
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#E0E0E0",
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});

export default styles;
