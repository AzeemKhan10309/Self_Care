import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '90%',
        marginHorizontal: '5%',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 16,
        shadowColor: '#000',
        marginBottom: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4, elevation: 5,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        color: '#2979FF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    weekdayText: {
        color: '#444',
        fontSize: 16,
    },
    message: {
        color: '#000',
        marginTop: 6,
        fontSize: 15,
    },
    iconWrapper: {
        backgroundColor: '#2979FF',
        padding: 10,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default styles;