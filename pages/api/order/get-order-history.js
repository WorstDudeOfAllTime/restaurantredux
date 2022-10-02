export default async function handler(req, res) {
  try {
    const ordersRef = await collection(database, "Orders");

    const q = await query(ordersRef, where("name", "==", "kbj@yahoo.com"));
    const ordersQuery = await getDocs(q);
    ordersQuery.forEach((doc) => {
      console.log(doc.data());
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}
