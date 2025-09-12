import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // ===== Header =====
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 12,
    color: "gray",
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  // ===== Section Title =====
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },

  // ===== Upcoming Cards =====
  upcomingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E6CF6",
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    width: 280,
  },
  upcomingAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  upcomingName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  upcomingIssue: {
    color: "#d0d8ff",
    fontSize: 13,
    marginVertical: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  upcomingInfo: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 4,
  },
  completeBtn: {
    marginTop: 10,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  completeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },

  // ===== Tabs =====
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  activeTab: {
    backgroundColor: "#0a66ff",
  },
  tabText: {
    fontSize: 14,
    color: "#333",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // ===== Pending/Favourite Cards =====
  requestCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
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
    marginRight: 12,
  },
  requestName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  requestIssue: {
    fontSize: 14,
    color: "gray",
    marginTop: 2,
  },

  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
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
    marginLeft: 6,
  },
  timeText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    marginLeft: 6,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: "#2E6CF6",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  acceptText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: "#F2F4F8",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  rejectText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 14,
  },

  // ===== Completed Cards =====
  completedCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  completedLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  completedName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  completedIssue: {
    fontSize: 14,
    color: "gray",
    marginVertical: 2,
  },
  completedDateTimeRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  completedDateBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF2FF",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  completedTimeBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF2FF",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  completedDateText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#0a66ff",
    marginLeft: 4,
  },
  completedTimeText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#0a66ff",
    marginLeft: 4,
  },

  // ===== Favourite Popup =====
  favPopupOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  favPopupContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "85%",
  },
  favPopupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  favPopupCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  favPopupAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  favPopupName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  favPopupIssue: {
    fontSize: 14,
    color: "gray",
  },
  favPopupDateTime: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  favPopupDate: {
    fontSize: 12,
    color: "#555",
    marginLeft: 4,
  },
  favPopupTime: {
    fontSize: 12,
    color: "#555",
    marginLeft: 4,
  },
  favPopupActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  favCancelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    marginRight: 10,
  },
  favCancelText: {
    color: "#333",
    fontWeight: "600",
  },
  favRemoveBtn: {
    flex: 1,
    backgroundColor: "#2E6CF6",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  favRemoveText: {
    color: "#fff",
    fontWeight: "600",
  },

  // ===== Search Overlay =====
  overlayContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  topSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  overlayInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },

  // ===== Bottom Navigation =====
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: "gray",
  },
});

export default styles;
