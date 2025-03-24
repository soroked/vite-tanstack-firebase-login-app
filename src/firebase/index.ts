// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHaFqFmtEZcBb9DMkvLT4zT-WJjM1uRAE",
  authDomain: "login-app-410cc.firebaseapp.com",
  projectId: "login-app-410cc",
  storageBucket: "login-app-410cc.firebasestorage.app",
  messagingSenderId: "754942616725",
  appId: "1:754942616725:web:f001c64fa7de39bf62679c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);