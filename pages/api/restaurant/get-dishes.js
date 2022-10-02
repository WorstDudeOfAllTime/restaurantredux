import database from "./../../../utils/firebase";

import { getDocs, collection, addDoc, query, where } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    let dishArray = [];
    const querySnapshot = await getDocs(collection(database, "Dishes"));
    querySnapshot.forEach(async (document) => {
      dishArray.push(document.data());
    });
    res.send(dishArray);
  } catch (err) {
    console.log(err);
  }
}
