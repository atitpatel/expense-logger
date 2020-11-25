import React, {useState} from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Modal,
    TouchableHighlight, ActivityIndicator, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import { addExpense } from '../../firebase/api';
import { imagePickerOptions } from '../../utils';
import { amountError, descriptionError, categoryError,dateError }  from '../../constants';
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
                <Text style={styles.errorText}>{props.errorMessage}</Text>
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
    const [imageResponse, setImageResponse ] = useState(null);
    const [errors, setErrors ] = useState({});

    const clearAllFields = () => {
        setDate(new Date);
        setCategory('');
        setDescription('');
        setAmount('');
        setImageResponse(null);
    }

    const checkValidations = () => {
        const errs = {};
        if(!category) {
            errs.category = true;
            setErrors(errs);
        }
        if(!amount) {
            errs.amount = true;
            setErrors(errs);
        }
        if(!description) {
            errs.description = true;
            setErrors(errs)
        }
        return errs;
    }

    const onSubmit = () => {
        setIsLoading(true);
        setErrors({});
        const errs = checkValidations();
        if(!Object.keys(errs).length) {
            try {
                addExpense({
                    category: category,
                    description: description,
                    date: date,
                    amount: amount,
                    image: imageResponse
                }, (result) => {
                    if(result) {
                        Alert.alert('Expense Added Successfully');
                    } else {
                        Alert.alert(`There's something wrong. Couldn't add data`);
                    }
                    setIsLoading(false);
                    clearAllFields();
                });
            } catch(e) {
                // Error logging and reporting
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
        
    }
    
    const onCancel = () => {
        clearAllFields();
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
                            imagePickerOptions,
                            (response) => {
                                if (response.didCancel) {
                                    console.log('User cancelled image picker');
                                  } else if (response.error) {
                                    console.log('ImagePicker Error: ', response.error);
                                  } else {
                                    setImageResponse(response);
                                  }  
                                setShowModal(false);
                            },
                          )
                        }
                    >
                        <Text style={styles.textStyle}>From Library</Text>
                    </TouchableHighlight>
                    <View style = {{ marginTop: 30, alignItems: 'flex-end' }}>
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
                    errorMessage = {errors.amount ? amountError : null}
                />
                <ExpenseTextInput
                    title = "Description"
                    multiline
                    numberOfLines={4}
                    maxLength={250}
                    value={description}
                    onChangeText={text => onValueChange('description', text)}
                    style={styles.description}
                    errorMessage = {errors.description ? descriptionError : null}
                />
                <ExpenseTextInput
                    title = "Category"
                    placeholder= "e.g. Food, Travel"
                    value={category}
                    onChangeText={text => onValueChange('category', text)}
                    errorMessage = {errors.category ? categoryError : null}
                />
                <ExpenseDate
                    onDateChange={(key, value) => onValueChange(key, value)}
                    value={date}
                    errorMessage = {errors.date ? dateError : null}
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
            {
                isLoading ? <View style = {styles.loaderContainer}>
                    <ActivityIndicator size="small" color="#0000ff" />  
            </View> : null }
        </View>
    )
}