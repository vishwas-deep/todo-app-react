// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm3Mubf7ew35d66CcobNaWPw12ALMxG-0",
  authDomain: "to-do--application.firebaseapp.com",
  projectId: "to-do--application",
  storageBucket: "to-do--application.appspot.com",
  messagingSenderId: "707006700113",
  appId: "1:707006700113:web:2fa458e68a5b282d42f670"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)