import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  dateTabs: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  doseList: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  summary: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  TodaysDose: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#1E5EFF",
    marginTop: 16,
    marginBottom: 10,
    marginLeft: 24,
  },
  line: {
    backgroundColor: '#fff',
    padding: 6,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  }
});

export default styles;
