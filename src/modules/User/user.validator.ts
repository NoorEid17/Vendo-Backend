import { body } from "express-validator";
import AppDataSource from "../../config/db";
import { User } from "./user.entity";

const emailUnique = async (value) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email: value });
  if (user) {
    const error = new Error("Email already in use") as any;
    error.status = 409;
    throw error;
  }
};

export const register = [
  body("email").isEmail().custom(emailUnique),
  body("password").isLength({ min: 5 }),
  body("name").isString(),
];

export const login = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

export const update = [
  body("name").optional().isString(),
  body("email").optional().isEmail().custom(emailUnique),
  body("password").optional().isLength({ min: 5 }),
  body("oldPassword").optional().isLength({ min: 5 }),
];
