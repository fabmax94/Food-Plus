import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAKgWq1zA4WRdYIP_5sMkZTIMMoPCQnC0E",
    authDomain: "manausmobi.firebaseapp.com",
    databaseURL: "https://manausmobi.firebaseio.com",
    projectId: "manausmobi",
    storageBucket: "manausmobi.appspot.com",
    messagingSenderId: "965524923971",
    appId: "1:965524923971:web:8b86b45aa213a49a"
  };

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();