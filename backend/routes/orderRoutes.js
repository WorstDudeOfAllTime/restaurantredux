import express from "express";
import orderController from "./../controllers/orderController.js";
const orderRouter = express.Router();
console.log(orderRouter);
orderRouter.route("/sendPayment").post(orderController.submitPayment);
orderRouter.route('/orderHistory').get(orderController.getOrderHistory);

export default orderRouter;
