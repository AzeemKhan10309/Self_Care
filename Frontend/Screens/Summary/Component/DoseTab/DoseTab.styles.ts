import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    dateTab: {
        alignItems: 'center',  borderRadius: 15, shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4, elevation: 5,
        marginTop: 10,  justifyContent: 'center',
        height: 60, width: 60, marginHorizontal: 5,
    },
    inactiveTab: { backgroundColor: '#ffffff', borderRadius: 10, },
    activeTab: { backgroundColor: '#1E5EFF', borderRadius: 10,height: 80, width: 80, justifyContent: 'center', alignItems: 'center' },
    dateNumber: { color: '#000', fontSize: 19, fontWeight: 700 },
    dayText: { color: '#000', fontSize: 12, fontWeight: '500' },
    activeText: { color: '#fff', fontSize: 22, fontWeight: 800 },
});
export default styles;