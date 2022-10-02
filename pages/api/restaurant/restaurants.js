import database from "./../../../utils/firebase";
import { getDocs, collection } from "firebase/firestore";
export default async function handler(req, res) {
  try {
    let restaurantArray = [];
    const querySnapshot = await getDocs(collection(database, "Restaurants"));
    querySnapshot.forEach(async (document) => {
      restaurantArray.push(document.data());
    });
    res.send(restaurantArray);
  } catch (err) {
    console.log(err);
  }
}
