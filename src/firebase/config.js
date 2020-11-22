import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAas8vhdcGVz_xqTd6Mmm9MH4FZw3z61CI",
    authDomain: "expense-logger-ad35e.firebaseapp.com",
    databaseURL: "https://expense-logger-ad35e.firebaseio.com",
    projectId: "expense-logger-ad35e",
    storageBucket: "expense-logger-ad35e.appspot.com",
    messagingSenderId: "426317309615",
    appId: "1:426317309615:web:3bc64992e9fe82ff4ad65a"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };