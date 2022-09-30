import { faker } from "@faker-js/faker";

exports.generateDishes = async (req, res) => {
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
};

exports.generateRestaurants = async (req, res) => {
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
};

exports.getDishes = async (req, res) => {
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
};

exports.getTheDish = async (req, res) => {
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
};

exports.restaurants = async (req, res) => {
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
};