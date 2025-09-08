import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  profile: { alignItems: "center", paddingVertical: 20 },

  section: { paddingHorizontal: 20, marginTop: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#2563eb" },
  aboutText: { fontSize: 14, color: "#444", marginTop: 6 },

  buttonRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  editButton: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 10,
  },
  editButtonText: {
    color: "#2563eb",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#fee2e2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: "#dc2626",
    fontWeight: "500",
  },



});
export default styles;


