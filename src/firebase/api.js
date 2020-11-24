import { useCallback } from 'react';
import { firebase } from './config';

export const addExpense = (data, callback) => {
    const { category, date, description, amount } = data;
    firebase.firestore().collection('expenses')
        .add({
            amount: amount,
            category: category,
            date: new Date(date),
            description: description
        })
        .then( () => {
            console.log("Data entered successfully");
            callback(true);
        }).catch( (e) => {
            console.log("Error", e)
            callback(false);
        });
};


export const getExpenses = async () => {
    let expenseList = [];

    let snapshot = await firebase.firestore()
        .collection('expenses')
        .orderBy('date')
        .get();

    if(snapshot) {
        snapshot.forEach((doc) => {
            const expense = doc.data();
            expense.id = doc.id;
            expenseList.push(expense);
        });
    }

    return expenseList;

}