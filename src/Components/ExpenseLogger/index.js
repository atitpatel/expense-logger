import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addExpense } from '../../firebase/api';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
        marginTop: 20
    },
    formContainer: {
        flex: 1,
        paddingTop: 20
    },
    titleText: {
        fontWeight: "200",
        color: 'orange',
        fontSize: 14,
    },
    input: {
        marginTop: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        width: 200,
        height: 45,
        padding: 15,
        paddingTop: 15
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
        width: 200
    }
})

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
        console.log("kajsdfjasdf", selectedDate);
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
                    <DateTimePicker
                        {...props}
                        testID="dateTimePicker"
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
            </View>
    )
}

export const ExpenseLogger = () => {

    const [date, setDate] = useState(new Date());
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const onSubmit = () => {
        console.log("Submitting", date, category, description);
        addExpense({
            category: category,
            description: description,
            date: date
        });

        // firebase.firestore().collection('expenses').add({
        //     category: category,
        //     description: description,
        //     date: date
        // }).then(() => {
        //     console.log('Data entered successfully');
        // }).catch(() => {
        //     console.log('Error in data');
        // })
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
            default:
                setDescription(value);
                break;
        }
    }

    const renderForm = () => {
        return(
            <View style={styles.formContainer}>
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
                <View style={styles.buttonArea}>
                    <Button 
                        style={styles.button}
                        onPress={onSubmit}
                        title='Submit'
                    />
                    <Button 
                        style={styles.button}
                        onPress={onCancel}
                        title='Cancel'
                    />
                </View>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <Text style={styles.header}> Expense Logger</Text>
            {renderForm()}
        </View>
    )
}