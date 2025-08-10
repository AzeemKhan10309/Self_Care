import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    },

    fixedContent: {
  flex: 1,
  padding: 10,
  justifyContent: "flex-start",
},
  scrollContent: {
    padding: 10,
    paddingBottom: 90,
  },

  editProfileBtn: {
    backgroundColor: "#d1d9ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 4,
    alignSelf: "flex-start",
    marginLeft: 8,
  },
  editProfileText: {
    fontSize: 12,
    color: "#0B5FFF",
  },

  descriptionBox: {
    borderWidth: 2,
    borderColor: "#0B5FFF",
    borderRadius: 10,
    padding: 10,
    position: "relative",
    marginBottom: 20,
    width: "96%",
    height:"25%",
    alignSelf: "center",
  },
  descriptionText: {
    color: "#888",
    fontSize: 15,
    
  },
  penIcon: {
    position: "absolute",
    bottom: 5,
    right: 10,
    fontSize: 30,
    color: "#0B5FFF",
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metricCard: {
    backgroundColor: "#0B5FFF",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  metricLabel: {
    color: "white",
    fontSize: 14,
    marginBottom: 5,
  },
  metricValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  profileSection: {
    marginBottom: 20,
  },

  
});
export default styles;


