import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCpmQtmaul_uDyl_B7Dyy0EodjzgcDMxgg",
    authDomain: "manageco-d154c.firebaseapp.com",
    projectId: "manageco-d154c",
    storageBucket: "manageco-d154c.appspot.com",
    messagingSenderId: "139309320658",
    appId: "1:139309320658:web:96ec0c085685b11c0ae00b"
};

// Initialize Firebase 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); 
}

export default firebase.firestore();