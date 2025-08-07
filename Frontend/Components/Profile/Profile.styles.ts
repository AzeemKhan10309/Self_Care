import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
    marginTop: 25,

    marginLeft: 25,
  },
  nameLocation: {
    justifyContent: "center",
  },
  greeting: {
    color: "#1F62E8",
    paddingTop: 25,
    fontSize: 24,
    fontWeight: "bold",
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  location: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#000000ff",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
});

export default styles;
