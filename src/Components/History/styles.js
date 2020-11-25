import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({  
    mainContainer: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 16,
        alignItems: 'center',
        marginBottom: 150
    },
    item: {
        padding: 20,
        marginVertical: 8,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemDescription: {
        flex: 0.6,
        fontSize: 15,
        textAlign: 'left',
        flexShrink: 1,
        paddingLeft: 20
    },
    itemCategory: {
        flex: 0.25,
        fontSize: 15,
        textAlign: 'right'
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        flex: 1
    },
    header: {
        fontSize: 20,
        flex: 1,
        textAlign: 'left',
        fontWeight: '400'
    },
    headerSum: {
        fontSize: 20,
        flex: 1,
        textAlign: 'right',
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
        marginTop: 10,
        marginBottom: 20
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
    clearFilterRow: {
        height: 40,
        justifyContent: 'flex-end',
        width: '100%'
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