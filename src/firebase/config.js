// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Tomar parte de la autenticación
import { getAuth } from 'firebase/auth';
// FireStore
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD8pIKCl2_Bt2SPzl7Ld75eRngQ-6tBqXk',
  authDomain: 'react-journal-3d495.firebaseapp.com',
  projectId: 'react-journal-3d495',
  storageBucket: 'react-journal-3d495.appspot.com',
  messagingSenderId: '932939551756',
  appId: '1:932939551756:web:9ab29d4711c0311d1a8a29'
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );