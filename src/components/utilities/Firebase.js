import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
const firebaseConfig = {
    apiKey: "AIzaSyCLHxw80EYVifR-CAZEd-amh8eZ2bM3zLU",
    authDomain: "wezaza-35afa.firebaseapp.com",
    projectId: "wezaza-35afa",
    storageBucket: "wezaza-35afa.appspot.com",
    messagingSenderId: "512986493318",
    appId: "1:512986493318:web:47d2306e9b4087b9cc7c07",
    measurementId: "G-PB6YHC61HG"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const dataRef= firebase.database()
export default firebase