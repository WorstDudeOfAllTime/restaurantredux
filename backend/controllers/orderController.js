import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51LgaA2ENX1jfCeNiIjXEZRrgOIycRgtFXf8m1Wb7pp9KotPotzxK09m8yF51V1vabbr4hn0QMKSeuSa9bJU075rp00znzIHPja"
);
import database from "./../firebase.js";
import { collection, addDoc } from "firebase/firestore";
export default {
  submitPayment: async (req, res) => {
    try {
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
            amount: req.body.amount,
            currency: "usd",
            customer: customer.id,
          });
        })
        .then(() => {})
        .catch((err) => console.log(err));

      let addOrder = await addDoc(collection(database, "Orders"), {
        name: req.body.email,
        amount: 400,
        restaraunt: req.body.restaurant,
        dishes: ["this", "That"],
        card: "4242 4242 4242 4242",
        address: req.body.theAddress,
        date: new Date(),
      });
    } catch (err) {
      res.send(`DIDNT WORK${err}`);
    }
  },
};
