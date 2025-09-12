import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 8,
  },
  docName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  phoneInput: {
    flex: 1,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginVertical: 8,
    color: "#000",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dayActive: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  dayText: {
    color: "#333",
    fontSize: 14,
  },
  dayTextActive: {
    color: "#fff",
  },
  timeBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 20,
  },
  timeText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#333",
  },
  updateBtn: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 20,
  },
  updateBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
