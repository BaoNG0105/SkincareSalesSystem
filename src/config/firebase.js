// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdkKWjOjXfbuofMcFITfNbNKBOcXQ1h7o",
  authDomain: "skincare-system-4c25b.firebaseapp.com",
  projectId: "skincare-system-4c25b",
  storageBucket: "skincare-system-4c25b.firebasestorage.app",
  messagingSenderId: "538177092929",
  appId: "1:538177092929:web:ce8c692a90abc88706b5c0",
  measurementId: "G-HQCK3VS1VQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //Initialize the app
export const analytics = getAnalytics(app);    //Get the analytics object
export const auth = getAuth(app); //Get the authentication Google Firebase
