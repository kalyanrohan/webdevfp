// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX3fisLO_Ho8pMNzNnNSUsT-_JXPJIEro",
  authDomain: "good-head.firebaseapp.com",
  databaseURL: "https://good-head-default-rtdb.firebaseio.com",
  projectId: "good-head",
  storageBucket: "good-head.appspot.com",
  messagingSenderId: "501161084201",
  appId: "1:501161084201:web:71dacbce0875172b416338",
  measurementId: "G-MVDR46KMMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);