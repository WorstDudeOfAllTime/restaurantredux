import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.DB_APIKEY,
  authDomain: "restauranti-30e36.firebaseapp.com",
  databaseURL: "https://restauranti-30e36-default-rtdb.firebaseio.com",
  projectId: "restauranti-30e36",
  storageBucket: "restauranti-30e36.appspot.com",
  messagingSenderId: "986340391104",
  appId: process.env.DB_APPID,
};
const firebaseApp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseApp);

export default { firebaseApp, database };
