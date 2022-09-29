// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI4QNqoU5I_D8iBl43b-F3DXLeL1yw_D4",
  authDomain: "restauranti-30e36.firebaseapp.com",
  projectId: "restauranti-30e36",
  storageBucket: "restauranti-30e36.appspot.com",
  messagingSenderId: "986340391104",
  appId: "1:986340391104:web:29f171d3ad12f50c8fd525",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
console.log(database);
