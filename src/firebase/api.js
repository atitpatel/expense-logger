import { firebase } from './config';

export const addExpense = (data) => {
    const { category, date, description } = data;
    firebase.firestore().collection('expenses')
        .add({
            category: category,
            date: date,
            description: description
        })
        .then( () => 
            console.log("Data entered successfully")
        ).catch( (e) => 
            console.log("Error", e)
        );
};