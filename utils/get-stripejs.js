import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise = new Promise((res, rej) => {
  res(Stripe);
});
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
