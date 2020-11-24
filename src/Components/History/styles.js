import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
    },  
    container: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 16
      },
      item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
      },
    header: {
        fontSize: 25,
        flex: 1,
        textAlign: 'left'
    },
    textInputStyle: {
        height: 45,
        width: '90%',
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },
    sectionContainer: {
        width: '80%'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
        marginTop: 20
    }
});

export default styles;