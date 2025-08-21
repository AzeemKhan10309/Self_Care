import { StyleSheet } from "react-native";

export default StyleSheet.create({
  rowContainer: {
    flexDirection: "row",      
    alignItems: "center",
    gap: 8,                    
  },
  dropdownButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  dropdownOverlay: {
    position: "absolute",
    top: 50,                   
    left: 0,
    width: 120,                
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    zIndex: 1000,
    elevation: 10,             
    shadowColor: "#000",       
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  inputField: {
    flex: 1,                   
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  unitText: {
    minWidth: 30,             
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
