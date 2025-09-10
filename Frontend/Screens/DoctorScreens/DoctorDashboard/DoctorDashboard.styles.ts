import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },

  // ===== Header =====
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 16 
  },
  profileImage: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: 12 
  },
  welcomeText: { 
    fontSize: 12, 
    color: "gray" 
  },
  doctorName: { 
    fontSize: 16, 
    fontWeight: "bold" 
  },

  // ===== Section Titles =====
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginHorizontal: 16, 
    marginTop: 16,
    marginBottom: 8
  },

  // ===== Upcoming Appointment Card (Image jaisa) =====
  upcomingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E6CF6",
    borderRadius: 16,
    padding: 10,
    marginHorizontal: 20,
    marginRight: 0,
    marginVertical: 8,
    width: 250,
    height: 140,
  },
  upcomingAvatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  upcomingName: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  upcomingSpecialty: {
    color: "#d0d8ff",
    fontSize: 13,
    marginTop: 2,
  },
  upcomingRating: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
  upcomingDate: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
  },

  // ===== Pending Requests Header =====
  requestsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 0,
  },
  seeAll: { 
    fontSize: 16, 
    color: "#2E6CF6", 
    fontWeight: "600"
  },

  // ===== Pending Request Card (Updated as per Image) =====
  requestCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  requestRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  requestLeft: { flexDirection: "row", alignItems: "center" },
  requestAvatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 12 
  },
  requestName: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#222" 
  },
  requestSpecialty: { 
    fontSize: 14, 
    color: "gray", 
    marginTop: 2 
  },
  heartIcon: { 
    color: "#2E6CF6", 
    fontSize: 20 
  },

  // Date & Time Row
  dateTimeRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: 8 
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F8",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  timeBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F8",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dateText: { 
    fontSize: 13, 
    fontWeight: "500", 
    color: "#333", 
    marginLeft: 6 
  },
  timeText: { 
    fontSize: 13, 
    fontWeight: "500", 
    color: "#333", 
    marginLeft: 6 
  },

  // ===== Buttons (Accept/Reject) =====
  actionsRow: { 
    flexDirection: "row", 
    justifyContent: "space-between",
    marginTop: 14,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: "#2E6CF6",
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: "center",
    marginRight: 8,
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: "#E5ECFF",
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: "center",
    marginLeft: 8,
  },
  acceptText: { 
    color: "#fff", 
    fontSize: 14, 
    fontWeight: "600" 
  },
  rejectText: { 
    color: "#2E6CF6", 
    fontSize: 14, 
    fontWeight: "600" 
  },

  // ===== Common Row =====
  row: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: 4 
  },

  // ===== Bottom Navbar =====
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});
export default styles