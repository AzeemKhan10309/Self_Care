import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 12, padding: 10, marginTop: 10 },
  image: { width: 40, height: 40, marginRight: 10 },
  name: { fontWeight: '600', fontSize: 14 },
  details: { fontSize: 12, color: '#666' },
  playButton: { backgroundColor: '#1a73e8', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});
export default styles;