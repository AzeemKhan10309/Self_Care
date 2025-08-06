
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        marginTop: 50,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#000',
        textAlign: 'center',

        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        color: '#8C8C8C',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loginLink: {
        alignSelf: 'center',
        marginTop: 20,
    },
    loginLabel: {
        color: '#666',
    },
    loginText: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});

export default styles;
