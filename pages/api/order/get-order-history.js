import { getDocs, collection, query, where } from "firebase/firestore";
import database from "./../../../utils/firebase";
export default async function handler(req, res) {
  try {
    let orderArray = [];
    const ordersRef = await collection(database, "Orders");
    const q = await query(ordersRef, where("name", "==", req.body.name));
    const ordersQuery = await getDocs(q);
    ordersQuery.forEach((doc) => {
      orderArray.push(doc.data());
    });
    res.send(orderArray);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}
