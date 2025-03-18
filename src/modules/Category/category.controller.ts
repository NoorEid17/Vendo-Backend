import { Category } from "./category.entity";
import asyncHandler from "../../utils/asyncHandler";
import AppDataSource from "../../config/db";
import { PORT } from "../../config/config";

export const getAllCategories = asyncHandler(async (req, res) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const categories = await categoryRepository.find();
  res.json(categories);
});

export const createCategory = asyncHandler(async (req, res) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const category = categoryRepository.create({
    ...req.body,
    image: `http://localhost:${PORT}/uploads/${req.file.filename}`,
  });
  await categoryRepository.save(category);
  res.status(201).json(category);
});
