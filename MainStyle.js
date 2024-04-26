import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        //borderColor : 'red',
        //borderWidth : 2
    },
    displayContainer: {
        flex: 0.6,
        //justifyContent: 'flex-end',
        //alignItems: 'flex-end',
        padding: 10,
        // borderColor : 'red',
        // borderWidth : 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // gap: 10,
    },
    c: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    displayText: {
        fontSize: 48,
        color: '#333',
    },

    displayDate: {
        fontSize: 28,
        color: '#333',
        //borderColor : 'red',
        // borderWidth : 2,
    },
    buttonContainer: {
        flex: 3,
        width: '80%',
        //borderColor : 'red',
        //borderWidth : 2,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        //borderColor : 'blue',
        //borderWidth : 2,
    },
    button: {
        flex: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 3,
        margin: 1,
        padding: 2,
        maxHeight: 100,
    },
    buttonCategory:
    {
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginBottom: 10,
        elevation: 3,
        width: '100%',
    },
    buttonText: {
        fontSize: 34,
        color: '#333',
    },
    zeroButton: {
        flex: 2,
        paddingLeft: 35,
        paddingRight: 35,
    },
    zeroButtonText: {
        marginLeft: 10,
    },
    operatorButton: {
        backgroundColor: '#f0f0f0',
    },
    operatorButtonText: {
        color: '#ff9500',
    },
    equalButton: {
        flex: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff9500',
        elevation: 3,
    },
    equalButtonText: {
        fontSize: 32,
        color: '#fff',
    },
    image: {
        width: 35, // Adjust width as needed
        height: 35, // Adjust height as needed
        resizeMode: 'contain', // Adjust resize mode as needed
        marginBottom: 5, // Adjust margin as needed
    },
    clearButton: {
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        // margin: 10,
        elevation: 3,
        padding: 10,
        marginBottom: 10
        //borderColor : 'red',
        //borderWidth : 2,
    },
    clearButtonText: {
        fontSize: 24,
        color: '#333',
    },
});
