import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({  
    mainContainer: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 16,
        alignItems: 'center'
    },
    item: {
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 25,
        flex: 1,
        textAlign: 'left',
        fontWeight: '400'
    },
    textInputStyle: {
        height: 45,
        width: '80%',
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },
    sectionContainer: {
        width: '90%',
        marginTop: 10
    },
    mainTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
        marginTop: 20
    },
    searchContainer: {
        flexDirection: 'row',
        marginHorizontal: 15       
    },
    filterContainer: {
        width: '20%',
        backgroundColor: '#ccc',
        justifyContent: 'center',
        height: 45,
        margin: 5
    },
    filterText: {
        textAlign: 'center',
        fontSize: 22
    },
    loaderContainer: {
        alignItems: 'center',
        flex: 1
    }
});

export default styles;