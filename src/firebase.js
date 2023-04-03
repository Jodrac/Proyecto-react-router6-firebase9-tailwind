import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2Y5-uDRXKRTmocJGjh_2Gq-RjNZjcgSM",
  authDomain: "react-bonus-51aaa.firebaseapp.com",
  projectId: "react-bonus-51aaa",
  storageBucket: "react-bonus-51aaa.appspot.com",
  messagingSenderId: "255059569878",
  appId: "1:255059569878:web:cf79e587f682121323ad77",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
