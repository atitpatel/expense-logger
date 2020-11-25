import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
        marginTop: 20
    },
    loaderContainer: {
        position: 'absolute',
        left: '50%',
        top: '50%'
    },
    formContainer: {
        paddingTop: 20,
        width: '100%'
    },
    titleText: {
        fontWeight: "300",
        color: 'black',
        fontSize: 16,
        alignSelf: 'center'
    },
    dateTime: {
        width: '70%',
        alignSelf: 'center'
    },
    input: {
        flex: 1,
        marginTop: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        width: '70%',
        height: 45,
        paddingLeft: 15,
        alignSelf: 'center'
    },
    errorText: {
        fontWeight: "400",
        alignSelf: 'center',
        fontSize: 12,
        color: 'red'
    },
    inputContainer: {
        flex: 1,
        marginTop: 20
    },
    buttonArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        width: '30%',
        height: 50
    },
    description: {
        height: 125,
        flex: 1
    },
    attachButton: {
        justifyContent: 'center',
        width: '70%',
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'rgb(221,221,223)',
        alignSelf: 'center'
    },
    attachText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '300'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 15,
        elevation: 2,
        marginTop: 15
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});

export default styles;