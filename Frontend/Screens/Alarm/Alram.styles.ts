
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E5BFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  medicineName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  medicineDose: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
  },
  dayText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 2,
    marginBottom: 20,
  },
  pillImage: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  timeText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  instruction: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default styles;