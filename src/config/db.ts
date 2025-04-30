import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./config";
import { User } from "../modules/User/user.entity";
import { Product } from "../modules/Product/product.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  synchronize: true,
  entities: [User, Product],
});

export default AppDataSource;
