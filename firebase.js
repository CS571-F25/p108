// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDj2WkoiOmIS9UdEa5GExbqH-p--KO7okI",
  authDomain: "fanpass-8fa95.firebaseapp.com",
  projectId: "fanpass-8fa95",
  storageBucket: "fanpass-8fa95.firebasestorage.app",
  messagingSenderId: "917200683448",
  appId: "1:917200683448:web:31ab4ec0a67de0607fcf4d",
  measurementId: "G-2YSK9KVL87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ THESE TWO LINES FIX YOUR ERROR
export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional (only works in browser)
export const analytics = getAnalytics(app);
