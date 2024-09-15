// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4Wit1SPeEf3IL-_MduuwntnBaPxu1nhw",
  authDomain: "weatherapp-23620.firebaseapp.com",
  projectId: "weatherapp-23620",
  storageBucket: "weatherapp-23620.appspot.com",
  messagingSenderId: "112923791385",
  appId: "1:112923791385:web:e754f0426cfd9777801a88",
  measurementId: "G-BP4HB0394G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);