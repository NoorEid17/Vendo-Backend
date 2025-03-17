import { body } from "express-validator";
import AppDataSource from "../../config/db";
import { User } from "./user.entity";

const emailUnique = async (value) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email: value });
  if (user) {
    return Promise.reject("Email already in use");
  }
};

export const register = [
  body("email").isEmail().custom(emailUnique),
  body("password").isLength({ min: 5 }),
  body("fullName").isString(),
  body("address").isString(),
  body("phone").isMobilePhone("any"),
];
