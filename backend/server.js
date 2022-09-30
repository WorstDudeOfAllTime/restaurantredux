// ---IMPORTS---//
import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";
import { initializeApp } from "firebase/app";
import {
  getDocs,
  doc,
  getFirestore,
  deleteDoc,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { generateSlug } from "random-word-slugs";
import BodyParser from "body-parser";
import Stripe from "stripe";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { burp } from "burrp";
// ------------- //

//---DeCLARATIONS---//
const stripe = new Stripe(
  "sk_test_51LgaA2ENX1jfCeNiIjXEZRrgOIycRgtFXf8m1Wb7pp9KotPotzxK09m8yF51V1vabbr4hn0QMKSeuSa9bJU075rp00znzIHPja"
);

const app = express();
const port = 5000;
const foodTypes = [
  {
    type: "Pizza",
    img: "https://cdn-icons-png.flaticon.com/512/4727/4727378.png",
  },
  {
    type: "Convenience",
    img: "https://cdn-icons-png.flaticon.com/512/4689/4689889.png",
  },
  {
    type: "Chinese",
    img: "https://cdn-icons-png.flaticon.com/512/890/890099.png",
  },
  {
    type: "Asian",
    img: "https://cdn-icons-png.flaticon.com/512/791/791550.png",
  },
  {
    type: "Mexican",
    img: "https://cdn-icons-png.flaticon.com/512/4727/4727450.png",
  },
  {
    type: "American",
    img: "https://cdn-icons-png.flaticon.com/512/4727/4727200.png",
  },
  {
    type: " Fast Food",
    img: "https://cdn-icons-png.flaticon.com/512/1037/1037762.png",
  },
  {
    type: "Sushi",
    img: "https://cdn-icons-png.flaticon.com/512/4500/4500717.png",
  },

  {
    type: "Indian",
    img: "https://cdn-icons-png.flaticon.com/512/4727/4727322.png",
  },
  {
    type: " Dessert",
    img: "https://cdn-icons-png.flaticon.com/512/4727/4727254.png",
  },
  {
    type: "Ice Cream",
    img: "https://cdn-icons-png.flaticon.com/512/938/938063.png",
  },
  {
    type: "Lunch Specials",
    img: "https://cdn-icons-png.flaticon.com/512/3374/3374320.png",
  },
  {
    type: "Mediterranean",
    img: "https://cdn-icons-png.flaticon.com/512/1880/1880355.png",
  },
  {
    type: "Pasta",
    img: "https://cdn-icons-png.flaticon.com/512/1318/1318517.png",
  },
  {
    type: "Healthy",
    img: "https://cdn-icons-png.flaticon.com/512/135/135763.png",
  },
  {
    type: "Noodles",
    img: "https://cdn-icons-png.flaticon.com/512/3041/3041130.png",
  },

  {
    type: "Halal",
    img: "https://cdn-icons-png.flaticon.com/512/4840/4840224.png",
  },
  {
    type: "Wings",
    img: "https://cdn-icons-png.flaticon.com/512/2719/2719292.png",
  },
  {
    type: "Steak",
    img: "https://cdn-icons-png.flaticon.com/512/4652/4652004.png",
  },
  {
    type: "Vegan",
    img: "https://cdn-icons-png.flaticon.com/512/4490/4490701.png",
  },
  {
    type: "Italian",
    img: "https://cdn-icons-png.flaticon.com/512/4727/4727428.png",
  },
  {
    type: "Soup",
    img: "https://cdn-icons-png.flaticon.com/512/4727/4727284.png",
  },
  {
    type: "Seafood",
    img: "https://cdn-icons-png.flaticon.com/512/1699/1699937.png",
  },
];
const firebaseConfig = {
  apiKey: "AIzaSyCI4QNqoU5I_D8iBl43b-F3DXLeL1yw_D4",
  authDomain: "restauranti-30e36.firebaseapp.com",
  projectId: "restauranti-30e36",
  storageBucket: "restauranti-30e36.appspot.com",
  messagingSenderId: "986340391104",
  appId: "1:986340391104:web:29f171d3ad12f50c8fd525",
};
const firebaseApp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseApp);
//-----------///

//---MIDDLEWARE---//
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
//-----------//

app.listen(port, () => {
  console.log("We are up and running");
});

//---Needed Routes---//
// Create User - DONE
// Login User/ Logout
// Pull Restaurants DONE
// Pull Dishes DONE
// Order History for LOGGED IN user
// Checkout Route DONE
// - Posts the order to Stripe
// - Posts the Order to our database

app.post("/createUser", async (req, res) => {
  try {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        res.send(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode} ${errorMessage}`);
      });
  } catch (err) {
    console.log(err);
  }
});

app.post("/loginUser", async (req, res) => {
  try {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        res.send(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode} ${errorMessage}`);
        res.send(errorMessage);
      });
  } catch (err) {}
});

app.get("/signOutUser", async (req, res) => {
  try {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("You have signed out.");
      })
      .catch(error);
  } catch (err) {}
});

app.post("/sendPayment", async (req, res) => {
  try {
    console.log("Fired");
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
});

app.post("/generateDishes", async (req, res) => {
  try {
    foodTypes.forEach(async (dish) => {
      for (let i = 0; i < 5; i++) {
        let theDish = {
          name: burp()[0],
          type: dish.type,
          price: faker.finance.amount(4, 20),
          img: dish.img,
        };
        let docRef = await addDoc(collection(database, "Dishes"), theDish);
      }
    });
  } catch (err) {}
});

app.post("/generateRestaurants", async (req, res) => {
  try {
    for (let i = 0; i < 10; i++) {
      const docRef = await addDoc(collection(database, "Restaurants"), {
        name: generateSlug(),
        image: faker.image.business(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        categories: [
          foodTypes[Math.floor(Math.random() * foodTypes.length)],
          foodTypes[Math.floor(Math.random() * foodTypes.length)],
          foodTypes[Math.floor(Math.random() * foodTypes.length)],
        ],
        rating: (Math.random() * 5).toFixed(2),
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/getDishes/", async (req, res) => {
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
});

app.post("/getThisDish", async (req, res) => {
  let dishArray = [];
  try {
    const q = await query(
      collection(database, "Dishes"),
      where("categories", "array-contains", "American")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      dishArray.push(doc.data());
    });
    res.send(dishArray);
  } catch (err) {
    console.log(err);
  }
});

app.get("/restaurants", async (req, res) => {
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
});

app.get("/deleteOne", async (req, res) => {
  const querySnapshot = await getDocs(collection(database, "Restaurants"));
  querySnapshot.forEach(async (document) => {
    await deleteDoc(doc(database, "Restaurants", document.id));
  });
});
