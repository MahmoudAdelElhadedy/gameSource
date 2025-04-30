import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyBAeDhVjRR9TRwaXu1UOfs-NFwX1QNMvGw",
    authDomain: "gamesource-2f8ee.firebaseapp.com",
    projectId: "gamesource-2f8ee",
    storageBucket: "gamesource-2f8ee.firebasestorage.app",
    messagingSenderId: "279218549742",
    appId: "1:279218549742:web:6d3534f4b4720e704d54ff",
    measurementId: "G-H88XRW97MW"
  };
  initializeApp(firebaseConfig)
   const DB = getFirestore();
   const AUTH = getAuth();
   export{DB , AUTH}