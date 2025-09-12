import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /** Header */
  header: {
    backgroundColor: "#287BFF",
    height: 260,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
  },
  doctorImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "#fff",
  },
  editIcon: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#287BFF",
    borderRadius: 20,
    padding: 8,
  },

  /** Info Card */
  infoCard: {
    padding: 20,
    marginTop: -40,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 4,
  },
  specialization: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  locationText: {
    fontSize: 13,
    color: "#888",
    marginLeft: 5,
  },

  /** Stats Row */
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  statsItem: {
    alignItems: "center",
  },
  statsValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  statsLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },

  /** About */
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 10,
  },
  aboutText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
  viewMore: {
    color: "#287BFF",
    fontWeight: "600",
  },

  /** Days */
  daysRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  dayChip: {
    backgroundColor: "#F1F1F1",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
    marginBottom: 10,
  },
  dayText: {
    fontSize: 13,
    color: "#000",
  },

  /** Clinic Times */
  timeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  timeChipActive: {
    backgroundColor: "#287BFF",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  timeTextActive: {
    color: "#fff",
    fontSize: 13,
  },
  timeChip: {
    borderColor: "#287BFF",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  timeText: {
    color: "#287BFF",
    fontSize: 13,
  },

  /** Review Section */
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  seeAll: {
    color: "#287BFF",
    fontWeight: "600",
    fontSize: 14,
  },
  reviewCard: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#F9F9F9",
    borderRadius: 15,
    marginBottom: 20,
  },
  reviewerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  reviewContent: {
    flex: 1,
  },
  reviewerName: {
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  reviewRating: {
    marginLeft: 6,
    fontSize: 12,
    color: "#555",
  },
  reviewText: {
    fontSize: 12,
    color: "#555",
    lineHeight: 16,
  },
});
