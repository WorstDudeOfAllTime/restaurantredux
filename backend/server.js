import express from "express";
import cors from "cors";
import BodyParser from "body-parser";
import restaurantRouter from "./routes/restaurantRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
const port = 5000;
//-----------///

//---MIDDLEWARE---//
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(restaurantRouter);
app.use(userRouter);
app.use(orderRouter);
//-----------//

app.listen(port, () => {
  console.log("We are up and running");
});
