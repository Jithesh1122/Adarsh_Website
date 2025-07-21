// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6j_GyIUIxDsF4FqLK2JK6los0UV__Ooo",
  authDomain: "adarsh-website.firebaseapp.com",
  projectId: "adarsh-website",
  storageBucket: "adarsh-website.appspot.com", // fixed
  messagingSenderId: "160602424395",
  appId: "1:160602424395:web:37cc46b29369bae2f439ce",
  measurementId: "G-PRS9Q5BWM4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
