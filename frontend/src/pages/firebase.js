// firebase.js
import firebase from 'firebase/app';
import 'firebase/database'; // Si vous utilisez Firebase Realtime Database

const firebaseConfig = {
  // Votre configuration Firebase (apiKey, authDomain, etc.)
};

// Initialisez Firebase
firebase.initializeApp(firebaseConfig);

// Exportez l'instance de Firebase pour pouvoir l'utiliser dans toute l'application
export default firebase;
