import { body, query } from "express-validator";
import AppDataSource from "../../config/db";
import { ProductCategories } from "./product.entity";

export const paginate = [
  query("category").optional().isIn(ProductCategories),
  // query("page").optional().isInt({ min: 1 }),
  // query("limit").optional().isInt({ min: 1 }),
];

export const createProduct = [
  body("title").isString().notEmpty(),
  body("location").isString().notEmpty(),
  body("phoneNumber").isString().notEmpty(),
  body("price").isNumeric().notEmpty(),
  body("description").isString().optional(),
  body("category")
    .toLowerCase()
    .trim()
    .isIn(ProductCategories)
    .withMessage("Category must be a valid UUID")
    .notEmpty()
    .withMessage("Category is required"),
];
