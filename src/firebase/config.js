import * as firebase from 'firebase';
import '@firebase/storage';
import '@firebase/firestore';
import storage from '@react-native-firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC4KVlBsdY5-r-Fddu8zI2_8ghrMC_aHjI",
    authDomain: "expense-tracker-c071f.firebaseapp.com",
    databaseURL: "https://expense-tracker-c071f.firebaseio.com",
    projectId: "expense-tracker-c071f",
    storageBucket: "expense-tracker-c071f.appspot.com",
    messagingSenderId: "1006201176529",
    appId: "1:1006201176529:web:690fb05eb0dbe2528d60f0"
};

let storageRef = storage();

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase, storageRef };