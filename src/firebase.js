// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyVKs07a3XWMRzgT7WMYOpLZbnuOPht4w",
  authDomain: "blood-donor-connector.firebaseapp.com",
  projectId: "blood-donor-connector",
  storageBucket: "blood-donor-connector.firebasestorage.app",
  messagingSenderId: "1061490649056",
  appId: "1:1061490649056:web:50ba687d7e15251bc5ed85",
  measurementId: "G-XJZ0Y1E2W4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
