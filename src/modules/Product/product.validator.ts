import { body, query } from "express-validator";
import AppDataSource from "../../config/db";
import { Category } from "../Category/category.entity";

const categoryExists = async (value: string) => {
  const category = await AppDataSource.getRepository(Category).findOneBy({
    id: value,
  });
  if (!category) {
    return Promise.reject("Category does not exist");
  }
};

export const paginate = [
  query("category").optional().isUUID().custom(categoryExists),
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1 }),
];

export const createProduct = [
  body("name").isString().notEmpty(),
  body("price").isNumeric().notEmpty(),
  body("description").isString().notEmpty(),
  body("categoryId")
    .isUUID()
    .withMessage("Category must be a valid UUID")
    .notEmpty()
    .withMessage("Category is required")
    .custom(categoryExists)
    .withMessage("Category does not exist"),
];
