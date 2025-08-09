import {StyleSheet} from 'react-native';
import Summary from './Component/Summary';
const styles = StyleSheet.create({
  dateTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

doseList: {
  marginTop: 16,
},
summary: {
    marginTop: 20,
  fontSize: 24,
 fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
}
,
    TodaysDose: {
        fontSize: 27,
        fontWeight: 'bold',
        color: "#1E5EFF",
        marginTop: 0,
        marginBottom: 10,
        marginLeft: 24,
    },
 
    line:{
 backgroundColor: '#fff',
  padding: 0.10,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc'
    }
});
export default styles;