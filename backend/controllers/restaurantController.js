import { faker } from "@faker-js/faker";
import database from "./../firebase.js";
import { getDocs, collection, addDoc, query, where } from "firebase/firestore";
import { generateSlug } from "random-word-slugs";
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

export default {
  generateDishes: async (req, res) => {
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
  },
  generateRestaurants: async (req, res) => {
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
  },
  getDishes: async (req, res) => {
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
  },
  getTheDish: async (req, res) => {
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
  },
  restaurants: async (req, res) => {
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
  },
};
