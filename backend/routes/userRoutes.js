import express from "express";
import userController from "./../controllers/userController.js";
const userRouter = express.Router();

userRouter.route("/createUser").post(userController.createUser);
userRouter.route("/loginUser").post(userController.loginUser);
userRouter.route("/signOutUser").post(userController.signOutUser);

export default userRouter;
