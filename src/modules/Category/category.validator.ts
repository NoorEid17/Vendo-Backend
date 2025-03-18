import { body } from "express-validator";
import { Category } from "./category.entity";
import AppDataSource from "../../config/db";

const categoryExists = async (name: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const category = await categoryRepository.findOneBy({ name });
  if (category) {
    return Promise.reject("Category already exists");
  }
};

export const createCategory = [
  body("name").isString().notEmpty().trim().custom(categoryExists),
];
