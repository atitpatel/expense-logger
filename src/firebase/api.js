import { useCallback } from 'react';
import { firebase, storageRef } from './config';
import { getFileLocalPath, getFileName } from '../utils';

const uploadImage = async response => {
    const fileSource = getFileLocalPath(response);
    const fileName = getFileName(response.fileName, fileSource);
    try{
        const response = await storageRef.ref(fileName).putFile(fileSource);
        const url = await storageRef.ref(`/${fileName}`).getDownloadURL();
        return Promise.resolve(url);
    } catch(e) {
        // Error logging
        console.log("errror,,,,", e);
        return Promise.resolve(null);
    }
}

export const addExpense = (data, callback) => {
    const { category, date, description, amount, image } = data;
    console.log("Image.....", image);
    uploadImage(image).then((downloadUrl) => {
        if(downloadUrl) {
            firebase.firestore().collection('expenses')
                .add({
                    amount: amount,
                    category: category,
                    date: new Date(date),
                    description: description,
                    image: downloadUrl
                })
                .then( () => {
                    console.log("Data entered successfully");
                    callback(true);
                }).catch( (e) => {
                    console.log("Error", e)
                    callback(false);
                });
        } else {
            callback(false);
        }
    }).catch(e => {
        callback(false)
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