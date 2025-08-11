import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  card: { backgroundColor: '#1a73e8', borderRadius: 16, padding: 16, alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  title: { color: '#fff', fontWeight: '600', marginRight: 246, fontSize: 16 },
  subtitle: { color: '#cce0ff', fontSize: 13, marginBottom: 16,marginRight: 156 },
  circle: { alignItems: 'center', marginBottom: 16 , justifyContent: 'center'},
  steps: { fontSize: 32, color: '#fff', fontWeight: '700' },
  stepsLabel: { fontSize: 14, color: '#cce0ff' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  infoItem: { alignItems: 'center' },
  infoValue: { fontSize: 18, color: '#fff', fontWeight: '700' },
  infoLabel: { fontSize: 12, color: '#cce0ff' },
  info: { fontSize: 20, color: '#fff', marginBottom: 4 },
});
export default styles;