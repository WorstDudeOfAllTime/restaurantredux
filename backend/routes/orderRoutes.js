import express from "express";
import orderController from "./../controllers/orderController.js";
const orderRouter = express.Router();
console.log(orderRouter);
orderRouter.route("/sendPayment").post(orderController.submitPayment);

export default orderRouter;
