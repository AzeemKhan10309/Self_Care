import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#e1e1e1',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  feeling: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
  },
  upcomingDoseContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
  },
  upcomingDose: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    color: '#1F62E8',
  },
  doseCard: {
    backgroundColor: '#1F62E8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  doseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    paddingLeft: 100,
  },
  doseDetails: {
    fontSize: 14,
    color: '#ffffff',
    paddingLeft: 100,
  },
  doseDate: {
    fontSize: 14,
    color: '#ffffff',
    paddingLeft: 100,
  },
  doseTime: {
    fontSize: 14,
    color: '#ffffff',
  },
  bottomRow: {
    marginTop: -10,
    alignItems: 'flex-end',
    position: 'absolute',
    right: 20,
    bottom: 23,
  },
  timeBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 60,
  },
  timeText: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    height: 60,
    width: 60,
    position: 'absolute',
    left: 30,
    top: 23,
  },
  addButton: {
    backgroundColor: '#2f21f0ff',
    paddingVertical: 4,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    fontSize: 20,
    color: '#ffffff',
  },
  todayReminderContainer: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
  reminderTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1F62E8',
  },
  addButtonContainer: {
    position: 'absolute',
    marginTop: 650,
    left: 340,
    zIndex: 0,
  },
  addicon: {
    width: 80,
    height: 80,
  },
});

export default styles;
