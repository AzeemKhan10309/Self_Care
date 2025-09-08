import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  doctorCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5  },
  docImage: { width: 55, height: 71, borderRadius: 25, marginRight: 14 ,marginBottom:35 },
  docName: { fontWeight: "bold", fontSize: 16 },
  docSpecialty: { color: "gray", fontSize: 13 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  rating: { color: "gray", marginRight: 5 },
  time: { color: "gray", marginLeft: 5 },
  bookBtn: {
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: "#2F80ED",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf:"center",
    width:200,
    height:31
  },
  bookBtnText: { color: "#2F80ED", fontWeight: "bold", fontSize: 18 ,textAlign:"center" },
  heart:{
marginBottom:80  },
box:{
marginLeft:1
},
container:{
  flex:1,
  marginRight:3
}
});
export default styles;