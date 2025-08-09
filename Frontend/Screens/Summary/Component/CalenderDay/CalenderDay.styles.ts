import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  calendarDay: {
    width: '25%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  markedDay: {
    backgroundColor: '#1E5EFF',
    borderRadius: 15,
  },
    container: {
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 6,
  },
  active: {
    backgroundColor: '#4CAF50',
  },
});
export default styles;