// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPPrd3L0ZaNADiya6KCi8kamp8IO0vKWg",
  authDomain: "main-save-focus.firebaseapp.com",
  projectId: "main-save-focus",
  storageBucket: "main-save-focus.firebasestorage.app",
  messagingSenderId: "1042429037112",
  appId: "1:1042429037112:web:272e6076aca33007b734cd",
  measurementId: "G-Y5H59ZF75C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
