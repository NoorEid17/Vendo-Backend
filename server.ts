require("dotenv").config();
import { setupSwagger } from "./src/config/swaggerConfig";
import * as express from "express";
import * as logger from "morgan";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import { AppDataSource } from "./src/config/db";

import userRouter from "./src/modules/User/user.router";
import productRouter from "./src/modules/Product/product.router";
import errorHandler from "./src/utils/errorHandler";
import { PORT } from "./src/config/config";

const app = express();
app.use(
  cors({
    origin: [
      /http:\/\/localhost(:\d+)?/,
      /http:\/\/192\.168\.1\.\d+(:\d+)?/,
      /app:\/\//,
      /exp:\/\//,
    ],
    credentials: true,
  })
);
app.use(cookieParser());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected ✔");
  })
  .catch((err) => {
    console.error("❌ Error connecting to database:", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger("dev"));

setupSwagger(app);

app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server running on port: ${PORT} 🚀`);
  }
});
