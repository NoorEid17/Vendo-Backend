require("dotenv").config();
import * as express from "express";
import * as logger from "morgan";
import * as cors from "cors";
import { AppDataSource } from "./src/config/db";

import userRouter from "./src/modules/User/user.router";

const app = express();
app.use(cors("*"));

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

app.use("/api/user", userRouter);

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Server running on port 3000 🚀");
  }
});
