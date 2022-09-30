exports.submitPayment = async (req, res) => {
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
          amount: 400 * 100,
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
};