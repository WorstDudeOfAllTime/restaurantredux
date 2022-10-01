import express from "express";
import restaurantController from "./../controllers/restaurantController.js";
const restaurantRouter = express.Router();

restaurantRouter
  .route("/generateDishes")
  .post(restaurantController.generateDishes);
restaurantRouter
  .route("/generateRestaurants")
  .post(restaurantController.generateRestaurants);
restaurantRouter.route("/getDishes").get(restaurantController.getDishes);
restaurantRouter.route("/getTheDish").get(restaurantController.getTheDish);
restaurantRouter.route("/restaurants").get(restaurantController.restaurants);

export default restaurantRouter;
