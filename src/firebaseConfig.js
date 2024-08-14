// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBzcI00-iOkLg2zgbR9UMeLV3RtIhtnso4',
  authDomain: 'search-movie-f80dd.firebaseapp.com',
  projectId: 'search-movie-f80dd',
  storageBucket: 'search-movie-f80dd.appspot.com',
  messagingSenderId: '638835915333',
  appId: '1:638835915333:web:1bcd6239950fd24c91412c'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut };


