import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Modal,
    TouchableHighlight, 
    Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import { addExpense } from '../../firebase/api';
import styles from './styles';



const ExpenseTextInput = (props) => {
    return(
        <View style={styles.inputContainer}>
                <Text style={styles.titleText}>{props.title}</Text>
                <TextInput 
                    {...props}
                    editable
                    fontSize={15}
                    style={[styles.input, props.style]}
                />
            </View>
    )
}

const ExpenseDate = (props) => {
    const [showDate, setShow] = useState(true);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        props.onDateChange('date', currentDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);

      };
    
    return (
        <View style={styles.inputContainer}>
                <Text style={styles.titleText}>Date</Text>
                <View style={styles.dateTime}>
                    <DateTimePicker
                        {...props}
                        testID="dateTimePicker"
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        style={{ text: 'center'}}
                    />
                </View>
            </View>
    )
}

const ExpenseImage = (props) => {
    return(
        <View style={styles.inputContainer}>
            <TouchableOpacity
                style = {styles.attachButton}
                onPress = {props.onPress}
            >
                <Text style = {styles.attachText}>Attach Receipt 📎</Text>
            </TouchableOpacity>
        </View>
    )
}

export const ExpenseLogger = () => {

    const [date, setDate] = useState(new Date());
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState();
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = React.useState(null);

    const clearAllFields = () => {
        setDate(new Date);
        setCategory('');
        setDescription('');
        setAmount('');
    }

    const onSubmit = () => {
        setIsLoading(true);
        // const errors = checkValidations();
        addExpense({
            category: category,
            description: description,
            date: date,
            amout: amount
        }, (result) => {
            if(result) {
                Alert.alert('Expense Added Successfully');
            } else {
                Alert.alert(`There's something wrong. Couldn't add data`);
            }
            setIsLoading(false);
            clearAllFields();
        });
    }
    
    const onCancel = () => {
        console.log("Cancelling");
    }

    const onValueChange = (key, value) => {
        switch(key){
            case 'date' :
                setDate(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'amount':
                setAmount(value);
                break;
            default:
                setDescription(value);
                break;
        }
    }

    const renderModal = () => {
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => ImagePicker.launchCamera(
                            {
                              mediaType: 'photo',
                              includeBase64: false,
                              maxHeight: 200,
                              maxWidth: 200,
                            },
                            (response) => {
                              setResponse(response);
                              setShowModal(false);
                            },
                          )}
                    >
                        <Text style={styles.textStyle}>Using Camera</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => ImagePicker.launchImageLibrary(
                            {
                              mediaType: 'photo',
                              includeBase64: false,
                              maxHeight: 200,
                              maxWidth: 200,
                            },
                            (response) => {
                              setResponse(response);
                              setShowModal(false);
                            },
                          )
                        }
                    >
                        <Text style={styles.textStyle}>From Library</Text>
                    </TouchableHighlight>
                    <View style = {{ marginTop: 30 }}>
                        <Button 
                            title = "Cancel"
                            onPress={() => setShowModal(!showModal)}
                        />
                    </View>
                </View>
                </View>
            </Modal>
        );
    }

    const renderForm = () => {
        return(
            <View style={styles.formContainer}>
                <ExpenseTextInput
                    title = "Amount"
                    placeholder = "e.g. 123.45"
                    onChangeText={text => onValueChange('amount', text)}
                    keyboardType = {'decimal-pad'}
                    value={amount}
                />
                <ExpenseTextInput
                    title = "Description"
                    multiline
                    numberOfLines={4}
                    maxLength={250}
                    value={description}
                    onChangeText={text => onValueChange('description', text)}
                    style={styles.description}
                />
                <ExpenseTextInput
                    title = "Category"
                    placeholder= "e.g. Food, Travel"
                    value={category}
                    onChangeText={text => onValueChange('category', text)}
                />
                <ExpenseDate
                    onDateChange={(key, value) => onValueChange(key, value)}
                    value={date}
                />
                <ExpenseImage 
                    onPress = {() => setShowModal(!showModal)}
                />

                <View style={styles.buttonArea}>
                    <Button 
                        onPress={onSubmit}
                        title='Submit'
                        disabled = {isLoading}
                    />
                    <Button 
                        onPress={onCancel}
                        title='Cancel'
                    />
                </View>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            {renderModal()}
            <Text style={styles.header}> Expense Logger</Text>
            {renderForm()}
        </View>
    )
}