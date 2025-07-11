// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKCOAsu5zfvPE3p7QHEsoYYuMO2auwZkA",
  authDomain: "netflixgpt1511.firebaseapp.com",
  projectId: "netflixgpt1511",
  storageBucket: "netflixgpt1511.firebasestorage.app",
  messagingSenderId: "612436194153",
  appId: "1:612436194153:web:7c84cf6ef9e0c6f089c3f8",
  measurementId: "G-R8W03QNHRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only initialize analytics in production
let analytics;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  analytics = getAnalytics(app);
}

const auth = getAuth();

export default auth;