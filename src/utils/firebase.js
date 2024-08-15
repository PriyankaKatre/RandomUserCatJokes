// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtwA0-39d4qXzRs__4iC3QcUYCbE03Pig",
  authDomain: "randomuserjokescats.firebaseapp.com",
  projectId: "randomuserjokescats",
  storageBucket: "randomuserjokescats.appspot.com",
  messagingSenderId: "575989403662",
  appId: "1:575989403662:web:629b7c53acf9ac6e466c5f",
  measurementId: "G-CVMLQGJSQV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
