import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  doseRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 13,
    marginLeft: 30,
  },
  timeText: {
    width: 50,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2979FF',
    marginRight: 1,
  },
  statusIcon: {
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    padding: 6,
    marginRight: 12,
  },
  doseInfo: {
    flex: 1,
  },
  medicineText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pillText: {
    fontWeight: 'normal',
    color: '#666',
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  quantityText: {
    color: '#000',
    fontSize: 14,
  },
});

export default styles;