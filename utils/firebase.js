import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCI4QNqoU5I_D8iBl43b-F3DXLeL1yw_D4",
  authDomain: "restauranti-30e36.firebaseapp.com",
  databaseURL: "https://restauranti-30e36-default-rtdb.firebaseio.com",
  projectId: "restauranti-30e36",
  storageBucket: "restauranti-30e36.appspot.com",
  messagingSenderId: "986340391104",
  appId: "1:986340391104:web:29f171d3ad12f50c8fd525",
};
const firebaseApp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseApp);

export default { firebaseApp, database };
