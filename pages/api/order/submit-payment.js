import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51LgaA2ENX1jfCeNiIjXEZRrgOIycRgtFXf8m1Wb7pp9KotPotzxK09m8yF51V1vabbr4hn0QMKSeuSa9bJU075rp00znzIHPja"
);
import database from "../../../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
export default async function handler(req, res) {
  try {
    let orderArray = [];
    req.body.dishes.forEach((item) => {
      orderArray.push(item);
    });
    const token = await stripe.tokens.create({
      card: {
        number: "4242424242424242",
        exp_month: "12",
        exp_year: "25",
        cvc: req.body.theCVC,
      },
    });
    stripe.customers
      .create({
        name: req.body.name,
        email: req.body.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges.create({
          amount: parseInt(req.body.amount * 100),
          currency: "usd",
          customer: customer.id,
        });
      })
      .then(() => {})
      .catch((err) => console.log(err));

    let addOrder = await addDoc(collection(database, "Orders"), {
      name: req.body.email,
      amount: req.body.amount.toFixed(2),
      restaurant: req.body.restaurant,
      dishes: orderArray,
      card: "4242 4242 4242 4242",
      address: req.body.theAddress,
      date: new Date(),
    });
  } catch (err) {
    res.send(`DIDNT WORK${err}`);
  }
}
