// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY ,
  authDomain: "test-real-estate-d6871.firebaseapp.com",
  projectId: "test-real-estate-d6871",
  storageBucket: "test-real-estate-d6871.appspot.com",
  messagingSenderId: "746292938906",
  appId: "1:746292938906:web:95d5a36054069e0dc83723"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);